'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, Layers, Mic, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SearchTabs() {
  const router = useRouter();
  const { openAiAssistant } = useApp();
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'PG' | 'COMMERCIAL' | 'PLOTS'>('BUY');
  const [cityLocality, setCityLocality] = useState('Hyderabad');
  const [bhk, setBhk] = useState('2 BHK');
  const [budget, setBudget] = useState('50L - 1Cr');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [isListening, setIsListening] = useState(false);

  const tabs = [
    { id: 'BUY', label: 'BUY' },
    { id: 'RENT', label: 'RENT' },
    { id: 'PG', label: 'PG / CO-LIVING' },
    { id: 'COMMERCIAL', label: 'COMMERCIAL' },
    { id: 'PLOTS', label: 'PLOTS / LAND' },
  ];

  const handleSearch = () => {
    const route = activeTab.toLowerCase().split(' ')[0];
    const params = new URLSearchParams({
      city: cityLocality,
      bhk: bhk.replace(' BHK', ''),
      type: propertyType,
      budget: budget
    });
    router.push(`/${route}?${params.toString()}`);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setCityLocality('Gachibowli, Hyderabad');
      setBhk('2 BHK');
      setBudget('50L - 80L');
      openAiAssistant('I need a 2BHK near Gachibowli Hyderabad under 75 lakhs.');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
      {/* EQUAL CENTER ALIGNED SEARCH FILTER TABS */}
      <div className="flex items-center justify-center overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50/90 p-1.5 sm:p-2 gap-1 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 sm:flex-initial text-center px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#0B2948] text-white shadow-md border-b-2 border-[#D9A72C]'
                  : 'text-slate-600 hover:text-[#0B2948] hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SEARCH FORM CONTROLS */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* LOCATION INPUT */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0B2948]">
            <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider text-left">Location</label>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-[#D9A72C] shrink-0" />
              <select
                value={cityLocality}
                onChange={(e) => setCityLocality(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Hyderabad">Hyderabad (All Localities)</option>
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
          </div>

          {/* PROPERTY TYPE */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0B2948]">
            <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider text-left">Property Type</label>
            <div className="flex items-center gap-2 mt-1">
              <Home className="w-4 h-4 text-[#0B2948] shrink-0" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Apartment">Apartment / Flat</option>
                <option value="Villa">Villa / House</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Plot">Plot / Land</option>
                <option value="Commercial">Commercial Space</option>
                <option value="PG">PG / Co-Living</option>
              </select>
            </div>
          </div>

          {/* BHK */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0B2948]">
            <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider text-left">BHK / Bedrooms</label>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="w-4 h-4 text-[#0B2948] shrink-0" />
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5+ BHK">5+ BHK</option>
              </select>
            </div>
          </div>

          {/* BUDGET */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0B2948]">
            <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider text-left">Budget Range</label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#0B2948] font-bold text-sm shrink-0">₹</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Below 40L">Below ₹40 Lakhs</option>
                <option value="40L - 70L">₹40L – ₹70 Lakhs</option>
                <option value="50L - 1Cr">₹50L – ₹1 Crore</option>
                <option value="1Cr - 2Cr">₹1Cr – ₹2 Crore</option>
                <option value="2Cr+">Above ₹2 Crore</option>
              </select>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* VOICE SEARCH BUTTON */}
            <button
              onClick={handleVoiceInput}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                isListening
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'text-rose-600' : 'text-slate-600'}`} />
              <span>{isListening ? 'Listening...' : 'Voice Search'}</span>
            </button>

            {/* AI ASSISTANT PROMPT TRIGGER */}
            <button
              onClick={() => openAiAssistant('Find me a 2BHK property in Hyderabad under 75L')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#0B2948] text-xs font-bold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI Search</span>
            </button>
          </div>

          {/* MAIN SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto flex-1 bg-[#0B2948] hover:bg-[#123B63] text-white py-3.5 px-8 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all border border-amber-400/40"
          >
            <Search className="w-5 h-5 text-[#D9A72C]" />
            <span>Search Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
