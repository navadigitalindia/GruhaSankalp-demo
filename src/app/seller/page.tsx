'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/data/mockProperties';
import {
  Building2, PlusCircle, TrendingUp, Edit2, Trash2, X, Check, ChevronLeft, ChevronRight
} from 'lucide-react';

// ── Edit Modal Component ──────────────────────────────────────────────────────
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
          <h2 className="text-base font-extrabold text-slate-900">Edit Listing Details</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Images */}
          {images.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700 uppercase">Property Photos</p>
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                <Image src={images[imgIndex]} alt="Property" fill className="object-cover" />
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
            />
            <p className="text-[10px] text-slate-400">
              Current listing price: <span className="font-bold text-slate-600">{property.priceFormatted}</span>
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Brief Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0B2948] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-[#0B2948] hover:bg-[#123B63] text-white text-sm font-extrabold flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-[#D9A72C]" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Seller Dashboard Main Component ───────────────────────────────────────────
export default function SellerDashboard() {
  const { properties, removeProperty, updateProperty, showToast } = useApp();
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter custom user posted properties or fallback to sample seller listings
  const userPostedProps = properties.filter(p => p.id.startsWith('custom-'));
  const displayProps = userPostedProps.length > 0 ? userPostedProps : properties.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Seller & Landlord Hub</h1>
          <p className="text-xs text-slate-500 mt-1">Manage active listings, track views, and promote properties</p>
        </div>

        <Link
          href="/post-property"
          className="bg-[#0B2948] hover:bg-[#123B63] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#D9A72C]" />
          <span>Post New Property</span>
        </Link>
      </div>

      {/* SELLER METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Listings</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">{displayProps.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Listing Views</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">{displayProps.length * 120 + 45}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Buyer Enquiries</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">{displayProps.length * 6 + 2}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Scheduled Site Visits</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">{displayProps.length * 2 + 1}</p>
        </div>
      </div>

      {/* SELLER LISTINGS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">My Active Listings</h2>
          <span className="text-xs font-semibold text-slate-500">{displayProps.length} Properties</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProps.map(p => (
            <PropertyCard
              key={p.id}
              property={p}
              footerActions={
                <>
                  <button
                    onClick={() => setEditingProp(p)}
                    className="flex-1 bg-white hover:bg-slate-100 text-slate-800 py-1.5 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#0B2948]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('Property Promoted! 🚀', `Your listing "${p.title}" is now featured on the homepage.`);
                    }}
                    className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 py-1.5 rounded-xl text-xs font-bold border border-amber-300 flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span>Promote</span>
                  </button>

                  <button
                    onClick={() => setConfirmDeleteId(p.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 flex items-center justify-center transition-colors shadow-xs"
                    title="Delete / Sale Completed"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              }
            />
          ))}
        </div>
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
                <p className="text-xs text-slate-500">Delete this property after sale completed.</p>
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
