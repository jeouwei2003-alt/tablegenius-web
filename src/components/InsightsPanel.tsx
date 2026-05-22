import React from 'react';
import { TimetableResult } from '../types';
import { Sparkles, CheckCircle2, Award, ArrowRight, Zap, RefreshCw, BarChart2 } from 'lucide-react';

interface InsightsPanelProps {
  result: TimetableResult;
}

function MDViewer({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2.5 text-slate-300 text-xs sm:text-sm text-left leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base font-bold text-white tracking-tight mt-6 mb-2.5 border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
              <span>{trimmed.slice(4)}</span>
            </h3>
          );
        }
        
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-xs font-bold text-[#dcfd8b] tracking-wider uppercase mt-4 mb-1.5">
              {trimmed.slice(5)}
            </h4>
          );
        }
        
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const mainText = trimmed.slice(2);
          const boldMatch = mainText.match(/\*\*(.*?)\*\*(.*)/);
          if (boldMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 select-text">
                <span className="text-blue-500 shrink-0 mt-1.5 text-[8px]">•</span>
                <span className="text-slate-300">
                  <strong className="text-white font-semibold">{boldMatch[1]}</strong>
                  <span>{boldMatch[2]}</span>
                </span>
              </div>
            );
          }
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 select-text">
              <span className="text-blue-500 shrink-0 mt-1.5 text-[8px]">•</span>
              <span className="text-slate-300">{mainText}</span>
            </div>
          );
        }
        
        if (trimmed === '---') {
          return <hr key={idx} className="border-slate-800/80 my-4" />;
        }
        
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const parts = trimmed.split(/\*\*(.*?)\*\*/g);
        if (parts.length > 1) {
          return (
            <p key={idx} className="select-text">
              {parts.map((part, pIdx) => (
                pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : <span key={pIdx}>{part}</span>
              ))}
            </p>
          );
        }

        return <p key={idx} className="select-text">{trimmed}</p>;
      })}
    </div>
  );
}

export function InsightsPanel({ result }: InsightsPanelProps) {
  const { totalCredits, fulfilledFreeDays, majorRatio, liberalRatio } = result.metadata;

  return (
    <div className="space-y-6">
      {/* Consulting Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Credits */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">최종 설계 이수학점</span>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{totalCredits}</span>
            <span className="text-xs text-[#dcfd8b] font-medium">학점 배정</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">이수 허용 조건 범위 매칭 성공</p>
        </div>

        {/* Free Days Status */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">공강요일 확보 상태</span>
          <div className="mt-2.5">
            {fulfilledFreeDays.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {fulfilledFreeDays.map(day => (
                  <span key={day} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 gap-1 resize-none animate-pulse">
                    <CheckCircle2 className="h-3 w-3" />
                    {day}요일 공강
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs text-amber-400 font-medium">요일 분산식 밸런스 배치</span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">학업 일정 밀도 및 자기계발 기여</p>
        </div>

        {/* Major vs Gen ratio */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">전공 vs 교양 밸런스</span>
          <div className="mt-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span>전공 {majorRatio}%</span>
              <span>교양 {liberalRatio}%</span>
            </div>
            <div className="w-full bg-[#0f172a] h-2 rounded-full overflow-hidden flex">
              <div className="bg-[#3b82f6] h-full" style={{ width: `${majorRatio}%` }} />
              <div className="bg-[#dcfd8b] h-full" style={{ width: `${liberalRatio}%` }} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">학습 부하 분산 비율 검증</p>
        </div>
      </div>

      {/* Main AI Strategy Report Card */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-xl shadow-slate-950/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800/80 mb-4">
          <span className="text-white font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5">
            <Award className="h-4 w-4 text-[#dcfd8b]" />
            AI 수강전략 컨설턴트 요지 진단 (Strategic AI Insight)
          </span>
        </div>

        {/* Render Formatted Report */}
        <MDViewer content={result.aiExplanation} />
      </div>

      {/* Plan B & C Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-amber-400" />
          경쟁 시나리오 대안 시간표 추천 (Alternative Scenarios)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.planB.map((alt, idx) => (
            <div key={idx} className="bg-[#0f172a]/80 border border-slate-800/80 p-5 rounded-2xl text-left hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h4 className="font-bold text-white text-sm">{alt.title}</h4>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Scenario {idx === 0 ? 'B' : 'C'}</span>
                </div>
                
                {/* Embedded Mini Courses list */}
                <div className="space-y-1.5 border-t border-b border-slate-800/60 py-2.5 my-2.5">
                  {alt.courses.map(course => (
                    <div key={course.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        <span className="text-slate-300 text-xs font-medium">{course.name}</span>
                        <span className="text-[9px] text-slate-500 font-sans tracking-tight">({course.type})</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#dcfd8b] bg-lime-500/10 border border-lime-500/10 px-1.5 py-0.2 rounded shrink-0">{course.scheduleStr}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5">
                  {alt.reason}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex justify-end gap-1.5 items-center text-[10px] text-[#3b82f6] font-mono font-semibold">
                <span>차선 대안 적용하기</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
