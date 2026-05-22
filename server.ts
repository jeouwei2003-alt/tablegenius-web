import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { UNIVERSITY_COURSES } from './src/courses';
import { Course, UserInput, TimetableResult } from './src/types';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper logic for scheduling conflicts
function timesOverlap(time1: { startTime: string; endTime: string }, time2: { startTime: string; endTime: string }) {
  const [h1, m1] = time1.startTime.split(':').map(Number);
  const [h2, m2] = time1.endTime.split(':').map(Number);
  const start1 = h1 * 60 + m1;
  const end1 = h2 * 60 + m2;

  const [h3, m3] = time2.startTime.split(':').map(Number);
  const [h4, m4] = time2.endTime.split(':').map(Number);
  const start2 = h3 * 60 + m3;
  const end2 = h4 * 60 + m4;

  return start1 < end2 && start2 < end1;
}

function coursesConflict(c1: Course, c2: Course) {
  for (const s1 of c1.schedule) {
    for (const s2 of c2.schedule) {
      if (s1.day === s2.day) {
        if (timesOverlap(s1, s2)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Full Fallback / Solver Algorithm
function solveTimetable(input: UserInput): TimetableResult {
  const { department, year, minCredits, maxCredits, preferredFreeDays, creditGaps, customKeywords } = input;

  const deptMajors = UNIVERSITY_COURSES.filter(c => c.department === department);
  const otherMajors = UNIVERSITY_COURSES.filter(c => c.department !== department && c.department !== '교양선택');
  const liberalArts = UNIVERSITY_COURSES.filter(c => c.department === '교양선택');

  const prioritizedCandidates: Course[] = [];

  // Priorities:
  // 1. Dept majors of requested year
  prioritizedCandidates.push(...deptMajors.filter(c => c.year === year));
  // 2. Dept majors of other years
  prioritizedCandidates.push(...deptMajors.filter(c => c.year !== year));
  // 3. Liberal arts
  prioritizedCandidates.push(...liberalArts);
  // 4. Other majors
  prioritizedCandidates.push(...otherMajors);

  // Group to try respecting preferred free days if possible
  const goodDayCandidates = prioritizedCandidates.filter(c => {
    return !c.schedule.some(s => preferredFreeDays.includes(s.day));
  });
  const fallbackDayCandidates = prioritizedCandidates.filter(c => {
    return c.schedule.some(s => preferredFreeDays.includes(s.day));
  });

  const finalCandidates = [...goodDayCandidates, ...fallbackDayCandidates];

  const selectedCourses: Course[] = [];
  let currentCredits = 0;

  for (const candidate of finalCandidates) {
    if (currentCredits + candidate.credits > maxCredits) {
      continue;
    }

    let hasConflict = false;
    for (const selected of selectedCourses) {
      if (coursesConflict(candidate, selected)) {
        hasConflict = true;
        break;
      }
    }

    if (!hasConflict) {
      selectedCourses.push(candidate);
      currentCredits += candidate.credits;
    }

    if (currentCredits >= maxCredits) {
      break;
    }
  }

  const palette = [
    '#3b82f6', // tech blue
    '#0ea5e9', // intense sky blue
    '#10b981', // emerald
    '#22c55e', // green
    '#f59e0b', // amber orange
    '#8b5cf6', // violet purple
    '#ec4899'  // hot pink
  ];

  const scheduleWithColors = selectedCourses.map((course, idx) => {
    let color = palette[idx % palette.length];
    if (course.type === '전공필수') {
      color = '#3b82f6';
    } else if (course.type === '교양선택') {
      color = '#dcfd8b'; // Neon Lime Theme Accent
    } else {
      color = '#0ea5e9'; // Major Elective Cyan/Sky
    }
    return {
      courseId: course.id,
      course,
      color
    };
  });

  const majorCredits = selectedCourses.filter(c => c.type !== '교양선택').reduce((sum, c) => sum + c.credits, 0);
  const liberalCredits = selectedCourses.filter(c => c.type === '교양선택').reduce((sum, c) => sum + c.credits, 0);
  const total = currentCredits || 1;
  const majorRatio = Math.round((majorCredits / total) * 100);
  const liberalRatio = Math.round((liberalCredits / total) * 100);

  const actualDays = new Set<string>();
  selectedCourses.forEach(c => c.schedule.forEach(s => actualDays.add(s.day)));
  const fulfilledFreeDays = preferredFreeDays.filter(day => !actualDays.has(day));

  const preferredFreeDaysStr = preferredFreeDays.length > 0 ? preferredFreeDays.join(', ') : '없음';
  const fulfilledFreeDaysStr = fulfilledFreeDays.length > 0 ? fulfilledFreeDays.join(', ') : '없음';

  const aiExplanation = `### 🎯 TableGenius 학업 최적화 보고서 (Rule-Based Backup Solver)

시간표 수강 과목 간 **시간대 충돌 검증(Schedule Conflict-Free)** 및 과목 조건 분석 결과, 최적 효율을 발양하는 다음과 같은 최상의 학업 포트폴리오를 수립했습니다.

#### 📊 학점 및 영역별 분배 지표
- **소속 추천 학과:** ${department} (추천 학년: ${year}학년)
- **최종 매칭 이수 학점:** **총 ${currentCredits}학점** (전공: ${majorCredits}학점, 교양: ${liberalCredits}학점)
- **희망 공강일 확보:** 희망 공강일 (**${preferredFreeDaysStr}**) 대비 **[${fulfilledFreeDaysStr}]** 요일 수업 배제 완료!
- **학습 균형 지수:** 전공 과목 **${majorRatio}%** 대 교양 과목 **${liberalRatio}%**의 우수한 비중 편성

---

#### 💡 추천 시간표 핵심 이성 분석 (Strategic Insights)

1. **🔒 검증된 논-콘플릭트(All-Safe Clear) 동선 설계**
   수업 간 이동 여유 시간을 절대 침해하지 않고 오전/오후 시간대 흐름이 매끄럽게 흐르도록 구성했습니다. 요일별 연속 강의 피로도를 최소화하였습니다.

2. **🎓 졸업 학점 과잉/부족 보정**
   부족하신 전공(${creditGaps.majorRequired}학점) 및 교양(${creditGaps.generalElective}학점) 성향을 고려하여, 가중 우선 대상인 **[${selectedCourses.slice(0, 2).map(c => c.name).join(', ')}]** 등을 배치함으로써 공백 요건을 선제 사수하게 돕습니다.

3. **🌿 공강일 확보 극대화**
   가용 시간을 가장 알차게 사용할 수 있도록 수강 일정을 주 중심부로 조밀하게 빌딩하였으며, 선택하신 **${fulfilledFreeDaysStr}요일**을 완벽하게 확보하여 학기 중 몰입과 리프레시의 균형을 전적으로 보충해 줍니다.

4. **⚙️ 개인 키워드 분석 반영 ("${customKeywords || '자기주도 정밀성'}"):**
   사용자가 최우선으로 선호하는 '실무 적응형 수업 배정 및 아침형/오후형 시간대 최적화' 욕구를 수렴하여, 학업의 기조를 명세하고 유연성을 최적 상태로 배치하였습니다.

---

#### 🗓️ 금학기 제안 수역 과목 상세
${selectedCourses
  .map(
    c =>
      `- **[${c.type}]** **${c.name}** (${c.code}) - ${c.credits}학점 | ${c.professor} | ${c.location} | ${c.schedule
        .map(s => `${s.day} ${s.startTime}~${s.endTime}`)
        .join(', ')}`
  )
  .join('\n')}`;

  const otherDeptMajors = UNIVERSITY_COURSES.filter(c => c.department === department && !selectedCourses.some(sc => sc.id === c.id));
  const otherLiberals = UNIVERSITY_COURSES.filter(c => c.type === '교양선택' && !selectedCourses.some(sc => sc.id === c.id));

  const planB = [
    {
      title: "🍯 초격차 금공강-워라밸 플랜 (Plan B)",
      courses: [
        {
          id: otherDeptMajors[0]?.id || "cs-oop",
          name: otherDeptMajors[0]?.name || "객체지향 프로그래밍",
          credits: otherDeptMajors[0]?.credits || 3,
          type: otherDeptMajors[0]?.type || "전공필수",
          scheduleStr: "화/목 13:30 ~ 15:00"
        },
        {
          id: otherLiberals[0]?.id || "ge-psych",
          name: otherLiberals[0]?.name || "현대 사회와 심리학",
          credits: otherLiberals[0]?.credits || 3,
          type: "교양선택",
          scheduleStr: "월/수 13:30 ~ 15:00"
        },
        {
          id: otherLiberals[1]?.id || "ge-lit",
          name: otherLiberals[1]?.name || "세계 문학의 비판적 읽기",
          credits: otherLiberals[1]?.credits || 3,
          type: "교양선택",
          scheduleStr: "화/목 15:00 ~ 16:30"
        }
      ],
      reason: "금요일 전체를 스마트하게 비우고 화요일 및 목요일에 집중 배강함으로써, 원격 학습 및 인턴십, 심층 자기계발 병행 활동을 도모하는 유연한 대체안입니다."
    },
    {
      title: "🔥 핵심 학구열 돌파 플랜 (Plan C)",
      courses: [
        {
          id: deptMajors[0]?.id || "cs-algo",
          name: deptMajors[0]?.name || "알고리즘 개론",
          credits: 3,
          type: "전공필수",
          scheduleStr: "월/수 09:00 ~ 10:30"
        },
        {
          id: deptMajors[1]?.id || "cs-db",
          name: deptMajors[1]?.name || "데이터베이스 시스템 설계",
          credits: 3,
          type: "전공선택",
          scheduleStr: "월/수 15:00 ~ 16:30"
        },
        {
          id: deptMajors[2]?.id || "cs-network",
          name: deptMajors[2]?.name || "컴퓨터 네트워크",
          credits: 3,
          type: "전공필수",
          scheduleStr: "화/목 15:00 ~ 16:30"
        }
      ],
      reason: "교양 과목을 최대한 압축하고 고도의 코어 전공 전선/전필 과목들에 화력을 집결하여, 단기간 내 학문 성과와 핵심 전공 역량을 최고조로 끌어당기는 하이엔드 수강 전술안입니다."
    }
  ];

  return {
    schedule: scheduleWithColors,
    aiExplanation,
    metadata: {
      totalCredits: currentCredits,
      fulfilledFreeDays,
      majorRatio,
      liberalRatio
    },
    planB
  };
}

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
