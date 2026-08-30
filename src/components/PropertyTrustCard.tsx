'use client';

import React from 'react';
import { Property } from '@/data/mockProperties';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Camera, MapPin, UserCheck } from 'lucide-react';

interface PropertyTrustCardProps {
  property: Property;
}

export default function PropertyTrustCard({ property }: PropertyTrustCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-100 pb-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span>Property Verification Status</span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Locality & Geo-coordinates submitted</span>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Owner identity & contact verified</span>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">High resolution property photos uploaded</span>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="font-semibold">Title deed & RERA documents pending physical check</span>
          </div>
          <span className="text-[10px] bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded">Informational</span>
        </div>
      </div>
    </div>
  );
}
