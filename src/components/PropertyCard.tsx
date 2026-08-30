'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/data/mockProperties';
import { useApp } from '@/context/AppContext';
import { Heart, CheckCircle2, MapPin, Bed, Bath, Maximize2, Sparkles, Phone, Calendar, Scale, Flame, Tag } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
  footerActions?: React.ReactNode;
}

export default function PropertyCard({ property, compact = false, footerActions }: PropertyCardProps) {
  const { savedPropertyIds, toggleSaveProperty, toggleCompare, compareList, scheduleVisit } = useApp();
  const isSaved = savedPropertyIds.includes(property.id);
  const isComparing = compareList.some(p => p.id === property.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* CARD IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {property.verified && (
              <span className="bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                <span>Verified</span>
              </span>
            )}
            {property.isDeal && (
              <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                <Flame className="w-3 h-3 text-amber-200" />
                <span>{property.dealTag || 'DEAL'}</span>
              </span>
            )}
            <span className="bg-[#0B2948]/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
              {property.purpose}
            </span>
          </div>

          {/* HEART SAVE BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
            aria-label="Save property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* BOTTOM OVERLAY INFO: PRICE & AI MATCH */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md">
                {property.isDeal && property.dealPriceFormatted ? property.dealPriceFormatted : property.priceFormatted}
              </span>
              {property.isDeal && property.priceFormatted && (
                <span className="text-xs text-slate-300 line-through font-medium">
                  {property.priceFormatted}
                </span>
              )}
            </div>
            {property.pricePerSqFt && (
              <p className="text-[11px] text-slate-200 font-medium">₹{property.pricePerSqFt.toLocaleString()} / sq.ft</p>
            )}
          </div>

          {/* AI MATCH BADGE */}
          <div className="bg-[#0B2948]/90 text-amber-300 border border-amber-400/40 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{property.aiMatch}% Match</span>
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* TITLE */}
          <Link href={`/property/${property.id}`} className="block group-hover:text-[#0B2948] transition-colors">
            <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:underline decoration-amber-400 decoration-2">
              {property.title}
            </h3>
          </Link>

          {/* LOCATION */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{property.locality}, {property.city}</span>
          </div>
        </div>

        {/* SPECIFICATIONS GRID */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-xs font-medium">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1.5" title="Bedrooms">
              <Bed className="w-3.5 h-3.5 text-[#0B2948]" />
              <span>{property.bedrooms} BHK</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1.5" title="Bathrooms">
              <Bath className="w-3.5 h-3.5 text-[#0B2948]" />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}
          <div className="flex items-center gap-1.5" title="Area">
            <Maximize2 className="w-3.5 h-3.5 text-[#0B2948]" />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* SAVINGS BADGE FOR DEALS */}
        {property.isDeal && property.dealSavings && (
          <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Special Offer</span>
            </span>
            <span className="font-bold text-emerald-700">Save {property.dealSavings}</span>
          </div>
        )}

        {/* CARD ACTIONS */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
          <Link
            href={`/property/${property.id}`}
            className="flex-1 bg-[#0B2948] hover:bg-[#123B63] text-white py-2 rounded-xl text-xs font-semibold text-center transition-colors shadow-sm"
          >
            View Details
          </Link>

          <button
            onClick={() => toggleCompare(property)}
            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1 ${
              isComparing
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Compare property"
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isComparing ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>
      </div>

      {/* OPTIONAL CUSTOM FOOTER ACTIONS (EDIT / DELETE / PROMOTE) */}
      {footerActions && (
        <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2">
          {footerActions}
        </div>
      )}
    </div>
  );
}
