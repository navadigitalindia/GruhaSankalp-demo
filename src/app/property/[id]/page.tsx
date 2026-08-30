'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import ScheduleVisitModal from '@/components/ScheduleVisitModal';
import ContactOwnerModal from '@/components/ContactOwnerModal';
import GruhaAIAnalysisCard from '@/components/GruhaAIAnalysisCard';
import PropertyTrustCard from '@/components/PropertyTrustCard';
import {
  Heart, Share2, CheckCircle2, MapPin, Bed, Bath, Maximize2, ParkingSquare, Layers,
  Calendar, Phone, MessageSquare, Scale, Sparkles, Flame, ShieldCheck, FileText, ArrowLeft,
  Building, ChevronRight, School, Hospital, Train, ShoppingBag
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { properties, savedPropertyIds, toggleSaveProperty, toggleCompare, compareList, addRecentlyViewed, showToast } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const property = properties.find(p => p.id === propertyId) || properties[0];
  const isSaved = savedPropertyIds.includes(property.id);
  const isComparing = compareList.some(p => p.id === property.id);

  // Track recently viewed
  useEffect(() => {
    if (property?.id) {
      addRecentlyViewed(property.id);
    }
  }, [property?.id, addRecentlyViewed]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} on GruhaSankalp`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Property link copied to clipboard.');
    }
  };

  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.city === property.city || p.bedrooms === property.bedrooms))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 font-bold text-[#0B2948] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-1.5">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/buy" className="hover:underline">{property.city}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800 line-clamp-1">{property.title}</span>
        </div>
      </div>

      {/* HEADER TITLE & PRICE BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {property.verified && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Listing</span>
              </span>
            )}
            {property.isDeal && (
              <span className="bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                {property.dealTag || 'EXCLUSIVE DEAL'}
              </span>
            )}
            <span className="bg-[#0B2948] text-white text-[11px] font-semibold px-2 py-0.5 rounded">
              {property.purpose}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-[#D9A72C]" />
            <span>{property.address}</span>
            {property.reraId && (
              <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded border border-slate-200 font-semibold ml-2">
                RERA: {property.reraId}
              </span>
            )}
          </div>
        </div>

        {/* PRICE & SAVE/SHARE */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-[#0B2948]">
              {property.isDeal && property.dealPriceFormatted ? property.dealPriceFormatted : property.priceFormatted}
            </span>
            {property.isDeal && property.priceFormatted && (
              <span className="text-sm font-semibold text-slate-400 line-through">
                {property.priceFormatted}
              </span>
            )}
          </div>
          {property.pricePerSqFt && (
            <p className="text-xs text-slate-500 font-semibold">₹{property.pricePerSqFt.toLocaleString()} / sq.ft</p>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleCompare(property)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isComparing ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isComparing ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PHOTO GALLERY LIGHTBOX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MAIN LARGE IMAGE */}
        <div className="lg:col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 shadow-md">
          <Image
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
        </div>

        {/* THUMBNAILS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/9] lg:aspect-[16/7] rounded-2xl overflow-hidden bg-slate-100 border-2 transition-all ${
                activeImageIndex === idx ? 'border-[#0B2948] ring-2 ring-amber-400' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* KEY SPECIFICATIONS HIGHLIGHTS BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        {property.bedrooms !== undefined && (
          <div className="space-y-1">
            <Bed className="w-5 h-5 text-[#0B2948] mx-auto" />
            <p className="text-[10px] text-slate-500 uppercase font-bold">Bedrooms</p>
            <p className="font-extrabold text-slate-900 text-sm">{property.bedrooms} BHK</p>
          </div>
        )}
        {property.bathrooms !== undefined && (
          <div className="space-y-1">
            <Bath className="w-5 h-5 text-[#0B2948] mx-auto" />
            <p className="text-[10px] text-slate-500 uppercase font-bold">Bathrooms</p>
            <p className="font-extrabold text-slate-900 text-sm">{property.bathrooms} Baths</p>
          </div>
        )}
        <div className="space-y-1">
          <Maximize2 className="w-5 h-5 text-[#0B2948] mx-auto" />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Super Area</p>
          <p className="font-extrabold text-slate-900 text-sm">{property.area} {property.areaUnit}</p>
        </div>
        {property.parking !== undefined && (
          <div className="space-y-1">
            <ParkingSquare className="w-5 h-5 text-[#0B2948] mx-auto" />
            <p className="text-[10px] text-slate-500 uppercase font-bold">Parking</p>
            <p className="font-extrabold text-slate-900 text-sm">{property.parking} Covered</p>
          </div>
        )}
        <div className="space-y-1">
          <Layers className="w-5 h-5 text-[#0B2948] mx-auto" />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Floor Level</p>
          <p className="font-extrabold text-slate-900 text-sm">{property.floor || '5th Floor'}</p>
        </div>
        <div className="space-y-1">
          <Building className="w-5 h-5 text-[#0B2948] mx-auto" />
          <p className="text-[10px] text-slate-500 uppercase font-bold">Furnishing</p>
          <p className="font-extrabold text-slate-900 text-sm">{property.furnishing || 'Semi Furnished'}</p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: OVERVIEW, AMENITIES, FLOOR PLAN */}
        <div className="lg:col-span-2 space-y-8">
          {/* ✨ GRUHA AI ANALYSIS CARD */}
          <GruhaAIAnalysisCard property={property} />

          {/* PROPERTY OVERVIEW */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">Property Overview</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">Amenities & Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NEARBY HIGHLIGHTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">Locality Connectivity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-1">
                <Train className="w-5 h-5 text-[#0B2948] mx-auto" />
                <p className="font-bold">Metro Station</p>
                <p className="text-slate-500">1.2 km away</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-1">
                <School className="w-5 h-5 text-[#0B2948] mx-auto" />
                <p className="font-bold">Intl Schools</p>
                <p className="text-slate-500">800 meters</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-1">
                <Hospital className="w-5 h-5 text-[#0B2948] mx-auto" />
                <p className="font-bold">Hospital</p>
                <p className="text-slate-500">2.0 km away</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-1">
                <ShoppingBag className="w-5 h-5 text-[#0B2948] mx-auto" />
                <p className="font-bold">Shopping Mall</p>
                <p className="text-slate-500">1.5 km away</p>
              </div>
            </div>
          </div>

          {/* SIMILAR PROPERTIES */}
          <div className="space-y-4 pt-4">
            <h3 className="font-extrabold text-xl text-slate-900">Similar Properties in {property.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {similarProperties.map(sim => (
                <PropertyCard key={sim.id} property={sim} compact />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY CONTACT & TRUST CARDS */}
        <div className="lg:col-span-1 space-y-6 sticky top-24">
          {/* ACTION BUTTONS BOX */}
          <div className="bg-gradient-to-b from-[#0B2948] to-[#123B63] rounded-3xl p-6 text-white shadow-xl space-y-4 border border-amber-400/30">
            <div className="space-y-1 text-center">
              <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">Interested in this property?</p>
              <h4 className="text-2xl font-black">{property.priceFormatted}</h4>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Site Visit</span>
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl text-sm border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Contact Owner / Agent</span>
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-300">
              ⚡ Zero Brokerage Fee on Direct Owner Properties
            </div>
          </div>

          {/* PROPERTY TRUST CARD */}
          <PropertyTrustCard property={property} />

          {/* OWNER CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Listed By</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0B2948] text-white font-black flex items-center justify-center text-base">
                {property.owner.name[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{property.owner.name}</p>
                <p className="text-xs text-slate-500">{property.owner.type} • ⭐ {property.owner.rating} Rating</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">✓ Identity Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ScheduleVisitModal
        property={property}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <ContactOwnerModal
        property={property}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
