import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { UNIVERSITY_COURSES } from './src/courses';
import { Course, UserInput, TimetableResult } from './src/types';
import { solveTimetable } from './src/utils/solver';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// REST route for recommendation
app.post('/api/recommend', async (req: Request, res: Response): Promise<void> => {
  const userInput: UserInput = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== '') {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          schedule: {
            type: Type.ARRAY,
            description: "선택된 추천 과목들의 배열",
            items: {
              type: Type.OBJECT,
              properties: {
                courseId: { type: Type.STRING },
                course: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    code: { type: Type.STRING },
                    department: { type: Type.STRING },
                    year: { type: Type.INTEGER },
                    credits: { type: Type.INTEGER },
                    type: { type: Type.STRING },
                    professor: { type: Type.STRING },
                    location: { type: Type.STRING },
                    schedule: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          day: { type: Type.STRING },
                          startTime: { type: Type.STRING },
                          endTime: { type: Type.STRING }
                        },
                        required: ["day", "startTime", "endTime"]
                      }
                    }
                  },
                  required: ["id", "name", "code", "department", "year", "credits", "type", "professor", "location", "schedule"]
                },
                color: { type: Type.STRING, description: "hex코드 혹은 Tailwind 테마색 (예: #3b82f6)" }
              },
              required: ["courseId", "course", "color"]
            }
          },
          aiExplanation: {
            type: Type.STRING,
            description: "시간표 완성도 분석 및 맞춤형 사유 분석 (Markdown 포맷 한국어 리포트)"
          },
          metadata: {
            type: Type.OBJECT,
            properties: {
              totalCredits: { type: Type.INTEGER },
              fulfilledFreeDays: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              majorRatio: { type: Type.INTEGER },
              liberalRatio: { type: Type.INTEGER }
            },
            required: ["totalCredits", "fulfilledFreeDays", "majorRatio", "liberalRatio"]
          },
          planB: {
            type: Type.ARRAY,
            description: "2개의 대안 시간표 추천 시나리오 기재",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "대안 플랜 요약 요일 (예: 금공강 플랜)" },
                courses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      credits: { type: Type.INTEGER },
                      type: { type: Type.STRING },
                      scheduleStr: { type: Type.STRING, description: "요일 시간 요약 (예: 월/수 10:30-12:00)" }
                    },
                    required: ["id", "name", "credits", "type", "scheduleStr"]
                  }
                },
                reason: { type: Type.STRING, description: "대안의 존재 가치와 추천 요지" }
              },
              required: ["title", "courses", "reason"]
            }
          }
        },
        required: ["schedule", "aiExplanation", "metadata", "planB"]
      };

      const systemPrompt = `당신은 대한민국 대학생들을 위한 최고의 수강신청 시간표 전략 컨설팅 AI 'TableGenius'입니다. 
제공된 전체 과목 목록(UNIVERSITY_COURSES) 내에서, 학생정보(전공, 학년, 부족학점 등) 및 선호 시간대, 선호 공강일, 키워드를 조화시켜 충돌 없는(schedule conflicts가 전혀 없는) 완벽하고 우아한 시간표를 작성하세요.

[규칙]
1. 시간표 내 모든 과목은 시간대(요일 및 startTime~endTime)가 겹쳐서 충돌나지 않도록 정밀 설계해야 합니다.
2. 예: 동일한 수요일 13:30-15:00에 두 과목이 할당되면 안 됩니다! 타임 충돌은 치명적 오류입니다.
3. 무조건 전체 개설 과목 목록에 존재하는 과목으로만 구성하십시오. (새로운 임의의 시간대의 과목을 절대 가공하거나 조작하지 마세요.)
4. 출력은 완벽하게 지정한 JSON 스키마를 준수하십시오.
`;

      const userPrompt = `
전체 학과 개설 과목 정보:
${JSON.stringify(UNIVERSITY_COURSES)}

학생 정보 및 이수 제약 사항:
- 주 전공: ${userInput.department}
- 현재 학년: ${userInput.year}학년
- 이수 학기: ${userInput.semester}
- 희망 이수 학점 한도: ${userInput.minCredits}학점 ~ ${userInput.maxCredits}학점
- 선호 공강 요일: ${userInput.preferredFreeDays.join(', ') || '없음'}
- 졸업 잔여부족 학점: 전공 필수/선택 부족: ${userInput.creditGaps.majorRequired}학점, 교양 부족: ${userInput.creditGaps.generalElective}학점
- 개인 맞춤 특성 및 요구 키워드: "${userInput.customKeywords}"

위 정보에 완벽히 충족을 극대화하는 시간표 1세트와, 그에 대한 세부적 전략 설명(aiExplanation, 마크다운 형식 한국어), 그리고 Plan B 수역 대안전술 2가지를 예쁘게 도출하여 JSON으로 제공해 주세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: responseSchema
        }
      });

      const text = response.text;
      if (text) {
        const parsed: TimetableResult = JSON.parse(text);
        res.json(parsed);
        return;
      }
    } catch (e) {
      console.error('Gemini processing failed, falling back to local smart engine:', e);
    }
  }

  // Fallback to Rule-based solver
  const solved = solveTimetable(userInput);
  res.json(solved);
});

// Serve and handle Vite setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TableGenius server running on http://localhost:${PORT}`);
  });
}

startServer();
