import React, { useState } from 'react';
import { UserInput } from '../types';
import { Sparkles, Calendar, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

const PRESET_KEYWORDS = [
  '오전 수업 회피 😴',
  '금요일 공강 보장 ✈️',
  '프로그래밍 중심 💻',
  '이론 중심 📚',
  '팀플 소량 🤝',
  '1일 연강 축소 ⚡'
];

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [department, setDepartment] = useState<string>('컴퓨터공학과');
  const [year, setYear] = useState<number>(2);
  const [semester, setSemester] = useState<string>('1학기');
  const [minCredits, setMinCredits] = useState<number>(12);
  const [maxCredits, setMaxCredits] = useState<number>(18);
  const [preferredFreeDays, setPreferredFreeDays] = useState<string[]>(['금']);
  const [majorGap, setMajorGap] = useState<number>(9);
  const [generalGap, setGeneralGap] = useState<number>(3);
  const [customKeywords, setCustomKeywords] = useState<string>('');

  const handleFreeDayToggle = (day: string) => {
    if (preferredFreeDays.includes(day)) {
      setPreferredFreeDays(preferredFreeDays.filter(d => d !== day));
    } else {
      setPreferredFreeDays([...preferredFreeDays, day]);
    }
  };

  const handleKeywordPresets = (preset: string) => {
    // Strip emojis
    const rawPreset = preset.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
    if (customKeywords.includes(rawPreset)) {
      return;
    }
    setCustomKeywords(prev => prev ? `${prev}, ${rawPreset}` : rawPreset);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      department,
      year,
      semester,
      minCredits,
      maxCredits,
      preferredFreeDays,
      creditGaps: {
        majorRequired: majorGap,
        generalElective: generalGap,
      },
      customKeywords: customKeywords.trim()
    });
  };

  return (
    <div id="ideal-timetable-form" className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-[#3b82f6]/10 rounded-lg text-[#3b82f6] border border-[#3b82f6]/20">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">나의 이상적인 시간표 커스텀 설계</h2>
          <p className="text-slate-400 text-xs">학생 성향, 부족 조건, 공강 요일을 지능적으로 조율합니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: 기본 정보 - 학과, 학년, 학기 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">소속 학과</label>
            <select
              id="department-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-[#3b82f6] hover:border-slate-600 transition-colors"
            >
              <option value="컴퓨터공학과">컴퓨터공학과</option>
              <option value="경영학과">경영학과</option>
              <option value="미디어커뮤니케이션학과">미디어커뮤니케이션학과</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">대상 학년</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  id={`btn-year-${num}`}
                  type="button"
                  onClick={() => setYear(num)}
                  className={`py-3 rounded-xl border text-xs font-semibold md:font-medium transition-all ${
                    year === num
                      ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#3b82f6]'
                      : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {num}학년
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">신청 학기</label>
            <div className="grid grid-cols-2 gap-2">
              {['1학기', '2학기'].map(sem => (
                <button
                  key={sem}
                  id={`btn-sem-${sem}`}
                  type="button"
                  onClick={() => setSemester(sem)}
                  className={`py-3 rounded-xl border text-xs font-semibold md:font-medium transition-all ${
                    semester === sem
                      ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#3b82f6]'
                      : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: 핵심 제약 - 학점 범위 & 선호 공강일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">희망 이수 학점 범위</label>
            <div className="flex items-center space-x-3 bg-[#0f172a] border border-slate-700 rounded-xl p-3">
              <input
                id="min-credits-input"
                type="number"
                min={6}
                max={24}
                value={minCredits}
                onChange={(e) => setMinCredits(Number(e.target.value))}
                className="w-full bg-transparent text-center text-white font-semibold text-sm focus:outline-none"
                placeholder="최소"
              />
              <span className="text-slate-600 text-xs">~</span>
              <input
                id="max-credits-input"
                type="number"
                min={6}
                max={24}
                value={maxCredits}
                onChange={(e) => setMaxCredits(Number(e.target.value))}
                className="w-full bg-transparent text-center text-white font-semibold text-sm focus:outline-none"
                placeholder="최대"
              />
              <span className="text-slate-400 text-xs pr-1">학점</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">* 통상적인 권장 범위는 15~18학점입니다.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">희망 비수업 공강일 (다중 선택)</label>
            <div className="grid grid-cols-5 gap-2">
              {['월', '화', '수', '목', '금'].map(day => {
                const isSelected = preferredFreeDays.includes(day);
                return (
                  <button
                    key={day}
                    id={`btn-freeday-${day}`}
                    type="button"
                    onClick={() => handleFreeDayToggle(day)}
                    className={`py-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#3b82f6]'
                        : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">* 공강요일을 많이 지정할 경우 과목 충돌 회피가 어려울 수 있습니다.</p>
          </div>
        </div>

        {/* Row 3: 졸업 요건 부족 학점 */}
        <div className="p-4 bg-[#0f172a] border border-slate-800 rounded-xl">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-[#3b82f6] rounded-full"></span>
            졸업 요건 부족 학점 자가 입력
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-slate-400">전공 이수 부족 학점</span>
                <span className="text-xs font-mono font-semibold text-blue-400">{majorGap}학점</span>
              </div>
              <input
                id="major-gap-range"
                type="range"
                min={0}
                max={30}
                step={3}
                value={majorGap}
                onChange={(e) => setMajorGap(Number(e.target.value))}
                className="w-full accent-[#3b82f6] bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-slate-400">교양 이수 부족 학점</span>
                <span className="text-xs font-mono font-semibold text-[#dcfd8b]">{generalGap}학점</span>
              </div>
              <input
                id="general-gap-range"
                type="range"
                min={0}
                max={30}
                step={2}
                value={generalGap}
                onChange={(e) => setGeneralGap(Number(e.target.value))}
                className="w-full accent-[#dcfd8b] bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Row 4: 개인화 텍스트 선호 및 퀵 키워드 추천 */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">개인화 요구사항 및 정밀 선호</label>
          <input
            id="custom-keywords-input"
            type="text"
            value={customKeywords}
            onChange={(e) => setCustomKeywords(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-[#3b82f6] hover:border-slate-600 transition-colors"
            placeholder="예: 실무 코딩 실습 위주, 오후 시간대 중심 수강, 팀프로젝트 부담 최소화"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[10px] text-slate-500 self-center mr-1">💡 퀵 키워드 추천:</span>
            {PRESET_KEYWORDS.map(preset => (
              <button
                key={preset}
                id={`btn-preset-${preset.split(' ')[0]}`}
                type="button"
                onClick={() => handleKeywordPresets(preset)}
                className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-2.5 py-1 rounded-full text-[10px] sm:text-xs transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button with premium active design */}
        <button
          id="btn-generate-timetable"
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#dcfd8b] hover:opacity-90 active:scale-95 text-[#0f172a] font-bold py-4 rounded-xl shadow-lg shadow-lime-500/10 border border-lime-400/20 flex items-center justify-center space-x-2.5 transition-all text-sm md:text-base disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0f172a] border-t-transparent"></div>
              <span className="animate-pulse">TableGenius AI 시간표 정밀 분석 매칭 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-[#0f172a]" />
              <span>AI 지능형 시간표 추천 도출하기</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
