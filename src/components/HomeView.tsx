import React from 'react';
import { Sparkles, Calendar, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onStartPlanning: () => void;
  onViewCatalog: () => void;
}

export function HomeView({ onStartPlanning, onViewCatalog }: HomeViewProps) {
  return (
    <div id="home-view" className="space-y-12 animate-fade-in text-left">
      {/* Immersive Welcome Hero Area */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs text-blue-400 font-mono tracking-wide uppercase">
            <Sparkles className="h-4 w-4 text-[#dcfd8b] animate-spin" style={{ animationDuration: '3s' }} />
            <span>AI 시간표 최적화 플랫폼</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-normal sm:leading-tight">
            대학 생활의 품격을 바꾸는 <br />
            무결점 AI 주간 시간표 솔루션
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            수백만 가지 과목 조합 중 실질 이수 요건, 잔여 학점, 나만의 공강 희망 요일 및 선호도를 실시간 분석합니다. 
            충돌율 0%에 수렴하는 완벽하고 스마트한 시간표 설계를 도출하세요.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartPlanning}
              className="px-6 py-3.5 bg-[#dcfd8b] hover:opacity-95 text-[#0f172a] font-bold rounded-xl shadow-lg shadow-lime-500/10 flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer text-sm"
            >
              <span>AI 추천 설계기 시작하기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onViewCatalog}
              className="px-6 py-3.5 bg-[#1e293b] hover:bg-[#1e293b]/80 border border-slate-700 hover:border-slate-600 text-[#dcfd8b] font-medium rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer text-sm"
            >
              <span>전체 개설 과목 조회</span>
            </button>
          </div>
        </div>
      </section>

      {/* Platform Real-Time Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b] border border-slate-805/85 p-6 rounded-2xl flex items-start space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-1">초고속 엔진 충돌 검증</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              모든 개설 과목의 요일, 시작 시간 및 종료 시간을 밀리초 단위로 파싱하여 겹침을 원천 차단합니다.
            </p>
          </div>
        </div>

        <div className="bg-[#1e293b] border border-slate-805/85 p-6 rounded-2xl flex items-start space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-1">입력 조건 100% 수렴</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              설정한 졸업 필수 이수 가중치 및 비수업 공강일, 개인화 요구어를 종합 계산기에 반영하여 결과를 도출합니다.
            </p>
          </div>
        </div>

        <div className="bg-[#1e293b] border border-slate-805/85 p-6 rounded-2xl flex items-start space-x-4">
          <div className="p-3 bg-[#dcfd8b]/10 rounded-xl text-[#dcfd8b] border border-[#dcfd8b]/20">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-1">AI 지능형 컨설팅 피드백</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              시간표 구성 의도와 특징에 맞춘 세부적인 학업 전략 리포트 및 Plan B 대안 경로를 리얼타임 배출합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Guide Banner */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-white font-extrabold text-lg sm:text-xl">새 학기 수강신청 실패 확률을 낮추고 싶나요?</h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            AI 엔진이 제시하는 Plan A, B 전술을 바탕으로 본인에게 최고의 시너지 조합을 찾을 수 있습니다.
          </p>
        </div>
        <button
          onClick={onStartPlanning}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl transition-all font-mono uppercase tracking-wider shrink-0"
        >
          설계기 바로 가기
        </button>
      </section>
    </div>
  );
}
