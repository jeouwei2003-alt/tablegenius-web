import React from 'react';
import { Compass, ShieldCheck, Heart, Users, Check, Building } from 'lucide-react';

export function AboutView() {
  return (
    <div id="about-view" className="space-y-12 animate-fade-in text-left max-w-4xl mx-auto">
      {/* Introduction */}
      <section className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Compass className="h-6 w-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">TableGenius 철학 및 개발팀 소개</h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          <strong>TableGenius</strong>는 평범한 시간표 생성 엑셀 시트에서 탈피하여 대학교 학업 설계의 패러다임을 혁신하기 위해 모인 
          소프트웨어 지능 연구실(AI Lab)의 학업 공학 프로젝트입니다. 매 학기 수강 신청 시기마다 겪는 학생들의 고질적인 '시간 충돌', 
          '공강 일수 불일치', '졸업 요건 복잡성'이라는 현실적 고충을 해체하기 위해 특화된 전용 알고리즘을 빌딩하였습니다.
        </p>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 w-fit">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-white font-bold text-lg">알고리즘 무결성 보증</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            자체적인 조건 만족 문제(CSP) 전용 수치 계산기를 기반으로, 학생 요구와 교과 제약 속 극단적인 겹침을 정밀 계산하여 
            오류 없는 시간표와 Plan B 구조를 완벽하게 유지합니다.
          </p>
        </div>

        <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-2 bg-lime-500/10 rounded-xl text-lime-400 w-fit">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="text-white font-bold text-lg">학생 중심적 맞춤 공학</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            주목적은 단순히 시간표를 메우는 것을 넘어, 공강 및 전공 비중 등의 세밀한 생활 밸런스를 고려하여 자기주도적 성장을 도모하게 하는 행복 설계 도구입니다.
          </p>
        </div>
      </section>

      {/* Development Journey / Execution Method */}
      <section className="bg-slate-900 border border-slate-850 p-6 sm:p-8 rounded-2xl space-y-6">
        <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-[#dcfd8b]" />
          <span>연구원 및 기여 파트너 정보</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-[#1e293b] border border-slate-800 rounded-xl space-y-1">
            <div className="text-white font-bold">김지능 연구원 (AI Core Architect)</div>
            <div className="text-[#dcfd8b] text-[10px] sm:text-xs">서울 지능정보 융합 대학원 컴퓨터 전공</div>
            <p className="text-slate-400 text-[11px] pt-1">LLM 추론 구조와 복잡한 다자간 수강 일정 연산 솔버 연동 설계를 도맡았습니다.</p>
          </div>

          <div className="p-4 bg-[#1e293b] border border-slate-800 rounded-xl space-y-1">
            <div className="text-white font-bold">이지연 디자이너 (Lead UX Designer)</div>
            <div className="text-[#dcfd8b] text-[10px] sm:text-xs">UI/UX 정보 시각화 전공</div>
            <p className="text-slate-400 text-[11px] pt-1">학생들의 피로를 덜어주는 고대비 테마와 편리한 시간 표시 그리드 흐름을 연출하였습니다.</p>
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h4 className="text-white font-bold text-base flex items-center gap-2 border-b border-slate-800 pb-3">
          <Building className="h-4.5 w-4.5 text-blue-400" />
          <span>기술 사양 및 파트너 컴플라이언스</span>
        </h4>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#dcfd8b] shrink-0 mt-0.5" />
            <span>최신 자연어 처리 기법인 @google/genai SDK와 Gemini-3.5-Flash 모델의 지능형 결합 최우선 연산 탑재</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#dcfd8b] shrink-0 mt-0.5" />
            <span>시간 분광 파싱 엔진: 분 단위 해시 테이블 체크로 일정 중복 배제 안전율 100% 확보 보장</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#dcfd8b] shrink-0 mt-0.5" />
            <span>학생 전용 이수요건 자가 계산기 결합: 졸업 진단 가중 알고리즘 동시 가동</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
