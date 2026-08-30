'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/mockProperties';
import { Sparkles, Check, ArrowRight, ArrowLeft, Building2, Upload, Plus, CheckCircle2, MapPin } from 'lucide-react';

export default function PostPropertyPage() {
  const router = useRouter();
  const { addProperty, showToast } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Apartment' | 'Villa' | 'Plot' | 'PG' | 'Commercial' | 'Builder Floor'>('Apartment');
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [city, setCity] = useState('Hyderabad');
  const [locality, setLocality] = useState('Gachibowli');
  const [address, setAddress] = useState('Near Financial District, Gachibowli');
  const [price, setPrice] = useState('7500000');
  const [area, setArea] = useState('1300');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [furnishing, setFurnishing] = useState<'Fully Furnished' | 'Semi Furnished' | 'Unfurnished'>('Semi Furnished');
  const [amenities, setAmenities] = useState<string[]>(['Gymnasium', '24/7 Security', 'Power Backup', 'Covered Parking']);
  const [description, setDescription] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const sampleImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  ];

  const handleGenerateAiDescription = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      const generated = `Presenting a premium ${bedrooms}BHK ${type.toLowerCase()} located in the prime locality of ${locality}, ${city}.\n\nSpanning a super area of ${area} sq.ft, this ${furnishing.toLowerCase()} property offers spacious rooms, modern bathroom fittings, and excellent ventilation. Situated near IT parks, international schools, and top hospitals.\n\nKey Highlights:\n- ${bedrooms} Bedrooms with attached balconies\n- 100% Power backup & 24/7 Gated Security\n- Dedicated covered car parking\n- Clean titles & 100% bank loan pre-approved.`;
      setDescription(generated);
      if (!title) {
        setTitle(`Modern ${bedrooms}BHK ${type} in ${locality}`);
      }
      showToast('AI Description Generated ✨', 'Gruha AI created an optimized property listing description.');
    }, 1200);
  };

  const handlePublish = () => {
    const numPrice = parseInt(price) || 5000000;
    const formattedPrice = purpose === 'Rent'
      ? `₹${(numPrice).toLocaleString()} / mo`
      : numPrice >= 10000000
      ? `₹${(numPrice / 10000000).toFixed(2)} Cr`
      : `₹${(numPrice / 100000).toFixed(0)} Lakhs`;

    const newProp: Property = {
      id: 'custom-' + Date.now(),
      title: title || `${bedrooms}BHK ${type} in ${locality}`,
      type,
      purpose,
      category: purpose === 'Rent' ? 'Rent' : 'Buy',
      city,
      locality,
      address,
      price: numPrice,
      priceFormatted: formattedPrice,
      pricePerSqFt: Math.round(numPrice / (parseInt(area) || 1200)),
      area: parseInt(area) || 1200,
      areaUnit: 'sq.ft',
      bedrooms: parseInt(bedrooms) || 2,
      bathrooms: parseInt(bathrooms) || 2,
      parking: 1,
      furnishing,
      images: sampleImages,
      amenities,
      description: description || `Beautiful ${bedrooms}BHK in ${locality} ${city}.`,
      latitude: 17.4401,
      longitude: 78.3489,
      verified: true,
      featured: false,
      owner: {
        name: 'Demo Seller',
        type: 'Owner',
        phone: '+91 98765 43210',
        email: 'seller@gruhasankalp.com',
        verified: true,
        rating: 5.0
      },
      postedDate: 'Just now',
      aiMatch: 95,
      aiReasons: ['Newly posted property', 'Direct owner listing with zero brokerage', 'Verified locality']
    };

    addProperty(newProp);
    router.push('/dashboard');
  };

  const availableAmenities = ['Gymnasium', 'Swimming Pool', 'Power Backup', '24/7 Security', 'Clubhouse', 'Covered Parking', 'EV Charging', 'Children Play Area', 'High Speed Elevators'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* STEP PROGRESS INDICATOR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              STEP {step} OF 5
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Post Your Property FREE</h1>
          </div>
          <span className="text-xs font-bold text-slate-500">{Math.round((step / 5) * 100)}% Completed</span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0B2948] to-[#D9A72C] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* FORM STEP CARDS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        {/* STEP 1: PROPERTY TYPE & PURPOSE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">1. Select Property Type & Purpose</h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">I want to:</label>
              <div className="grid grid-cols-2 gap-3">
                {(['Buy', 'Rent'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-3.5 rounded-xl font-extrabold text-sm border transition-all ${
                      purpose === p ? 'bg-[#0B2948] text-white border-[#0B2948] shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {p === 'Buy' ? 'Sell Property' : 'Rent Out Property'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Property Type:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(['Apartment', 'Villa', 'Builder Floor', 'Plot', 'Commercial', 'PG'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border text-left transition-all ${
                      type === t ? 'bg-[#0B2948] text-white border-[#0B2948] shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & PRICE */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">2. Location & Pricing Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                >
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Visakhapatnam">Visakhapatnam</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Locality *</label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Gachibowli"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Full Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Near Financial District, Gachibowli, Hyderabad"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Expected Price (INR) *</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="7500000"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none text-base font-bold text-[#0B2948]"
                />
                <p className="text-[11px] text-slate-500 mt-1">₹{(parseInt(price) || 0).toLocaleString()} (Zero brokerage)</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SPECIFICATIONS */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">3. Property Specifications</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Super Area (sq.ft) *</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="1250"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bedrooms (BHK)</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none font-semibold"
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none font-semibold"
                >
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Furnishing Status:</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Fully Furnished', 'Semi Furnished', 'Unfurnished'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFurnishing(f)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      furnishing === f ? 'bg-[#0B2948] text-white border-[#0B2948]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: AI DESCRIPTION GENERATOR */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-slate-900">4. Title & AI Description</h2>
              <button
                type="button"
                onClick={handleGenerateAiDescription}
                disabled={isGeneratingAi}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#0B2948] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>{isGeneratingAi ? 'Generating...' : '✨ Generate with Gruha AI'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Property Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern 2BHK Luxury Flat in Gachibowli"
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Click 'Generate with Gruha AI' above or write your property features..."
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PREVIEW & PUBLISH */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">5. Listing Preview & Confirmation</h2>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#0B2948] text-white text-xs font-bold px-3 py-1 rounded-full">{type} • {purpose}</span>
                <span className="text-xl font-extrabold text-[#0B2948]">₹{(parseInt(price) || 0).toLocaleString()}</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">{title || `${bedrooms}BHK ${type} in ${locality}`}</h3>
              <p className="text-xs text-slate-600">{address}</p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
                <span>{bedrooms} BHK</span>
                <span>{area} sq.ft</span>
                <span>{furnishing}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Your property is ready to be published instantly with zero platform fees!</span>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-[#0B2948] hover:bg-[#123B63] text-white font-extrabold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4 text-[#D9A72C]" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-black px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-xl"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Publish Property Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
