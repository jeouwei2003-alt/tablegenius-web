import React, { useState } from 'react';
import { Archive, Calendar, GraduationCap, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { TimetableResult } from '../types';

interface HistoryRecord {
  id: string;
  semester: string;
  title: string;
  totalCredits: number;
  department: string;
  year: number;
  date: string;
  data: TimetableResult;
}

interface HistoryViewProps {
  onLoadSchedule: (schedule: TimetableResult) => void;
}

export function HistoryView({ onLoadSchedule }: HistoryViewProps) {
  const [selectedId, setSelectedId] = useState<string>('hist-1');

  // Hardcoded mock semester archives in structural TimetableResult format
  const historyArchives: HistoryRecord[] = [
    {
      id: 'hist-1',
      semester: '2025학년도 2학기',
      title: '🍯 금요일 완전 공강 수강 플랜 (최적 18학점)',
      totalCredits: 18,
      department: '컴퓨터공학과',
      year: 3,
      date: '2025-08-22',
      data: {
        schedule: [
          {
            courseId: 'cs-oop',
            course: {
              id: 'cs-oop',
              name: '객체지향 프로그래밍',
              code: 'CS-301',
              department: '컴퓨터공학과',
              year: 2,
              credits: 3,
              type: '전공필수',
              professor: '박객체 교수님',
              location: '공학관 201호',
              schedule: [{ day: '화', startTime: '09:00', endTime: '10:30' }, { day: '목', startTime: '09:00', endTime: '10:30' }]
            },
            color: '#3b82f6'
          },
          {
            courseId: 'cs-algo',
            course: {
              id: 'cs-algo',
              name: '알고리즘 개론',
              code: 'CS-302',
              department: '컴퓨터공학과',
              year: 3,
              credits: 3,
              type: '전공필수',
              professor: '최알고 교수님',
              location: 'IT 융합관 402호',
              schedule: [{ day: '월', startTime: '13:30', endTime: '15:00' }, { day: '수', startTime: '13:30', endTime: '15:00' }]
            },
            color: '#3b82f6'
          },
          {
            courseId: 'cs-db',
            course: {
              id: 'cs-db',
              name: '데이터베이스 시스템 설계',
              code: 'CS-304',
              department: '컴퓨터공학과',
              year: 3,
              credits: 3,
              type: '전공선택',
              professor: '강디비 교수님',
              location: '공학관 B102호',
              schedule: [{ day: '화', startTime: '13:30', endTime: '15:00' }, { day: '목', startTime: '13:30', endTime: '15:00' }]
            },
            color: '#0ea5e9'
          },
          {
            courseId: 'ge-psych',
            course: {
              id: 'ge-psych',
              name: '현대 사회와 심리학',
              code: 'GE-101',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '허심리 교수님',
              location: '교양학관 102호',
              schedule: [{ day: '월', startTime: '10:30', endTime: '12:00' }, { day: '수', startTime: '10:30', endTime: '12:00' }]
            },
            color: '#dcfd8b'
          },
          {
            courseId: 'ge-art',
            course: {
              id: 'ge-art',
              name: '현대 미술의 서술과 비평',
              code: 'GE-103',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '안미술 교수님',
              location: '예술융합동 301호',
              schedule: [{ day: '화', startTime: '10:30', endTime: '12:00' }, { day: '목', startTime: '10:30', endTime: '12:00' }]
            },
            color: '#dcfd8b'
          },
          {
            courseId: 'cs-web',
            course: {
              id: 'cs-web',
              name: '초급 웹 프론트엔드 실무',
              code: 'CS-108',
              department: '컴퓨터공학과',
              year: 1,
              credits: 3,
              type: '전공선택',
              professor: '이웹 교수님',
              location: '공학실습관 101호',
              schedule: [{ day: '수', startTime: '15:00', endTime: '16:30' }]
            },
            color: '#0ea5e9'
          }
        ],
        aiExplanation: '### 📜 2025학년도 2학기 역사 설계 분석\n\n* 금요일 완전 공강 수립 및 화일연합 집중 수율\n* 전공 핵심(알고리즘, OOP)을 월-화-수-목에 견고히 분산 배강하여 일과 균형을 극대화.',
        metadata: {
          totalCredits: 18,
          fulfilledFreeDays: ['금'],
          majorRatio: 67,
          liberalRatio: 33
        },
        planB: []
      }
    },
    {
      id: 'hist-2',
      semester: '2025학년도 1학기',
      title: '🔥 전공 몰입형 고학점 스펙업 전술 (최적 18학점)',
      totalCredits: 18,
      department: '컴퓨터공학과',
      year: 2,
      date: '2025-02-15',
      data: {
        schedule: [
          {
            courseId: 'cs-discrete',
            course: {
              id: 'cs-discrete',
              name: '이산 구조와 알고리즘 수학',
              code: 'CS-205',
              department: '컴퓨터공학과',
              year: 2,
              credits: 3,
              type: '전공필수',
              professor: '설수학 교수님',
              location: 'IT 융합관 205호',
              schedule: [{ day: '월', startTime: '09:00', endTime: '10:30' }, { day: '수', startTime: '09:00', endTime: '10:30' }]
            },
            color: '#3b82f6'
          },
          {
            courseId: 'cs-oop',
            course: {
              id: 'cs-oop',
              name: '객체지향 프로그래밍',
              code: 'CS-301',
              department: '컴퓨터공학과',
              year: 2,
              credits: 3,
              type: '전공필수',
              professor: '박객체 교수님',
              location: '공학관 201호',
              schedule: [{ day: '화', startTime: '09:00', endTime: '10:30' }, { day: '목', startTime: '09:00', endTime: '10:30' }]
            },
            color: '#3b82f6'
          },
          {
            courseId: 'cs-web',
            course: {
              id: 'cs-web',
              name: '초급 웹 프론트엔드 실무',
              code: 'CS-108',
              department: '컴퓨터공학과',
              year: 1,
              credits: 3,
              type: '전공선택',
              professor: '이웹 교수님',
              location: '공학실습관 101호',
              schedule: [{ day: '화', startTime: '13:30', endTime: '15:00' }, { day: '목', startTime: '13:30', endTime: '15:00' }]
            },
            color: '#0ea5e9'
          },
          {
            courseId: 'cs-db',
            course: {
              id: 'cs-db',
              name: '데이터베이스 시스템 설계',
              code: 'CS-304',
              department: '컴퓨터공학과',
              year: 3,
              credits: 3,
              type: '전공선택',
              professor: '강디비 교수님',
              location: '공학관 B102호',
              schedule: [{ day: '화', startTime: '15:00', endTime: '16:30' }, { day: '목', startTime: '15:00', endTime: '16:30' }]
            },
            color: '#0ea5e9'
          },
          {
            courseId: 'ge-psych',
            course: {
              id: 'ge-psych',
              name: '현대 사회와 심리학',
              code: 'GE-101',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '허심리 교수님',
              location: '교양학관 102호',
              schedule: [{ day: '월', startTime: '13:30', endTime: '15:00' }, { day: '수', startTime: '13:30', endTime: '15:00' }]
            },
            color: '#dcfd8b'
          },
          {
            courseId: 'ge-philosophy',
            course: {
              id: 'ge-philosophy',
              name: '인간의 가치와 윤리적 사유',
              code: 'GE-106',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '임인문 교수님',
              location: '인문인공동 202호',
              schedule: [{ day: '월', startTime: '15:30', endTime: '17:00' }]
            },
            color: '#dcfd8b'
          }
        ],
        aiExplanation: '### 📜 2025학년도 1학기 역사 설계 분석\n\n* 전공과 교양의 유기적 상호 구조화\n* 화요일 및 목요일의 코딩 몰입 시간 극대화를 통한 전공 경쟁력 심화 전술.',
        metadata: {
          totalCredits: 18,
          fulfilledFreeDays: ['금'],
          majorRatio: 67,
          liberalRatio: 33
        },
        planB: []
      }
    },
    {
      id: 'hist-3',
      semester: '2024학년도 2학기',
      title: '💻 실무 지식 확장 및 가성비 시간표 (총 15학점)',
      totalCredits: 15,
      department: '컴퓨터공학과',
      year: 1,
      date: '2024-08-20',
      data: {
        schedule: [
          {
            courseId: 'cs-web',
            course: {
              id: 'cs-web',
              name: '초급 웹 프론트엔드 실무',
              code: 'CS-108',
              department: '컴퓨터공학과',
              year: 1,
              credits: 3,
              type: '전공선택',
              professor: '이웹 교수님',
              location: '공학실습관 101호',
              schedule: [{ day: '화', startTime: '13:30', endTime: '15:00' }, { day: '목', startTime: '13:30', endTime: '15:00' }]
            },
            color: '#0ea5e9'
          },
          {
            courseId: 'ge-psych',
            course: {
              id: 'ge-psych',
              name: '현대 사회와 심리학',
              code: 'GE-101',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '허심리 교수님',
              location: '교양학관 102호',
              schedule: [{ day: '월', startTime: '10:30', endTime: '12:00' }, { day: '수', startTime: '10:30', endTime: '12:00' }]
            },
            color: '#dcfd8b'
          },
          {
            courseId: 'ge-art',
            course: {
              id: 'ge-art',
              name: '현대 미술의 서술과 비평',
              code: 'GE-103',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '안미술 교수님',
              location: '예술융합동 301호',
              schedule: [{ day: '화', startTime: '10:30', endTime: '12:00' }, { day: '목', startTime: '10:30', endTime: '12:00' }]
            },
            color: '#dcfd8b'
          },
          {
            courseId: 'ge-philosophy',
            course: {
              id: 'ge-philosophy',
              name: '인간의 가치와 윤리적 사유',
              code: 'GE-106',
              department: '교양선택',
              year: 1,
              credits: 3,
              type: '교양선택',
              professor: '임인문 교수님',
              location: '인문인공동 202호',
              schedule: [{ day: '금', startTime: '13:30', endTime: '15:00' }, { day: '금', startTime: '15:00', endTime: '16:30' }]
            },
            color: '#dcfd8b'
          }
        ],
        aiExplanation: '### 📜 2024학년도 2학기 역사 설계 분석\n\n* 부담 최소화 지향 저학점 및 초보 교양 학예 확장',
        metadata: {
          totalCredits: 12,
          fulfilledFreeDays: [],
          majorRatio: 25,
          liberalRatio: 75
        },
        planB: []
      }
    }
  ];

  const activeRecord = historyArchives.find(x => x.id === selectedId) || historyArchives[0];

  const handleApplyHistory = () => {
    onLoadSchedule(activeRecord.data);
  };

  return (
    <div id="history-view" className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
      {/* Title */}
      <section className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center space-x-2 text-lime-400">
          <Archive className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">학기 보관함</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">과거 학기 시간표 히스토리 라이브러리</h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          과거 학기에 추천 및 수립되었던 최적 전술 시간표들을 조회하고, 필요한 경우 현재 작업대로 즉시 호출하여 정밀 수정할 수 있습니다.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Semester Selector List */}
        <div className="md:col-span-4 bg-[#1e293b] border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase px-2 block mb-2">과거 학기 선택</span>
          {historyArchives.map(archive => (
            <button
              key={archive.id}
              onClick={() => setSelectedId(archive.id)}
              className={`w-full text-left p-3 rounded-xl border flex flex-col transition-all cursor-pointer ${
                selectedId === archive.id
                  ? 'bg-blue-600/10 border-[#3b82f6]'
                  : 'bg-slate-900/60 border-transparent hover:bg-slate-900 hover:border-slate-800'
              }`}
            >
              <span className="text-white font-bold text-xs sm:text-sm">{archive.semester}</span>
              <span className="text-slate-400 text-[10px] truncate mt-1">{archive.title}</span>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono">
                <span>{archive.totalCredits}학점</span>
                <span>{archive.date}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Archive Content Preview */}
        <div className="md:col-span-8 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[#dcfd8b] text-[10px] font-mono px-2 py-0.5 bg-[#dcfd8b]/10 rounded-full border border-[#dcfd8b]/20 font-bold">
              {activeRecord.semester} 수치 요지
            </span>
            <h3 className="text-white font-extrabold text-base sm:text-lg mt-2">{activeRecord.title}</h3>
            <p className="text-slate-400 text-xs mt-1">소속 학과: {activeRecord.department} ┃ 추천 학학년: {activeRecord.year}학년</p>
          </div>

          {/* Key Courses Summary List */}
          <div className="space-y-2.5">
            <h4 className="text-slate-300 font-bold text-xs">포함된 과목 정보 요약 ({activeRecord.data.schedule.length}과목)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeRecord.data.schedule.map(({ course, color }) => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-1.5 h-10 rounded shrink-0" style={{ backgroundColor: color }} />
                    <div className="truncate">
                      <div className="text-white font-bold text-xs truncate">{course.name}</div>
                      <div className="text-slate-500 text-[10px] truncate">{course.professor} ┃ {course.location}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 ml-2 shrink-0">{course.credits}학점</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger button to import history on active planner */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1.5 text-[11px] text-[#dcfd8b] bg-[#dcfd8b]/5 px-3 py-1.5 rounded-lg border border-[#dcfd8b]/10">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>작업판으로 불러와 현재 캘린더에서 가용할 수 있습니다.</span>
            </div>

            <button
              onClick={handleApplyHistory}
              className="px-5 py-2.5 bg-[#dcfd8b] hover:opacity-95 text-[#0f172a] font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>이 시간표 불러오기</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
