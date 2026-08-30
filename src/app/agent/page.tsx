'use client';

import React from 'react';
import { UserCheck, Phone, Mail, Calendar, CheckCircle2, Search, Filter } from 'lucide-react';

export default function AgentDashboard() {
  const leads = [
    { id: '1', name: 'Vikram Sharma', budget: '₹75L - ₹90L', locality: 'Gachibowli', interest: '2 BHK Flat', status: 'Visit Scheduled', date: 'Tomorrow at 10:00 AM' },
    { id: '2', name: 'Pooja Hegde', budget: '₹1.2Cr - ₹1.5Cr', locality: 'Kondapur', interest: '3 BHK Apartment', status: 'Negotiation', date: 'Contacted 2h ago' },
    { id: '3', name: 'Karthik Reddy', budget: '₹35,000 / mo', locality: 'Madhapur', interest: 'Rental 2 BHK', status: 'New Lead', date: 'Just now' },
    { id: '4', name: 'Sanjay Dutt', budget: '₹2.5Cr', locality: 'Kokapet', interest: 'Villa Plot', status: 'Closed Deal', date: 'Completed 3 days ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Agent & Broker Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Manage client pipeline, site visit requests, and lead statuses</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Leads</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">28</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Visits This Week</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">14</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Deals Negotiating</p>
          <p className="text-2xl font-black text-[#0B2948] mt-1">6</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Closed This Month</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹4.2 Cr</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Client Pipeline</h2>
        <div className="space-y-3">
          {leads.map(lead => (
            <div key={lead.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">{lead.name}</h4>
                  <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">{lead.interest}</span>
                </div>
                <p className="text-slate-500">{lead.locality} • Budget: {lead.budget}</p>
                <p className="text-slate-400 text-[11px]">{lead.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                  lead.status === 'Visit Scheduled' ? 'bg-amber-100 text-amber-900' :
                  lead.status === 'Negotiation' ? 'bg-blue-100 text-blue-900' :
                  lead.status === 'Closed Deal' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-800'
                }`}>
                  {lead.status}
                </span>
                <a href={`tel:+919876543210`} className="p-2 bg-[#0B2948] text-white rounded-xl font-bold">
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
