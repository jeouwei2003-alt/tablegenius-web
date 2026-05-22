import React from 'react';
import { Sparkles, Calendar, HelpCircle, BookOpen, Home, MessageSquare, Archive, Share2, Compass } from 'lucide-react';

interface NavbarProps {
  onShowCatalog: () => void;
  currentTab: 'home' | 'features' | 'about' | 'feedback' | 'history' | 'share';
  onChangeTab: (tab: 'home' | 'features' | 'about' | 'feedback' | 'history' | 'share') => void;
}

export function Navbar({ onShowCatalog, currentTab, onChangeTab }: NavbarProps) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 md:h-16 gap-3 md:gap-0">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer self-center md:self-auto" onClick={() => onChangeTab('home')}>
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
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <button
              id="btn-nav-home"
              onClick={() => onChangeTab('home')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'home' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>홈</span>
            </button>
            <button
              id="btn-nav-features"
              onClick={() => onChangeTab('features')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'features' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>추천 설계기</span>
            </button>
            <button
              id="btn-nav-about"
              onClick={() => onChangeTab('about')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'about' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>소개</span>
            </button>
            <button
              id="btn-nav-feedback"
              onClick={() => onChangeTab('feedback')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'feedback' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>평가</span>
            </button>
            <button
              id="btn-nav-history"
              onClick={() => onChangeTab('history')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'history' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Archive className="h-4 w-4" />
              <span>보관함</span>
            </button>
            <button
              id="btn-nav-share"
              onClick={() => onChangeTab('share')}
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'share' ? 'text-[#dcfd8b] bg-slate-900 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Share2 className="h-4 w-4" />
              <span>공유</span>
            </button>
            <button
              id="btn-nav-catalog"
              onClick={onShowCatalog}
              className="text-slate-400 hover:text-white hover:bg-slate-900/40 px-2.5 py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1 border border-slate-800/80 ml-2"
            >
              <BookOpen className="h-3.5 w-3.5 text-lime-400" />
              <span>전체 과목</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
