import React, { useState } from 'react';
import { Star, MessageSquare, ShieldAlert, Award, StarHalf, ThumbsUp } from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  department: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export function FeedbackView() {
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('컴퓨터공학과');
  const [comment, setComment] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: '1',
      name: '김*민',
      department: '컴퓨터공학과',
      rating: 5,
      comment: '지정 공강 요일(금요일)을 아주 칼같이 배제하고 전공 필수 부족학점인 6학점을 채우도록 추천해줘서 깜짝 놀랐습니다! 겹치는 시간도 전혀 없고 최고의 시간표이네요.',
      date: '2026-05-20',
      likes: 12
    },
    {
      id: '2',
      name: '이*현',
      department: '경영학과',
      rating: 4,
      comment: '경영전공 과목 추천도 잘해주고 마음에 듭니다. 특히 AI 분석 리포트에서 과목별 팁이랑 학습 전략까지 짚어줘서 수강 동기부여가 잘 되는 것 같네요. 추천합니다.',
      date: '2026-05-18',
      likes: 8
    },
    {
      id: '3',
      name: '박*우',
      department: '전자공학과',
      rating: 5,
      comment: '실무 코딩 실습 중심 위주라는 개인화 키워드를 작성했더만 이에 매칭되는 실습 과목 위주로 일정을 잘 배치해 주었습니다. 무조건 이 번 새 학기 시간표로 밀고 나가려 합니다.',
      date: '2026-05-15',
      likes: 15
    }
  ]);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name: name.trim() ? name.trim() : '익명의 학생',
      department,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setComment('');
    setName('');
    setHasSubmitted(true);
    setTimeout(() => setHasSubmitted(false), 3000);
  };

  const handleLike = (id: string) => {
    setFeedbacks(feedbacks.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }));
  };

  const averageRating = (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1);

  return (
    <div id="feedback-view" className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
      {/* Page Title & Stats */}
      <section className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400">
            <MessageSquare className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">학생 만족도 평가 및 피드백</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">AI 배강 시간표 정확성 피드백 광장</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            TableGenius 알고리즘의 유효성을 진단하기 위해 학생들이 응답한 평점 통계입니다. 소중한 의견을 보태주세요.
          </p>
        </div>

        {/* Big Score Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 shrink-0 px-8">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-[#dcfd8b] font-mono">{averageRating}</span>
            <span className="text-slate-400 text-xs block mt-1">평균 만족 점수</span>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div>
            <div className="flex text-amber-400 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block font-sans">총 {feedbacks.length}개의 정직한 진단</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Rating Submission Form */}
        <div className="md:col-span-5 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-extrabold text-sm uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-800 pb-3">
            <Award className="h-4 w-4 text-[#dcfd8b]" />
            성향 자가 만족 한평가 작성
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">排课准确性评分 (AI 정확성 점수)</label>
              <div className="flex items-center space-x-1.5 bg-slate-900 p-3 rounded-xl justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="p-1.5 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        rating >= num ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">{rating}점 / 5</span>
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">이름 (익명 가능)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 홍길동 (보안 처리)"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            {/* Department Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">소속 학과</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-705 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6] transition-colors"
              >
                <option value="컴퓨터공학과">컴퓨터공학과</option>
                <option value="경영학과">경영학과</option>
                <option value="전자공학과">전자공학과</option>
                <option value="기계공학과">기계공학과</option>
                <option value="교양선택">기타/자유학과</option>
              </select>
            </div>

            {/* Rating comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">의견 및 AI 정확성 사용 소감</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                placeholder="시간표 가용성과 오차율, 요일 배열 등에 대해 학생 여러분의 진솔한 평가를 들려주세요."
                className="w-full bg-[#0f172a] border border-slate-705 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#dcfd8b] hover:opacity-90 text-[#0f172a] font-bold py-3 rounded-xl flex items-center justify-center space-x-1 transition-all text-xs"
            >
              <span>평가 피드백 제출하기</span>
            </button>

            {hasSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-3 text-xs text-center animate-fade-in flex items-center justify-center space-x-1.5">
                <span>평가가 성공적으로 등록되었습니다. 감사합니다!</span>
              </div>
            )}
          </form>
        </div>

        {/* List of Reviews */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-white font-extrabold text-sm uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-slate-800">
            총 {feedbacks.length}개의 학생 리얼 평가 리스닝
          </h3>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {feedbacks.map((item) => (
              <div key={item.id} className="bg-[#1e293b] border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between transition-all hover:border-slate-750">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-200">{item.name}</span>
                      <span className="text-[10px] text-slate-500">• {item.department}</span>
                    </div>
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            item.rating > i ? 'fill-current' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-normal">{item.comment}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>작성일: {item.date}</span>
                  <button
                    type="button"
                    onClick={() => handleLike(item.id)}
                    className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>도움됨 {item.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
