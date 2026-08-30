'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/mockProperties';
import { X, Phone, Mail, User, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactOwnerModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactOwnerModal({ property, isOpen, onClose }: ContactOwnerModalProps) {
  const { sendEnquiry } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Hi, I am interested in your property "${property.title}" listed for ${property.priceFormatted}. Please call me back with more details.`);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    sendEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      name,
      phone,
      email,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0B2948] to-[#123B63] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-white">Contact Owner / Agent</h3>
            <p className="text-xs text-slate-300">Listing: {property.owner.name} ({property.owner.type})</p>
          </div>

          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900">Enquiry Sent!</h4>
            <p className="text-xs text-slate-600">
              The owner ({property.owner.name}) has received your enquiry and will respond to <span className="font-bold">{phone}</span> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* OWNER CARD */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B2948] text-white font-bold flex items-center justify-center text-sm">
                {property.owner.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-xs">{property.owner.name}</p>
                <p className="text-[11px] text-slate-500">{property.owner.type} • ⭐ {property.owner.rating}/5.0</p>
              </div>
              <a href={`tel:${property.owner.phone}`} className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-xs flex items-center gap-1 border border-emerald-200">
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B2948] hover:bg-[#123B63] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#D9A72C]" />
              <span>Send Instant Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
