'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GruhaLogo from '@/components/GruhaLogo';
import { useApp } from '@/context/AppContext';
import { Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { showToast, login } = useApp();
  const [emailOrPhone, setEmailOrPhone] = useState('abhi.temp@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('Abhi');
    showToast('Login Successful 🎉', 'Welcome back to GruhaSankalp!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <GruhaLogo className="justify-center" />
          <h1 className="text-xl font-extrabold text-slate-900 pt-2">Login to GruhaSankalp</h1>
          <p className="text-xs text-slate-500">Access saved properties, site visits, and Gruha AI insights</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email or Mobile Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B2948] hover:bg-[#123B63] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm border border-amber-400/40"
          >
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#D9A72C]" />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-semibold">Or continue with</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-3 rounded-xl border border-slate-200 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <span>Continue with Google</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Demo authentication for prototype testing. Click Login to access dashboard.
        </p>
      </div>
    </div>
  );
}
