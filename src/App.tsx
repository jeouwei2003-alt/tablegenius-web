import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { InputForm } from './components/InputForm';
import { CalendarView } from './components/CalendarView';
import { InsightsPanel } from './components/InsightsPanel';
import { CourseCatalog } from './components/CourseCatalog';
import { UserInput, TimetableResult } from './types';
import { Sparkles, Compass, AlertCircle, BookOpen, Clock, Calendar, HelpCircle } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TimetableResult | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerateTimetable = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);

    // Scroll slightly down to make the progress state visible
    formRef.current?.scrollIntoView({ behavior: 'smooth' });

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('시간표 추천 도출 중 서버 응답 장애 발생.');
      }

      const data: TimetableResult = await response.json();
      setResult(data);

      // Smooth scroll to the result view
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e: any) {
      console.error(e);
      setError('서버 연결 실패 혹은 분석 지연이 발생하여 결과를 가져올 수 없었습니다. 오프라인 조건 처리 모드로 재시도 바랍니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-[#dcfd8b] selection:text-[#0f172a]">
      {/* Navbar Section */}
      <Navbar
        onShowCatalog={() => setShowCatalog(true)}
        onScrollToForm={handleScrollToForm}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Dynamic Catalog Panel Overlay at top if toggled */}
        {showCatalog && (
          <div id="course-catalog-overlay" className="animate-fade-in relative z-40 transition-all">
            <CourseCatalog onClose={() => setShowCatalog(false)} />
          </div>
        )}

        {/* Hero Banner Area */}
        <section className="text-center space-y-4 max-w-3xl mx-auto py-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/15 px-3.5 py-1 rounded-full text-[11px] sm:text-xs text-blue-400 font-mono tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#dcfd8b]" />
            <span>AI-Driven University Timetable Planner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            완벽한 대학 시간표 설계를 위한 <br className="hidden sm:inline" />
            초개인화 AI 도우미, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-[#dcfd8b]">TableGenius</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            학과 이수 요건, 졸업 충족 잔여 학점, 희망 공강일 및 전공 성향 비율을 분석하여 <br />
            수업 시간이 겹치지 않는 무결점 주간 시간표와 맞춤형 컨설팅 요지를 즉각 도출합니다.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleScrollToForm}
              className="px-5 py-2.5 bg-[#dcfd8b] hover:opacity-90 text-[#0f172a] font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-95"
            >
              커스텀 시간표 만들기
            </button>
            <button
              onClick={() => setShowCatalog(true)}
              className="px-5 py-2.5 bg-[#1e293b] border border-slate-800 hover:bg-[#1e293b]/70 text-[#dcfd8b] font-medium text-xs rounded-xl cursor-pointer transition-colors"
            >
              전체 개설 과목 둘러보기
            </button>
          </div>
        </section>

        {/* Form and Interaction Block */}
        <div ref={formRef} className="scroll-mt-20">
          <InputForm onSubmit={handleGenerateTimetable} isLoading={isLoading} />
        </div>

        {/* Critical Error Alert Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 flex items-center space-x-3 text-sm text-left">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loader Screen */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-[#1e293b] space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3b82f6] border-t-transparent"></div>
              <Sparkles className="h-4 w-4 text-[#dcfd8b] absolute animate-pulse" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-white tracking-tight animate-pulse">TableGenius가 충돌을 배제하여 최강의 동선을 빌딩 중입니다...</h3>
              <p className="text-[11px] text-slate-500">Gemini LLM 추론 및 이수학점 제약 조건 계산기를 즉각 구동하고 있습니다. 잠시만 기다려 주십시오.</p>
            </div>
          </div>
        )}

        {/* Results Showcase Area */}
        {result && !isLoading && (
          <div ref={resultRef} className="scroll-mt-20 space-y-8 animate-fade-in">
            {/* Divider Banner */}
            <div className="pt-4 text-center">
              <div className="inline-block px-4 py-1.5 bg-[#1e293b] rounded-full border border-slate-800 text-xs text-slate-400 font-semibold tracking-wide flex items-center gap-2 max-w-sm mx-auto justify-center">
                <Compass className="h-4 w-4 text-blue-400" />
                <span>AI 진단 결과 시간표 제안</span>
              </div>
            </div>

            {/* Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Weekly Grid */}
              <div className="lg:col-span-7">
                <CalendarView result={result} />
              </div>

              {/* Right Column: AI Consultant Panel & Alternatives */}
              <div className="lg:col-span-5">
                <InsightsPanel result={result} />
              </div>
            </div>
          </div>
        )}

        {/* Service Manual & Interactive Help Desk section */}
        <section id="guide" className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-left">
          <div className="flex items-center space-x-2 border-b border-slate-800/60 pb-3">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-tight">TableGenius 이용 규범 및 알고리즘 투명성 가이드</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>1. 시간표 충돌율 0% 원칙</span>
              </div>
              <p className="text-xs">
                본 시스템의 최우선 가치는 '수업 겹침 절대 불가'입니다. 시간표 구성 전에 모든 요일과 시간대를 분단위로 해시 체크하며, 9시 이전 이른 세션 및 오후 늦은 기각을 학생 성향에 따라 최적 분할 분산시킵니다.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span>2. 지정 공강 보증제</span>
              </div>
              <p className="text-xs">
                다중 선택한 희망 비수업 요일(예: 금요일 공강 구조)을 충족하기 위하여 해당 요일에 배정된 과목들을 정밀 배제하여 후보군 필터링을 거칩니다. 이로써 완벽한 수강 공강일 사수가 물리적으로 보장됩니다.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <BookOpen className="h-4 w-4 text-lime-400" />
                <span>3. 졸업 충족도 상향 설계</span>
              </div>
              <p className="text-xs">
                일반적인 임의 추천과 결을 달리하여, 개인이 입력한 졸업 여건 정보(전공/교양 부족학점)에 우선하는 학점 가중치를 매입합니다. 필수 이수를 충족함과 더불어, 개별적인 기입 키워드 취향을 수율합니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500 space-y-1.5 px-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#dcfd8b]">TableGenius ┃ Strategic Management Consulting Tool</p>
        <p>© 2026 TableGenius AI Lab. All rights reserved. Registered for AI Studio.</p>
        <p className="text-[10px] text-slate-600">본 도구는 실제 대학교 개설 과목의 겹침 분석 정보를 수식화하여 연립 추론하는 지능형 추천 시간표 시뮬레이터입니다.</p>
      </footer>
    </div>
  );
}
