'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, X } from 'lucide-react';

interface FilterSidebarProps {
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  selectedType: string;
  setSelectedType: (t: string) => void;
  selectedBhk: string;
  setSelectedBhk: (b: string) => void;
  priceRange: string;
  setPriceRange: (p: string) => void;
  furnishing: string;
  setFurnishing: (f: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  dealsOnly: boolean;
  setDealsOnly: (d: boolean) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedBhk,
  setSelectedBhk,
  priceRange,
  setPriceRange,
  furnishing,
  setFurnishing,
  verifiedOnly,
  setVerifiedOnly,
  dealsOnly,
  setDealsOnly,
  onReset
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-[#0B2948] font-extrabold text-base">
          <Filter className="w-4 h-4 text-[#D9A72C]" />
          <span>Filters</span>
        </div>

        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* SPECIAL TOGGLES */}
      <div className="space-y-2">
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer">
          <span className="font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Exclusive Deals Only</span>
          </span>
          <input
            type="checkbox"
            checked={dealsOnly}
            onChange={(e) => setDealsOnly(e.target.checked)}
            className="w-4 h-4 accent-[#0B2948] rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer">
          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Verified Properties Only</span>
          </span>
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 accent-[#0B2948] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* CITY / LOCALITY */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">City / Location</h4>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-[#0B2948]"
        >
          <option value="All">All Cities</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Gachibowli">Gachibowli, Hyderabad</option>
          <option value="Kondapur">Kondapur, Hyderabad</option>
          <option value="Madhapur">Madhapur, Hyderabad</option>
          <option value="Kokapet">Kokapet, Hyderabad</option>
          <option value="Kukatpally">Kukatpally, Hyderabad</option>
          <option value="Miyapur">Miyapur, Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
        </select>
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">Property Type</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'Apartment', 'Villa', 'Builder Floor', 'Plot', 'PG', 'Commercial'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-2 rounded-lg text-xs font-semibold text-center border transition-colors ${
                selectedType === type
                  ? 'bg-[#0B2948] text-white border-[#0B2948]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* BHK CONFIGURATION */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">BHK Configuration</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {['All', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBhk(b)}
              className={`py-2 rounded-lg text-xs font-semibold text-center border transition-colors ${
                selectedBhk === b
                  ? 'bg-[#0B2948] text-white border-[#0B2948]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* BUDGET RANGE */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">Budget Range</h4>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-[#0B2948]"
        >
          <option value="All">Any Budget</option>
          <option value="Under 50L">Under ₹50 Lakhs</option>
          <option value="50L - 1Cr">₹50 Lakhs – ₹1 Crore</option>
          <option value="1Cr - 2Cr">₹1 Crore – ₹2 Crores</option>
          <option value="Above 2Cr">Above ₹2 Crores</option>
        </select>
      </div>

      {/* FURNISHING STATUS */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">Furnishing Status</h4>
        <div className="grid grid-cols-1 gap-1.5">
          {['All', 'Fully Furnished', 'Semi Furnished', 'Unfurnished'].map((f) => (
            <button
              key={f}
              onClick={() => setFurnishing(f)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold text-left border transition-colors ${
                furnishing === f
                  ? 'bg-[#0B2948] text-white border-[#0B2948]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
