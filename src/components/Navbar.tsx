import React from 'react';
import { Sparkles, Calendar, HelpCircle, BookOpen } from 'lucide-react';

interface NavbarProps {
  onShowCatalog: () => void;
  onScrollToForm: () => void;
}

export function Navbar({ onShowCatalog, onScrollToForm }: NavbarProps) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-lg shadow-lg shadow-blue-500/10 border border-blue-400/30 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-indigo-100" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl tracking-tight text-white flex items-center">
                Table<span className="text-[#dcfd8b] ml-0.5">Genius</span>
              </span>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                AI Timetable Strategy
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button
              id="btn-nav-features"
              onClick={onScrollToForm}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-slate-900 flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>추천 설계기</span>
            </button>
            <button
              id="btn-nav-catalog"
              onClick={onShowCatalog}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-slate-900 flex items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4 text-lime-400" />
              <span>개설 과목 조회</span>
            </button>
            <a
              id="btn-nav-help"
              href="#guide"
              className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-slate-900 flex items-center gap-1.5"
            >
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <span>이용 가이드</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
