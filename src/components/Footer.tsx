'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GruhaLogo from './GruhaLogo';
import { Phone, Mail, MapPin, Send, QrCode } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071E36] text-white pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-[#0B2948] via-[#123B63] to-[#0B2948] p-6 sm:p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Guidance and assistance from start to finish.</h3>
            <p className="text-slate-300 text-sm">Talk to a professional and get the right property insights tailored for you.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-right hidden lg:block">
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Help Desk</p>
              <p className="text-sm font-bold">support@gruhasankalp.com</p>
            </div>
            <a
              href="tel:+919817436891"
              className="bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98174 36891</span>
            </a>
          </div>
        </div>

        {/* POPULAR CALCULATORS & CITIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 border-b border-slate-800 pb-10">
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Popular Calculators</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {['EMI Calculator', 'Stamp Duty', 'Loan Eligibility', 'Capital Gains Tax', 'Rent Receipt', 'Rent Agreement', 'Vastu Score', 'Area Converter'].map(item => (
                <span key={item} className="bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Popular Cities</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Chennai', 'Kolkata', 'Visakhapatnam', 'Ahmedabad', 'Jaipur'].map(city => (
                <Link key={city} href={`/buy?city=${city}`} className="bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors">
                  {city}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Browse by Category</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {[
                { name: 'Flats for Sale', href: '/buy' },
                { name: 'Flats for Rent', href: '/rent' },
                { name: 'PG & Hostels', href: '/pg' },
                { name: 'Plots & Land', href: '/plots' },
                { name: 'Commercial', href: '/commercial' },
                { name: 'Projects', href: '/projects' }
              ].map(cat => (
                <Link key={cat.name} href={cat.href} className="bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN FOOTER LINKS & CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* COL 1: Logo & Inquiries */}
          <div className="lg:col-span-2 space-y-4">
            <GruhaLogo variant="dark" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              GruhaSankalp is India&apos;s modern real-estate discovery and AI property assistance platform. Find properties, compare options, and make confident real-estate decisions.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Corporate Tower, Financial District, Gachibowli, Hyderabad, Telangana 500032</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@gruhasankalp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98174 36891</span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-2">Connect With Us</p>
              <div className="flex max-w-xs bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <input
                  type="text"
                  placeholder="Your phone number"
                  className="bg-transparent text-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none w-full"
                />
                <button className="bg-[#D9A72C] text-[#0B2948] px-3 font-bold text-xs flex items-center justify-center">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* COL 2: Our Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Our Company</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/buy" className="hover:text-amber-400 transition-colors">Search Properties</Link></li>
              <li><Link href="/saved" className="hover:text-amber-400 transition-colors">Saved Listings</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">Careers</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* COL 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/post-property" className="hover:text-amber-400 transition-colors">Post Property Free</Link></li>
              <li><Link href="/seller" className="hover:text-amber-400 transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/agent" className="hover:text-amber-400 transition-colors">Agent Hub</Link></li>
              <li><Link href="/compare" className="hover:text-amber-400 transition-colors">Compare Properties</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Portal</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">Safety Guide</Link></li>
            </ul>
          </div>

          {/* COL 4: Mobile App */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Download App</h4>
            <p className="text-xs text-slate-400">Available on iOS & Android for fast property notifications.</p>

            <div className="space-y-2 pt-1">
              <div className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl flex items-center gap-3">
                <QrCode className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Scan QR Code</p>
                  <p className="text-xs font-bold text-white">Get App Link</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] px-3 py-2 rounded-lg font-medium border border-slate-700 flex items-center justify-center flex-1">
                  Google Play
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] px-3 py-2 rounded-lg font-medium border border-slate-700 flex items-center justify-center flex-1">
                  App Store
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 GruhaSankalp Real-Estate Platform. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            Frontend Prototype Demo Data. All property listings are for design demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
