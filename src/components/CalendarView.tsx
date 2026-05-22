import React, { useState } from 'react';
import { TimetableResult, Course } from '../types';
import { Calendar, MapPin, Clock, User, Landmark, Tag } from 'lucide-react';

interface CalendarViewProps {
  result: TimetableResult;
}

const DAYS: Array<'월' | '화' | '수' | '목' | '금'> = ['월', '화', '수', '목', '금'];
const HOUR_HEIGHT = 60; // pixels per hour
const START_HOUR = 9;   // 09:00
const END_HOUR = 18;    // 18:00

// Helper to calculate top and height in pixels from 09:00
function getBlockPosition(startTime: string, endTime: string) {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const startMinutes = (startH * 60 + startM) - (START_HOUR * 60);
  const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);

  // 1 hour = 60 minutes = HOUR_HEIGHT (60px) -> 1 minute = 1px
  const top = startMinutes;
  const height = durationMinutes;

  return { top, height };
}

export function CalendarView({ result }: CalendarViewProps) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Group classes by day
  const classesByDay: { [key: string]: typeof result.schedule } = {
    '월': [], '화': [], '수': [], '목': [], '금': []
  };

  result.schedule.forEach(item => {
    item.course.schedule.forEach(slot => {
      classesByDay[slot.day].push(item);
    });
  });

  return (
    <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-4 sm:p-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-[#dcfd8b]/10 rounded-lg text-[#dcfd8b]">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="font-sans font-bold text-slate-100 text-sm tracking-tight uppercase">주간 시간표 (Weekly Grid View)</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span> 전공필수
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span> 전공선택
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#dcfd8b]"></span> 교양선택
          </span>
        </div>
      </div>

      {/* Grid Canvas Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px] relative flex border border-slate-800/60 rounded-xl bg-slate-950/40 p-2">
          {/* Hour Labels Side Column */}
          <div className="w-14 flex flex-col justify-start pt-10 select-none pointer-events-none pr-1">
            {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, idx) => {
              const hour = START_HOUR + idx;
              return (
                <div
                  key={hour}
                  className="text-right text-[10px] font-mono text-slate-500"
                  style={{ height: `${HOUR_HEIGHT}px`, lineHeight: '10px' }}
                >
                  {String(hour).padStart(2, '0')}:00
                </div>
              );
            })}
          </div>

          {/* Day Columns */}
          <div className="flex-1 grid grid-cols-5 gap-2 relative">
            {DAYS.map((day) => {
              const dayClasses = classesByDay[day];

              return (
                <div key={day} className="flex flex-col relative">
                  {/* Day Header */}
                  <div className="text-center text-xs font-semibold text-slate-300 border-b border-slate-800/80 pb-2 mb-2">
                    {day}
                  </div>

                  {/* Relative calendar slot container */}
                  <div
                    className="relative w-full rounded-md bg-slate-900/45 border border-slate-800/30"
                    style={{ height: `${(END_HOUR - START_HOUR + 1) * HOUR_HEIGHT}px` }}
                  >
                    {/* Horizontal hour markers */}
                    {Array.from({ length: END_HOUR - START_HOUR }).map((_, idx) => (
                      <div
                        key={idx}
                        className="absolute w-full border-t border-slate-800/35"
                        style={{ top: `${(idx + 1) * HOUR_HEIGHT}px`, left: 0 }}
                      />
                    ))}

                    {/* Course blocks mapped absolutely */}
                    {dayClasses.map((item) => {
                      // Find the specific schedule block for this specific day
                      const scheduleBlock = item.course.schedule.find(s => s.day === day)!;
                      const { top, height } = getBlockPosition(scheduleBlock.startTime, scheduleBlock.endTime);

                      const isMajorReq = item.course.type === '전공필수';
                      const isLiberal = item.course.type === '교양선택';

                      // Determine styled borders and glow
                      let borderStyle = 'border-l-4 border-l-blue-500';
                      let bgStyle = 'bg-blue-600/10 text-blue-200 hover:bg-blue-600/15';

                      if (isLiberal) {
                        borderStyle = 'border-l-4 border-l-[#dcfd8b]';
                        bgStyle = 'bg-lime-500/10 text-lime-300 hover:bg-lime-500/15';
                      } else if (item.course.type === '전공선택') {
                        borderStyle = 'border-l-4 border-l-cyan-400';
                        bgStyle = 'bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/15';
                      }

                      return (
                        <div
                          key={`${item.course.id}-${day}`}
                          id={`course-block-${item.course.id}-${day}`}
                          className={`absolute left-0 w-full rounded border border-slate-800/80 p-1.5 text-[10px] sm:text-xs transition-all flex flex-col justify-between cursor-pointer group ${borderStyle} ${bgStyle}`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                          }}
                          onClick={() => setActiveCourse(item.course)}
                        >
                          <div className="overflow-hidden">
                            <span className="font-mono text-[8px] opacity-60 block tracking-tight">
                              {item.course.code}
                            </span>
                            <span className="font-bold line-clamp-2 leading-tight group-hover:text-white transition-colors">
                              {item.course.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-70 mt-0.5 whitespace-nowrap overflow-hidden">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            <span className="text-[9px] truncate">{item.course.location}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 text-slate-500 text-[10px] text-center">* 각 강좌 블록을 클릭하시면 교수정보, 수강 위치, 상세 시간표를 확인하실 수 있습니다.</div>

      {/* Dynamic Popover modal for course detail popup */}
      {activeCourse && (
        <div id="course-detail-modal" className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActiveCourse(null)}>
          <div
            className="w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-2xl p-5 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  activeCourse.type === '전공필수'
                    ? 'bg-blue-600/10 border-blue-500/20 text-blue-300'
                    : activeCourse.type === '교양선택'
                    ? 'bg-lime-500/10 border-lime-500/20 text-lime-300'
                    : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
                }`}>
                  {activeCourse.type}
                </span>
                <h4 className="text-base font-bold text-white mt-1.5 leading-tight">{activeCourse.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{activeCourse.code} | {activeCourse.department}</p>
              </div>
              <button
                id="btn-close-course-modal"
                className="text-slate-400 hover:text-white text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg"
                onClick={() => setActiveCourse(null)}
              >
                닫기
              </button>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 border-t border-slate-800 pt-3">
              <div className="flex items-center gap-2 text-slate-300 text-xs text-left">
                <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>담당 교수: <strong className="text-white">{activeCourse.professor}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs text-left">
                <Landmark className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>강의실: <strong className="text-white">{activeCourse.location}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs text-left">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>강의 일시: <strong className="text-white">{activeCourse.schedule.map(s => `${s.day}요일 ${s.startTime}~${s.endTime}`).join(', ')}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs text-left">
                <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>이수 학점: <strong className="text-[#dcfd8b]">{activeCourse.credits}학점</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
