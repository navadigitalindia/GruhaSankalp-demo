'use client';

import React from 'react';
import { Property } from '@/data/mockProperties';
import { Sparkles, CheckCircle2, Info, TrendingUp, ShieldCheck } from 'lucide-react';

interface GruhaAIAnalysisCardProps {
  property: Property;
}

export default function GruhaAIAnalysisCard({ property }: GruhaAIAnalysisCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#0B2948] to-[#123B63] rounded-3xl p-6 text-white shadow-xl border border-amber-400/30 relative overflow-hidden space-y-4">
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D9A72C]/10 rounded-full blur-2xl pointer-events-none" />

      {/* CARD HEADER */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">✨ Gruha AI Property Analysis</h3>
            <p className="text-xs text-slate-300">Intelligent property evaluation & locality score</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-amber-400">{property.aiMatch}%</span>
          <span className="block text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Overall Match</span>
        </div>
      </div>

      {/* WHY THIS PROPERTY REASONS */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Why This Property Standout:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {property.aiReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-slate-700/60 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI DISCLAIMER */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>AI-generated insights based on available listing information and market trend algorithms.</span>
      </div>
    </div>
  );
}
