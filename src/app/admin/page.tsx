'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, CheckCircle2, XCircle, Flame, Users, Building2, Bell, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const { properties, showToast } = useApp();
  const [propList, setPropList] = useState(properties);

  const handleApprove = (id: string) => {
    setPropList(prev => prev.map(p => p.id === id ? { ...p, verified: true } : p));
    showToast('Listing Verified', 'Property status updated to Verified.');
  };

  const handleToggleDeal = (id: string) => {
    setPropList(prev => prev.map(p => p.id === id ? { ...p, isDeal: !p.isDeal, dealTag: 'Hot Deal' } : p));
    showToast('Deal Updated', 'Property deal status updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ADMIN HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-2.5 py-0.5 rounded mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>SUPER ADMIN PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">GruhaSankalp Management</h1>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Listed Properties</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">{propList.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Verified Listings</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{propList.filter(p => p.verified).length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Featured Deals</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{propList.filter(p => p.isDeal).length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Registered Users</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">1,420</p>
        </div>
      </div>

      {/* PROPERTY VERIFICATION & DEAL MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden space-y-4 p-6">
        <h2 className="text-lg font-bold text-slate-900">Property Verification & Deal Controls</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
                <th className="p-3">Property</th>
                <th className="p-3">Location</th>
                <th className="p-3">Price</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Deal Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {propList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 max-w-[200px] truncate">{p.title}</td>
                  <td className="p-3 text-slate-600">{p.locality}, {p.city}</td>
                  <td className="p-3 font-extrabold text-[#0B2948]">{p.priceFormatted}</td>
                  <td className="p-3 text-slate-600">{p.owner.name} ({p.owner.type})</td>
                  <td className="p-3">
                    {p.verified ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Verified</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">Pending</span>
                    )}
                  </td>
                  <td className="p-3">
                    {p.isDeal ? (
                      <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[10px]">Active Deal</span>
                    ) : (
                      <span className="text-slate-400">Regular</span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(p.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-[10px]"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleToggleDeal(p.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-2.5 py-1 rounded text-[10px]"
                    >
                      {p.isDeal ? 'Remove Deal' : 'Make Deal'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
