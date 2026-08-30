'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GruhaLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export default function GruhaLogo({ variant = 'light', className = '', showTagline = false }: GruhaLogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-transform hover:scale-[1.02] ${className}`}>
      {/* ACTUAL COMPANY LOGO IMAGE */}
      <div className="relative w-11 h-11 shrink-0">
        <Image
          src="/logo.png"
          alt="GruhaSankalp Logo"
          fill
          className="object-contain"
          sizes="44px"
          priority
        />
      </div>

      {/* COMPANY NAME BESIDE LOGO */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0B2948]'}`}>
            Gruha
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#D9A72C]">
            Sankalp
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Real Estate Platform
          </span>
        )}
      </div>
    </Link>
  );
}
