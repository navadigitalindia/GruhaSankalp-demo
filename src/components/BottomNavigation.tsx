'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Home, Search, Heart, Sparkles, User, Plus } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { savedPropertyIds, openAiAssistant } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around relative">
        {/* HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname === '/' ? 'text-[#0B2948] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${pathname === '/' ? 'text-[#0B2948]' : 'text-slate-400'}`} />
          <span className="mt-0.5 text-[10px]">Home</span>
        </Link>

        {/* SEARCH */}
        <Link
          href="/buy"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname === '/buy' || pathname === '/rent' ? 'text-[#0B2948] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className={`w-5 h-5 ${pathname === '/buy' || pathname === '/rent' ? 'text-[#0B2948]' : 'text-slate-400'}`} />
          <span className="mt-0.5 text-[10px]">Search</span>
        </Link>

        {/* AI ASSISTANT (CENTER HIGHLIGHTED BUTTON) */}
        <button
          onClick={() => openAiAssistant()}
          className="relative -top-3 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0B2948] via-[#123B63] to-[#D9A72C] p-0.5 shadow-lg animate-ai-pulse flex items-center justify-center">
            <div className="w-full h-full bg-[#0B2948] rounded-full flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#0B2948] mt-0.5">Gruha AI</span>
        </button>

        {/* SAVED */}
        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-medium relative transition-colors ${
            pathname === '/saved' ? 'text-[#0B2948] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className={`w-5 h-5 ${pathname === '/saved' ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
          <span className="mt-0.5 text-[10px]">Saved</span>
          {savedPropertyIds.length > 0 && (
            <span className="absolute top-0 right-2 bg-rose-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {savedPropertyIds.length}
            </span>
          )}
        </Link>

        {/* PROFILE / DASHBOARD */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname === '/dashboard' ? 'text-[#0B2948] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className={`w-5 h-5 ${pathname === '/dashboard' ? 'text-[#0B2948]' : 'text-slate-400'}`} />
          <span className="mt-0.5 text-[10px]">Profile</span>
        </Link>
      </div>
    </div>
  );
}
