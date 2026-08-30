'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar from '@/components/FilterSidebar';
import { useApp } from '@/context/AppContext';
import { SlidersHorizontal, ArrowUpDown, Bell } from 'lucide-react';

function SearchPageContent({ categoryTitle }: { categoryTitle?: string }) {
  const searchParams = useSearchParams();
  const { properties, addSearchAlert } = useApp();

  const [selectedCity, setSelectedCity] = useState(searchParams?.get('city') || 'All');
  const [selectedType, setSelectedType] = useState(searchParams?.get('type') || 'All');
  const [selectedBhk, setSelectedBhk] = useState(searchParams?.get('bhk') ? `${searchParams.get('bhk')} BHK` : 'All');
  const [priceRange, setPriceRange] = useState(searchParams?.get('budget') || 'All');
  const [furnishing, setFurnishing] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(searchParams?.get('deal') === 'true');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'newest' | 'area'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCity !== 'All' && !p.city.toLowerCase().includes(selectedCity.toLowerCase()) && !p.locality.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      if (selectedType !== 'All' && p.type !== selectedType) {
        return false;
      }
      if (selectedBhk !== 'All') {
        const targetBhk = parseInt(selectedBhk.split(' ')[0]);
        if (p.bedrooms !== targetBhk) return false;
      }
      if (verifiedOnly && !p.verified) return false;
      if (dealsOnly && !p.isDeal) return false;
      if (furnishing !== 'All' && p.furnishing !== furnishing) return false;

      if (priceRange === 'Under 50L' && p.price > 5000000) return false;
      if (priceRange === '50L - 1Cr' && (p.price < 5000000 || p.price > 10000000)) return false;
      if (priceRange === '1Cr - 2Cr' && (p.price < 10000000 || p.price > 20000000)) return false;
      if (priceRange === 'Above 2Cr' && p.price < 20000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'area') return b.area - a.area;
      return b.aiMatch - a.aiMatch;
    });
  }, [properties, selectedCity, selectedType, selectedBhk, priceRange, furnishing, verifiedOnly, dealsOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCity('All');
    setSelectedType('All');
    setSelectedBhk('All');
    setPriceRange('All');
    setFurnishing('All');
    setVerifiedOnly(false);
    setDealsOnly(false);
  };

  const handleCreateAlert = () => {
    addSearchAlert({
      city: selectedCity,
      category: 'Buy',
      bhk: selectedBhk,
      maxBudget: priceRange
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* PAGE TITLE & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {categoryTitle || 'Properties for Sale in India'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <span className="font-bold text-[#0B2948]">{filteredProperties.length}</span> matching properties
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH ALERT BUTTON */}
          <button
            onClick={handleCreateAlert}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-50 text-[#0B2948] border border-amber-300 px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors"
          >
            <Bell className="w-4 h-4 text-amber-600" />
            <span>Create Search Alert</span>
          </button>

          {/* MOBILE FILTER TOGGLE */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 bg-[#0B2948] text-white px-3 py-2 rounded-xl text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* SEARCH LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedBhk={selectedBhk}
            setSelectedBhk={setSelectedBhk}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            furnishing={furnishing}
            setFurnishing={setFurnishing}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            dealsOnly={dealsOnly}
            setDealsOnly={setDealsOnly}
            onReset={handleResetFilters}
          />
        </div>

        {/* PROPERTY LISTINGS MAIN AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* SORTING BAR */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <span className="font-bold text-slate-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-semibold text-slate-800 focus:outline-none"
              >
                <option value="recommended">Recommended (AI Match)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area">Largest Super Area</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-medium">Active filters:</span>
              {selectedCity !== 'All' && <span className="bg-slate-100 px-2 py-0.5 rounded border text-[11px] font-semibold">{selectedCity}</span>}
              {selectedBhk !== 'All' && <span className="bg-slate-100 px-2 py-0.5 rounded border text-[11px] font-semibold">{selectedBhk}</span>}
              {dealsOnly && <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border text-[11px] font-bold">Deals</span>}
            </div>
          </div>

          {/* MOBILE FILTER MODAL SHEET */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl p-5 space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-extrabold text-base text-slate-900">Filter Properties</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-slate-500 font-bold">Close</button>
                </div>
                <FilterSidebar
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedBhk={selectedBhk}
                  setSelectedBhk={setSelectedBhk}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  furnishing={furnishing}
                  setFurnishing={setFurnishing}
                  verifiedOnly={verifiedOnly}
                  setVerifiedOnly={setVerifiedOnly}
                  dealsOnly={dealsOnly}
                  setDealsOnly={setDealsOnly}
                  onReset={handleResetFilters}
                />
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-[#0B2948] text-white font-extrabold py-3 rounded-xl"
                >
                  Apply Filters ({filteredProperties.length})
                </button>
              </div>
            </div>
          )}

          {/* PROPERTY GRID */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No Matching Properties Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn&apos;t find any property matching your current filter combination. Try resetting filters or searching via Gruha AI.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="bg-[#0B2948] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage({ categoryTitle }: { categoryTitle?: string }) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading properties...</div>}>
      <SearchPageContent categoryTitle={categoryTitle} />
    </Suspense>
  );
}
