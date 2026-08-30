'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/mockProperties';
import { X, Calendar, Clock, Phone, CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';

interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleVisitModal({ property, isOpen, onClose }: ScheduleVisitModalProps) {
  const { scheduleVisit } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [contactMethod, setContactMethod] = useState<'Phone' | 'WhatsApp' | 'Email'>('WhatsApp');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    scheduleVisit({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: `${property.locality}, ${property.city}`,
      name,
      phone,
      email,
      date,
      timeSlot,
      contactMethod
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const timeSlots = ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#0B2948] to-[#123B63] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Schedule Site Visit</h3>
              <p className="text-xs text-slate-300 line-clamp-1">{property.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900">Visit Scheduled!</h4>
            <p className="text-xs text-slate-600">
              Your site visit request for <span className="font-bold text-[#0B2948]">{date} at {timeSlot}</span> has been confirmed. The owner/agent will connect via {contactMethod}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* NAME */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
                />
              </div>
            </div>

            {/* PHONE & EMAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
                  />
                </div>
              </div>
            </div>

            {/* DATE PICKER */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
              />
            </div>

            {/* TIME SLOTS */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Preferred Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      timeSlot === slot
                        ? 'bg-[#0B2948] text-white border-[#0B2948]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* PREFERRED CONTACT */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Preferred Contact Method</label>
              <div className="grid grid-cols-3 gap-2">
                {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setContactMethod(method)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      contactMethod === method
                        ? 'bg-amber-500 text-[#0B2948] border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0B2948] hover:bg-[#123B63] text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all border border-amber-400/40 text-sm mt-2"
            >
              Confirm Visit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
