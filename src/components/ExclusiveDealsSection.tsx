'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/data/mockProperties';
import { Flame, ArrowRight, Sparkles, Tag, CheckCircle2, MapPin } from 'lucide-react';

interface ExclusiveDealsSectionProps {
  properties: Property[];
}

export default function ExclusiveDealsSection({ properties }: ExclusiveDealsSectionProps) {
  const dealProperties = properties.filter(p => p.isDeal);

  if (dealProperties.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-[#0B2948] to-[#071E36] text-white overflow-hidden relative">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A72C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Limited Time Offers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Exclusive Property Deals
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Discover handpicked properties with verified pricing discounts, price reductions, and special project offers.
            </p>
          </div>

          <Link
            href="/buy?deal=true"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D9A72C] hover:text-amber-300 bg-white/5 border border-amber-400/30 px-4 py-2 rounded-xl transition-all hover:bg-white/10 shrink-0"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* HORIZONTALLY SCROLLABLE CARDS */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {dealProperties.map((deal) => (
            <div
              key={deal.id}
              className="snap-start shrink-0 w-[290px] sm:w-[360px] bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/80 overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* IMAGE & BADGES */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                  <Image
                    src={deal.images[0]}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 300px, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                  {/* DEAL BADGE */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{deal.dealTag || 'HOT DEAL'}</span>
                  </div>

                  {deal.dealSavings && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                      Save {deal.dealSavings}
                    </div>
                  )}

                  {/* LOCATION OVERLAY */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-slate-200 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{deal.locality}, {deal.city}</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {deal.title}
                  </h3>

                  {/* PRICE COMPARISON BOX */}
                  <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Special Offer Price</p>
                      <p className="text-xl font-extrabold text-amber-400">
                        {deal.dealPriceFormatted || deal.priceFormatted}
                      </p>
                    </div>
                    {deal.priceFormatted && (
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Original Price</p>
                        <p className="text-sm font-semibold text-slate-400 line-through">
                          {deal.priceFormatted}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* HIGHLIGHT AMENITIES */}
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {deal.bedrooms} BHK
                    </span>
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {deal.area} sq.ft
                    </span>
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {deal.furnishing}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="p-4 sm:p-5 pt-0">
                <Link
                  href={`/property/${deal.id}`}
                  className="w-full bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>Claim & View Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
