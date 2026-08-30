'use client';

import React from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { useApp } from '@/context/AppContext';
import { Heart, Bell, Trash2, ArrowRight } from 'lucide-react';

export default function SavedPage() {
  const { properties, savedPropertyIds, searchAlerts } = useApp();

  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Saved Properties & Alerts</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your shortlisted homes and notification triggers</p>
      </div>

      {/* SAVED PROPERTIES LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span>My Shortlisted Properties ({savedProperties.length})</span>
        </h2>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">You haven&apos;t saved any properties yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click the heart icon on any property card to save it for quick reference and price drop alerts.
            </p>
            <Link
              href="/buy"
              className="inline-flex items-center gap-2 bg-[#0B2948] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:bg-[#123B63] transition-colors"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* SEARCH ALERTS */}
      {searchAlerts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Active Search Alerts</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchAlerts.map(alert => (
              <div key={alert.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0B2948]">{alert.city}</span>
                  <span className="text-[10px] text-slate-400">{alert.createdAt}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold">{alert.category} • {alert.bhk}</p>
                <p className="text-[11px] text-emerald-700 font-medium">✓ Auto-notifying on new listings</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
