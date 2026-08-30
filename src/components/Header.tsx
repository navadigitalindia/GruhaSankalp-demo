'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GruhaLogo from './GruhaLogo';
import { useApp } from '@/context/AppContext';
import { Heart, PlusCircle, User, Sparkles, Search, Menu, X, Compass, ShieldCheck } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { savedPropertyIds, openAiAssistant, compareList, isLoggedIn, loggedInUser, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'PG', href: '/pg' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Plots', href: '/plots' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LEFT: Logo & Company Name */}
          <div className="flex items-center gap-6">
            <GruhaLogo variant="light" showTagline />

            {/* AI Assistant Quick Pill (Desktop) */}
            <button
              onClick={() => openAiAssistant()}
              className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-[#0B2948] to-[#123B63] hover:from-[#123B63] hover:to-[#0B2948] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all border border-amber-400/30 hover:border-amber-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Ask Gruha AI</span>
            </button>
          </div>

          {/* CENTER: Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-[#0B2948] bg-slate-100 border-b-2 border-[#D9A72C]'
                      : 'text-slate-700 hover:text-[#0B2948] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Saved, Compare, Post Property, Login */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Compare Badge */}
            {compareList.length > 0 && (
              <Link
                href="/compare"
                className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-[#0B2948] border border-amber-300 px-2.5 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <span>Compare</span>
                <span className="bg-[#D9A72C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              </Link>
            )}

            {/* Saved Properties */}
            <Link
              href="/saved"
              className="relative flex items-center gap-1.5 text-slate-700 hover:text-[#0B2948] px-2.5 py-2 rounded-lg text-sm font-medium transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span className="hidden lg:inline font-bold">Saved</span>
              {savedPropertyIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {savedPropertyIds.length}
                </span>
              )}
            </Link>

            {/* Login / User Avatar */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-[#0B2948] text-white px-3 py-1.5 rounded-xl text-sm font-bold transition-colors hover:bg-[#123B63] border border-amber-400/30"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400/30 border border-amber-400 text-amber-300 text-xs font-extrabold flex items-center justify-center">
                    {loggedInUser.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="hidden lg:inline max-w-[100px] truncate">{loggedInUser}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 min-w-[160px] z-50 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Compass className="w-4 h-4 text-[#0B2948]" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <X className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#0B2948] px-3 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Post Property FREE CTA */}
            <Link
              href="/post-property"
              className="flex items-center gap-2 bg-[#0B2948] hover:bg-[#123B63] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all border border-amber-400/40 hover:shadow-md hover:scale-[1.01]"
            >
              <PlusCircle className="w-4 h-4 text-[#D9A72C]" />
              <span>Post Property</span>
            </Link>
          </div>

          {/* MOBILE HEADER CONTROLS */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openAiAssistant()}
              className="p-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-full"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <Link href="/buy" className="p-2 text-slate-700 hover:text-[#0B2948]" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B2948]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold text-center border ${
                  pathname === link.href
                    ? 'bg-[#0B2948] text-white border-[#0B2948]'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              href="/post-property"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#0B2948] text-white py-3 rounded-xl font-bold shadow-md text-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#D9A72C]" />
              <span>Post Property FREE</span>
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-2.5 rounded-xl font-semibold text-xs border border-slate-200"
              >
                <Compass className="w-4 h-4 text-[#0B2948]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-2.5 rounded-xl font-semibold text-xs border border-slate-200"
              >
                <ShieldCheck className="w-4 h-4 text-[#0B2948]" />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
