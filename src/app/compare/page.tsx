'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import CompareTable from '@/components/CompareTable';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

export default function ComparePage() {
  const { compareList, properties } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Compare Properties</h1>
        <p className="text-xs text-slate-500 mt-1">Side-by-side technical, financial, and AI match evaluation</p>
      </div>

      <CompareTable properties={compareList} />

      {compareList.length < 3 && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Add More Properties to Compare</h3>
          <p className="text-xs text-slate-500">Suggested top listings to compare against:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {properties.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
