'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/data/mockProperties';
import { useApp } from '@/context/AppContext';
import { X, Sparkles, Check, ExternalLink, Calendar, PlusCircle, Scale } from 'lucide-react';

interface CompareTableProps {
  properties: Property[];
}

export default function CompareTable({ properties }: CompareTableProps) {
  const { toggleCompare, clearCompare } = useApp();

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-[#0B2948] rounded-full flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8 text-[#D9A72C]" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">No Properties Added for Comparison</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Click the <span className="font-bold text-[#0B2948]">Compare</span> button on any property card to compare up to 3 properties side-by-side.
        </p>
        <Link
          href="/buy"
          className="inline-block bg-[#0B2948] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:bg-[#123B63] transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  // Find top recommended property based on AI Match %
  const bestMatch = [...properties].sort((a, b) => b.aiMatch - a.aiMatch)[0];

  return (
    <div className="space-y-6">
      {/* HEADER & CLEAR */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Property Comparison Matrix</h2>
          <p className="text-xs text-slate-500">Evaluating {properties.length} properties side-by-side</p>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs text-rose-600 hover:underline font-bold"
        >
          Clear Comparison
        </button>
      </div>

      {/* MATRIX TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-lg">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 w-44 font-extrabold text-slate-500 uppercase text-[11px] tracking-wider">Features</th>
              {properties.map((prop) => (
                <th key={prop.id} className="p-4 min-w-[240px] relative border-l border-slate-200">
                  <button
                    onClick={() => toggleCompare(prop)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-2">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
                      <Image src={prop.images[0]} alt={prop.title} fill className="object-cover" />
                      {bestMatch.id === prop.id && (
                        <div className="absolute top-2 left-2 bg-[#D9A72C] text-[#0B2948] font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>BEST VALUE</span>
                        </div>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</h4>
                    <p className="text-lg font-black text-[#0B2948]">{prop.priceFormatted}</p>

                    <Link
                      href={`/property/${prop.id}`}
                      className="block text-center bg-[#0B2948] text-white py-2 rounded-xl text-xs font-semibold hover:bg-[#123B63]"
                    >
                      View Details
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">AI Match Rating</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 font-extrabold text-amber-600">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{p.aiMatch}% Match</span>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Locality & City</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800 font-medium">
                  {p.locality}, {p.city}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Super Area</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800 font-semibold">
                  {p.area} {p.areaUnit}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Price / sq.ft</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800">
                  {p.pricePerSqFt ? `₹${p.pricePerSqFt.toLocaleString()} / sq.ft` : 'N/A'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Bedrooms / BHK</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800">
                  {p.bedrooms ? `${p.bedrooms} BHK` : 'N/A'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Bathrooms</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800">
                  {p.bathrooms || 'N/A'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Furnishing</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800 font-medium">
                  {p.furnishing || 'N/A'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Facing</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800">
                  {p.facing || 'East'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Possession Status</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800 font-semibold">
                  {p.possessionStatus || 'Ready to Move'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Key Amenities</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {p.amenities.slice(0, 4).map(a => (
                      <span key={a} className="bg-slate-100 text-[10px] px-2 py-0.5 rounded border border-slate-200">
                        {a}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
