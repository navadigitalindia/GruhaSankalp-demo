'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyCard from '@/components/PropertyCard';
import { useApp } from '@/context/AppContext';
import {
  Heart, Calendar, MessageSquare, Clock, Sparkles,
  Building2, Edit2, Trash2, X, Check, ChevronLeft, ChevronRight, PlusCircle
} from 'lucide-react';
import { Property } from '@/data/mockProperties';

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditPropertyModal({
  property,
  onSave,
  onClose
}: {
  property: Property;
  onSave: (updates: Partial<Property>) => void;
  onClose: () => void;
}) {
  const [price, setPrice] = useState(String(property.price));
  const [description, setDescription] = useState(property.description || '');
  const [imgIndex, setImgIndex] = useState(0);
  const images = property.images || [];

  const handleSave = () => {
    const numPrice = parseInt(price) || property.price;
    const formattedPrice =
      property.purpose === 'Rent'
        ? `₹${numPrice.toLocaleString()} / mo`
        : numPrice >= 10000000
        ? `₹${(numPrice / 10000000).toFixed(2)} Cr`
        : `₹${(numPrice / 100000).toFixed(0)} Lakhs`;

    onSave({ price: numPrice, priceFormatted: formattedPrice, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-base font-extrabold text-slate-900">Edit Listing</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700 uppercase">Property Images</p>
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={images[imgIndex]}
                  alt={`Property image ${imgIndex + 1}`}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <button
                      onClick={() => setImgIndex(i => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                    <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {imgIndex + 1}/{images.length}
                    </span>
                  </>
                )}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      i === imgIndex ? 'border-[#0B2948]' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`thumb-${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0B2948] font-semibold"
              placeholder="e.g. 7500000"
            />
            <p className="text-[10px] text-slate-400">
              Currently: <span className="font-bold text-slate-600">{property.priceFormatted}</span>
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Description / Brief</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0B2948] resize-none"
              placeholder="Add details about the property…"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-[#0B2948] hover:bg-[#123B63] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4 text-[#D9A72C]" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────────
export default function UserDashboard() {
  const {
    properties, savedPropertyIds, recentlyViewedIds, siteVisits, enquiries,
    openAiAssistant, loggedInUser, removeProperty, updateProperty
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'visits' | 'enquiries' | 'recent' | 'myprops'>('saved');
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const savedProps   = properties.filter(p => savedPropertyIds.includes(p.id));
  const recentProps  = properties.filter(p => recentlyViewedIds.includes(p.id));
  const myProps      = properties.filter(p => p.id.startsWith('custom-'));

  const initials = loggedInUser
    ? loggedInUser.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const displayName = loggedInUser || 'User';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-[#0B2948] via-[#123B63] to-[#071E36] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-amber-400/30">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 text-amber-400 flex items-center justify-center text-xl font-extrabold shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Welcome back, {displayName}!</h1>
            <p className="text-xs text-slate-300">Buyer &amp; Tenant Dashboard • Member since 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openAiAssistant('Recommend properties for me based on my activity')}
            className="bg-[#D9A72C] text-[#0B2948] font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Recommendations</span>
          </button>
          <Link
            href="/post-property"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-white/20"
          >
            Post Property
          </Link>
        </div>
      </div>

      {/* METRICS STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Saved Properties</p>
            <p className="text-2xl font-black text-[#0B2948] mt-1">{savedProps.length}</p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Site Visits</p>
            <p className="text-2xl font-black text-[#0B2948] mt-1">{siteVisits.length}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Enquiries Sent</p>
            <p className="text-2xl font-black text-[#0B2948] mt-1">{enquiries.length}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Recently Viewed</p>
            <p className="text-2xl font-black text-[#0B2948] mt-1">{recentProps.length}</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* DASHBOARD CONTENT TABS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex justify-center border-b border-slate-200 overflow-x-auto no-scrollbar gap-4 sm:gap-8">
          {[
            { id: 'saved',    label: `Saved (${savedProps.length})` },
            { id: 'myprops',  label: `My Properties (${myProps.length})` },
            { id: 'visits',   label: `Scheduled Visits (${siteVisits.length})` },
            { id: 'enquiries',label: `Enquiries (${enquiries.length})` },
            { id: 'recent',   label: `Recently Viewed (${recentProps.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 text-xs sm:text-sm font-extrabold transition-colors border-b-2 shrink-0 ${
                activeTab === tab.id
                  ? 'border-[#0B2948] text-[#0B2948]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: SAVED */}
        {activeTab === 'saved' && (
          <div>
            {savedProps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProps.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">No saved properties yet.</p>
            )}
          </div>
        )}

        {/* TAB 2: MY PROPERTIES */}
        {activeTab === 'myprops' && (
          <div>
            {myProps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProps.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    footerActions={
                      <>
                        <button
                          onClick={() => setEditingProp(p)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition-colors shadow-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#0B2948]" />
                          <span>Edit Listing</span>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 py-1.5 rounded-xl text-xs font-bold border border-rose-200 transition-colors shadow-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Sale Done / Delete</span>
                        </button>
                      </>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Building2 className="w-7 h-7 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">No properties posted yet</p>
                  <p className="text-xs text-slate-400 mt-1">Post your first property and it will appear here.</p>
                </div>
                <Link
                  href="/post-property"
                  className="inline-flex items-center gap-2 bg-[#0B2948] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow hover:bg-[#123B63] transition-colors"
                >
                  <PlusCircle className="w-4 h-4 text-[#D9A72C]" />
                  Post a Property
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-3">
            {siteVisits.length > 0 ? (
              siteVisits.map(v => (
                <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{v.propertyTitle}</h4>
                    <p className="text-slate-500">{v.propertyLocation}</p>
                    <p className="text-slate-600 font-semibold mt-1">🗓️ {v.date} at {v.timeSlot} • Contact via {v.contactMethod}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full w-fit">
                    {v.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">No scheduled site visits yet.</p>
            )}
          </div>
        )}

        {/* TAB 4: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-3">
            {enquiries.length > 0 ? (
              enquiries.map(e => (
                <div key={e.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900">{e.propertyTitle}</h4>
                    <span className="text-[10px] text-slate-400">{e.createdAt}</span>
                  </div>
                  <p className="text-slate-600 italic">&quot;{e.message}&quot;</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">No submitted enquiries yet.</p>
            )}
          </div>
        )}

        {/* TAB 5: RECENT */}
        {activeTab === 'recent' && (
          <div>
            {recentProps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProps.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">No recently viewed properties.</p>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingProp && (
        <EditPropertyModal
          property={editingProp}
          onSave={updates => {
            updateProperty(editingProp.id, updates);
            setEditingProp(null);
          }}
          onClose={() => setEditingProp(null)}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Remove Listing?</h3>
                <p className="text-xs text-slate-500">This will permanently delete your property listing.</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeProperty(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-extrabold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
