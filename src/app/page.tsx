'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchTabs from '@/components/SearchTabs';
import PropertyCard from '@/components/PropertyCard';
import ExclusiveDealsSection from '@/components/ExclusiveDealsSection';
import { useApp } from '@/context/AppContext';
import { Sparkles, ArrowRight, ChevronDown, ChevronUp, Award } from 'lucide-react';

export default function HomePage() {
  const { properties, openAiAssistant } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [cityFilter, setCityFilter] = useState('Hyderabad');

  const featuredProperties = properties.filter(p => cityFilter === 'All' || p.city === cityFilter).slice(0, 6);

  const offerings = [
    { title: 'Residential Properties', subtitle: 'Apartments, Villas, Flats', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', href: '/buy' },
    { title: 'Commercial Properties', subtitle: 'Offices, Shops, Warehouses', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', href: '/commercial' },
    { title: 'Search PG\'s', subtitle: 'Boys, Girls & Unisex PGs', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80', href: '/pg' },
    { title: 'Plots for Sale', subtitle: 'HMDA & DTCP Approved', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', href: '/plots' },
    { title: 'Co-Living Spaces', subtitle: 'Shared Flats & Roommates', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', href: '/pg' }
  ];

  const cities = [
    { name: 'Hyderabad', desc: 'The Tech & Pharma Hub', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bengaluru', desc: 'Silicon Valley of India', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mumbai', desc: 'Financial Capital', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80' },
    { name: 'Pune', desc: 'IT & Education Capital', image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Chennai', desc: 'Detroit of South Asia', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
    { name: 'Visakhapatnam', desc: 'The City of Destiny', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' }
  ];

  const faqs = [
    { q: 'Is GruhaSankalp a safe and secure platform for buying, selling, and renting properties?', a: 'Yes, GruhaSankalp prioritizes safety and security. We verify property details, owner documents, and enable direct buyer-to-owner contact without middleman markup.' },
    { q: 'How do I list my property for rent or sale on GruhaSankalp?', a: 'Click the "Post Property FREE" button in the top navigation. Follow our 6-step guided wizard and use Gruha AI to generate descriptions automatically.' },
    { q: 'What is Gruha AI and how does it help me?', a: 'Gruha AI is your 24/7 property assistant. It analyzes property specs, calculates locality match %, recommends listings based on your budget, and automates comparison.' },
    { q: 'Can I schedule a physical site visit before making a decision?', a: 'Yes! Simply click "Schedule Visit" on any property details page, choose your preferred date and time slot, and the owner will confirm your appointment.' },
    { q: 'Are there any hidden brokerage fees for buyers and tenants?', a: 'No. GruhaSankalp features zero-brokerage listings direct from owners as well as transparent agent listings.' }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[500px] pt-12 pb-16 bg-[#0B2948] text-white overflow-hidden flex flex-col justify-center">
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80"
            alt="GruhaSankalp Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2948]/90 via-[#0B2948]/80 to-[#F7F9FC]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Find a Place You&apos;ll Love to Call Home.
            </h1>
            <p className="text-slate-200 text-sm sm:text-base font-medium max-w-2xl mx-auto">
              TRUSTED PLACE TO BUY, SELL, OR RENT PROPERTIES IN INDIA WITH GRUHA AI ASSISTANCE.
            </p>
          </div>

          {/* SEARCH TABS COMPONENT */}
          <div className="pt-2">
            <SearchTabs />
          </div>
        </div>
      </section>

      {/* MEET GRUHA AI PROMOTIONAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2948] via-[#123B63] to-[#071E36] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-amber-400/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI-Powered Real Estate Assistant</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Meet Gruha AI
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Your intelligent property companion. Ask questions in natural language, request instant property shortlists, compare options, and generate automatic listing descriptions.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => openAiAssistant('I need a 2BHK near Gachibowli under 75 lakhs')}
                className="bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-extrabold px-6 py-3 rounded-xl transition-all shadow-md text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Gruha AI Now</span>
              </button>

              <button
                onClick={() => openAiAssistant('Show me exclusive deals in Hyderabad')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl transition-colors border border-white/20 text-sm"
              >
                Find Deals with AI
              </button>
            </div>
          </div>

          {/* MOCK CHAT UI PREVIEW */}
          <div className="w-full lg:w-[420px] bg-slate-900/90 rounded-2xl p-4 border border-slate-700 space-y-3 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" />
              <span>Live AI Search Preview</span>
            </div>

            <div className="bg-slate-800 text-slate-200 text-xs p-3 rounded-xl border border-slate-700 text-left">
              User: &quot;Find me a 2BHK near Gachibowli under ₹75L.&quot;
            </div>

            <div className="bg-[#0B2948] text-white text-xs p-3 rounded-xl border border-amber-400/30 space-y-2 text-left">
              <p className="font-semibold text-amber-300">Gruha AI: &quot;I found 8 matching properties! Top shortlisted match:&quot;</p>
              <div className="bg-slate-900/80 p-2.5 rounded-lg flex items-center justify-between border border-slate-700">
                <div>
                  <p className="font-bold text-white text-xs">Aastha Horizon 2BHK</p>
                  <p className="text-[10px] text-slate-300">Gachibowli • ₹66 Lakhs</p>
                </div>
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">95% Match</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR OFFERINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-slate-900">Our Offerings</h2>
          <p className="text-xs text-slate-500">Explore residential, commercial, PG & land categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {offerings.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="font-bold text-xs sm:text-sm">{item.title}</h3>
                  <p className="text-[10px] text-slate-300">{item.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 EXCLUSIVE PROPERTY DEALS SECTION */}
      <ExclusiveDealsSection properties={properties} />

      {/* FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Handpicked Homes</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Properties</h2>
            <p className="text-xs text-slate-500">Verified listings with high investment and lifestyle ratings</p>
          </div>

          {/* CITY TABS */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 justify-center sm:justify-end">
            {['Hyderabad', 'Bengaluru', 'Mumbai', 'Pune', 'Visakhapatnam'].map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                  cityFilter === c
                    ? 'bg-[#0B2948] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 bg-[#0B2948] hover:bg-[#123B63] text-white px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all border border-amber-400/40"
          >
            <span>Explore All {properties.length} Properties</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </section>

      {/* EXPLORE BY CITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-slate-900">Explore Properties by Cities</h2>
          <p className="text-xs text-slate-500">Top real estate destinations across India</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/buy?city=${city.name}`}
              className="group bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center space-y-2"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{city.name}</h3>
              <p className="text-[10px] text-slate-500 line-clamp-1">{city.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW TO LIST PROPERTY ON GRUHASANKALP */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How to List Property on GruhaSankalp</h2>
            <p className="text-slate-300 text-xs sm:text-sm">A simple, seamless, and hassle-free way to find your perfect space or list your property with ease!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 1</span>
              <h3 className="font-bold text-white text-base">Download & Post Property</h3>
              <p className="text-slate-300">Install the GruhaSankalp app, create your account, and start listing your property in minutes.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 2</span>
              <h3 className="font-bold text-white text-base">Choose Listing Type & Add Details</h3>
              <p className="text-slate-300">Fill in key details like location, price, size, amenities, and property type to attract buyers.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 3</span>
              <h3 className="font-bold text-white text-base">Set Your Contact Preferences</h3>
              <p className="text-slate-300">Choose whether you want your contact details to be Public or Private for secure communication.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 4</span>
              <h3 className="font-bold text-white text-base">Upload Property Photos</h3>
              <p className="text-slate-300">Listings with high quality photos receive significantly more responses and site visits.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 5</span>
              <h3 className="font-bold text-white text-base">Add Description with Help of AI</h3>
              <p className="text-slate-300">Use Gruha AI powered auto-descriptions to highlight your property&apos;s key features effortlessly.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-amber-400 font-black text-sm">Step 6</span>
              <h3 className="font-bold text-white text-base">Publish & Get Verified Leads</h3>
              <p className="text-slate-300">Start receiving inquiries from verified buyers and tenants, with zero brokerage fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Quick answers to common questions about buying, renting, and listing.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4"
                >
                  <span>{idx + 1}. {faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#0B2948] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2948] to-[#123B63] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl border border-amber-400/30">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Ready to Find Your Next Home?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Discover verified properties, compare your top options, and get instant assistance with Gruha AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/buy"
              className="bg-[#D9A72C] hover:bg-[#c5941f] text-[#0B2948] font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              Find Your Dream Home
            </Link>
            <Link
              href="/post-property"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition-colors text-sm"
            >
              Post Property FREE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
