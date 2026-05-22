import React, { useState } from 'react';
import { Share2, Copy, Send, Check, MessageCircle, Instagram, Twitter, Download } from 'lucide-react';
import { TimetableResult } from '../types';

interface ShareViewProps {
  result: TimetableResult | null;
}

export function ShareView({ result }: ShareViewProps) {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const mockShareUrl = `${window.location.origin}/share/schedule-${result?.metadata.totalCredits || 18}cr-${Date.now().toString().slice(-4)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = () => {
    if (!result) return;
    const sText = `🎯 TableGenius로 빌딩한 신학기 수강 계획!\n총 이수학점: ${result.metadata.totalCredits}학점\n\n[수강 과목 명문]\n${result.schedule.map(s => `- [${s.course.type}] ${s.course.name} (${s.course.professor})`).join('\n')}\n\n여러분도 최적의 시간표를 빌딩해 보세요! ✨`;
    navigator.clipboard.writeText(sText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div id="share-view" className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
      {/* Page Header */}
      <section className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center space-x-2 text-blue-400">
          <Share2 className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">소셜 및 일공유</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">동기들과 일주 시간표 일치 공유하기</h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          설계가 완료된 무결점 주간 시간표 정보를 원터치로 카카오톡, 인스타그램 등 소셜 미디어 플랫폼에 전달하고 소통할 수 있습니다.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Share Panel */}
        <div className="md:col-span-7 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-white font-extrabold text-sm uppercase tracking-wide border-b border-slate-800 pb-3">간편 퀵 링크 생성기</h3>

          <div className="space-y-4">
            {/* Copyable URL input widget */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">고유 공유 링크 주소</span>
              <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-2 items-center justify-between">
                <span className="text-slate-300 text-xs px-2 truncate select-all">{mockShareUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-[#dcfd8b] text-[#0f172a] hover:opacity-90 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? '복사 완료' : '링크 복사'}</span>
                </button>
              </div>
            </div>

            {/* Copyable Syllabus as Markdown text */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 block font-semibold uppercase">요약 텍스트 복사</span>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-slate-300 text-xs space-y-1.5 font-sans leading-relaxed">
                  <p className="font-bold text-[#dcfd8b]">🎯 TableGenius 최적 시간표 공유!</p>
                  <p>• 총 설계 이수학점: {result?.metadata.totalCredits || 18}학점</p>
                  {result ? (
                    result.schedule.slice(0, 3).map(s => (
                      <p key={s.courseId} className="text-slate-400 text-[11px]">
                        - {s.course.name} ({s.course.professor})
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-500 text-[11px] italic">검증 완료된 데이터가 없습니다. 먼저 추천 받기를 권장합니다.</p>
                  )}
                  {result && result.schedule.length > 3 && <p className="text-slate-500 text-[10px]">외 {result.schedule.length - 3}과목...</p>}
                </div>
                <button
                  onClick={handleCopyText}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-755 border border-slate-705 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  {copiedText ? <Check className="h-3.5 w-3.5 text-[#dcfd8b]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedText ? '텍스트 클립보드 저장됨' : '전체 요약 텍스트 복사'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Social Simulator Platforms */}
        <div className="md:col-span-5 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-extrabold text-sm uppercase tracking-wide border-b border-slate-800 pb-3">소셜 채널 원터치 전송</h3>

          <div className="space-y-3">
            {/* Kakao Talk */}
            <button
              onClick={() => alert('시뮬레이션: 카카오톡 수신인에게 연동 API 신호를 전달했습니다.')}
              className="w-full p-3.5 bg-[#fee500] hover:opacity-95 text-[#1e1e1e] rounded-xl flex items-center justify-between font-bold text-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 fill-[#1e1e1e]" />
                <span>카카오톡 친구 공유하기</span>
              </div>
              <Send className="h-3.5 w-3.5" />
            </button>

            {/* Instagram Stories */}
            <button
              onClick={() => alert('시뮬레이션: 인스타그램 캔버스 이미지 생성 및 연동을 진행했습니다.')}
              className="w-full p-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white rounded-xl flex items-center justify-between font-bold text-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Instagram className="h-5 w-5" />
                <span>스토리 템플릿 발행 (Insta)</span>
              </div>
              <Download className="h-3.5 w-3.5" />
            </button>

            {/* X / Twitter */}
            <button
              onClick={() => alert('시뮬레이션: X(구 트위터) 발행 팝업을 연동하였습니다.')}
              className="w-full p-3.5 bg-slate-950 border border-slate-800 hover:opacity-90 text-white rounded-xl flex items-center justify-between font-bold text-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Twitter className="h-5 w-5 fill-current" />
                <span>X 피드 공유 발송 (Twitter)</span>
              </div>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-xl text-[10px] leading-relaxed">
            * 위 버튼을 터치하여 동기 또는 단톡방에 자신의 요일 배치 정보를 전송하여 서로 비수업 일치 동선 여부를 직관 대조해 볼 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
