import React, { useState } from 'react';
import { UNIVERSITY_COURSES } from '../courses';
import { Search, Filter, Book, Building, Star, Clock } from 'lucide-react';

interface CourseCatalogProps {
  onClose: () => void;
}

export function CourseCatalog({ onClose }: CourseCatalogProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | '전공필수' | '전공선택' | '교양선택'>('All');
  const [deptFilter, setDeptFilter] = useState<'All' | '컴퓨터공학과' | '경영학과' | '미디어커뮤니케이션학과' | '교양선택'>('All');

  const filtered = UNIVERSITY_COURSES.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.professor.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'All' || course.type === typeFilter;
    const matchesDept = deptFilter === 'All' || course.department === deptFilter;

    return matchesSearch && matchesType && matchesDept;
  });

  return (
    <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Book className="h-5 w-5 text-[#dcfd8b]" />
            대학 학과별 개설 교과목 일람 (Course Catalogue)
          </h2>
          <p className="text-xs text-slate-400">TableGenius가 관리하는 대학 개설 과목 정보 맵입니다.</p>
        </div>
        <button
          id="btn-close-catalog"
          onClick={onClose}
          className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs"
        >
          목록 닫기
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input
            id="catalog-search"
            type="text"
            placeholder="과목명, 코드, 교수명 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6]"
          />
        </div>

        <div>
          <select
            id="filter-type"
            value={typeFilter}
            onChange={(e: any) => setTypeFilter(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6]"
          >
            <option value="All">이수 구분 전체</option>
            <option value="전공필수">전공 필수</option>
            <option value="전공선택">전공 선택</option>
            <option value="교양선택">교양 선택</option>
          </select>
        </div>

        <div>
          <select
            id="filter-dept"
            value={deptFilter}
            onChange={(e: any) => setDeptFilter(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#3b82f6]"
          >
            <option value="All">소속 학과 전체</option>
            <option value="컴퓨터공학과">컴퓨터공학과</option>
            <option value="경영학과">경영학과</option>
            <option value="미디어커뮤니케이션학과">미디어커뮤니케이션학과</option>
            <option value="교양선택">교양 선택군</option>
          </select>
        </div>
      </div>

      {/* List results */}
      <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
        {filtered.length > 0 ? (
          filtered.map(course => (
            <div key={course.id} className="bg-[#0f172a]/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#0f172a]/95 hover:border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                    course.type === '전공필수' ? 'bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6]' :
                    course.type === '교양선택' ? 'bg-[#dcfd8b]/10 border-[#dcfd8b]/20 text-[#dcfd8b]' :
                    'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
                  }`}>
                    {course.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{course.code}</span>
                  <span className="text-[10px] text-slate-500">|</span>
                  <span className="text-[10px] text-slate-400 font-sans">{course.department}</span>
                </div>
                
                <h3 className="text-sm font-bold text-white mt-1.5">{course.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-slate-500" /> {course.professor}</span>
                  <span className="text-slate-700">•</span>
                  <span className="flex items-center gap-1"><Building className="h-3 w-3 text-slate-500" /> {course.location}</span>
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-800/40 pt-2 sm:pt-0 shrink-0">
                <span className="text-xs font-mono font-bold text-[#dcfd8b]">{course.credits}학점 이수</span>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 font-mono">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span>{course.schedule.map(s => `${s.day} ${s.startTime}~${s.endTime}`).join(', ')}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500 text-xs">일치하는 교과목 정보가 개설되어 있지 않습니다.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-slate-500 text-[10px] text-center">* 학비 규정에 따른 전공 및 교양 개설 조건에 맞춰 설계되어 있습니다.</div>
    </div>
  );
}
