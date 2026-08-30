'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/mockProperties';
import { Sparkles, X, Send, Mic, RefreshCw, Heart, Calendar, ArrowRight, ExternalLink, Check, Scale, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  properties?: Property[];
  actionType?: 'filter' | 'compare' | 'visit' | 'saved';
  actionPayload?: any;
}

export default function GruhaAI() {
  const { isAiOpen, closeAiAssistant, aiInitialPrompt, properties, toggleSaveProperty, toggleCompare, scheduleVisit } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: "Hi! I'm Gruha AI 👋\n\nTell me what kind of property you're looking for and I'll help you find the right options.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages.length]);

  // Handle initial prompt passed when opened
  useEffect(() => {
    if (aiInitialPrompt && isAiOpen) {
      handleSend(aiInitialPrompt);
    }
  }, [aiInitialPrompt, isAiOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isAiOpen) return null;

  const quickPrompts = [
    'Find a 2BHK in Hyderabad under ₹75L',
    'Properties for rent in Gachibowli',
    'Show me exclusive deals',
    'PG near Kokapet SEZ',
    'Compare top 2 BHK apartments'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI thinking & processing
    setTimeout(() => {
      generateAiResponse(query);
      setIsTyping(false);
    }, 1000);
  };

  const generateAiResponse = (query: string) => {
    const qLower = query.toLowerCase();
    let responseText = '';
    let matchedProps: Property[] = [];
    let actionType: 'filter' | 'compare' | 'visit' | 'saved' | undefined = undefined;

    if (qLower.includes('2bhk') || qLower.includes('2 bhk')) {
      matchedProps = properties.filter(p => p.bedrooms === 2).slice(0, 3);
      responseText = `I found ${properties.filter(p => p.bedrooms === 2).length} 2BHK properties matching your criteria! Here are the top shortlisted options based on budget, connectivity, and amenities:`;
    } else if (qLower.includes('rent') || qLower.includes('rental')) {
      matchedProps = properties.filter(p => p.purpose === 'Rent').slice(0, 3);
      responseText = `Here are prime rental listings with zero brokerage hassle and direct owner contact:`;
    } else if (qLower.includes('deal') || qLower.includes('discount') || qLower.includes('offer')) {
      matchedProps = properties.filter(p => p.isDeal).slice(0, 3);
      responseText = `I've fetched our active exclusive property deals with verified price reductions:`;
    } else if (qLower.includes('compare')) {
      matchedProps = properties.slice(0, 2);
      actionType = 'compare';
      responseText = `I've opened the property comparison matrix for the top two matching homes! You can evaluate price per sq.ft, amenities, and AI match ratings.`;
    } else if (qLower.includes('gachibowli') || qLower.includes('kondapur') || qLower.includes('hyderabad')) {
      matchedProps = properties.filter(p => p.city === 'Hyderabad').slice(0, 3);
      responseText = `Hyderabad IT corridor is witnessing high demand. Here are top rated listings in Gachibowli & Kondapur:`;
    } else if (qLower.includes('pg') || qLower.includes('co-living')) {
      matchedProps = properties.filter(p => p.category === 'PG').slice(0, 2);
      responseText = `Here are recommended executive PGs with 3 meals included, high-speed WiFi, and zero deposit lock-in:`;
    } else {
      matchedProps = properties.slice(0, 3);
      responseText = `Based on current market listings, here are top recommended properties on GruhaSankalp matching your request:`;
    }

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      properties: matchedProps,
      actionType
    };

    setMessages(prev => [...prev, aiMsg]);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceQuery = "I need a 2BHK near Gachibowli under 75 lakhs.";
      setInput(voiceQuery);
      handleSend(voiceQuery);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[640px] z-50 flex flex-col bg-white rounded-none sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5">
      {/* AI HEADER */}
      <div className="bg-gradient-to-r from-[#0B2948] via-[#123B63] to-[#0B2948] text-white p-4 flex items-center justify-between border-b border-amber-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">Gruha AI</h3>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-400/40">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-slate-300">Your intelligent property assistant</p>
          </div>
        </div>

        <button
          onClick={closeAiAssistant}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close Gruha AI"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#0B2948] text-white rounded-br-none shadow-md'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-slate-300 text-right' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>

            {/* INLINE PROPERTY CARDS FROM AI */}
            {msg.properties && msg.properties.length > 0 && (
              <div className="mt-3 w-full space-y-2.5">
                {msg.properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex gap-3 hover:border-amber-400 transition-colors"
                  >
                    <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={prop.images[0]}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-[#0B2948]/90 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {prop.aiMatch}% Match
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{prop.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{prop.locality}, {prop.city}</p>
                        <p className="text-xs font-extrabold text-[#0B2948] mt-0.5">{prop.priceFormatted}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <Link
                          href={`/property/${prop.id}`}
                          onClick={closeAiAssistant}
                          className="bg-[#0B2948] text-white text-[10px] font-semibold px-2.5 py-1 rounded-md hover:bg-[#123B63] flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => toggleSaveProperty(prop.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded border border-slate-200"
                          title="Save property"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* TYPING INDICATOR */}
        {isTyping && (
          <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 w-fit shadow-sm">
            <Bot className="w-4 h-4 text-[#0B2948] animate-bounce" />
            <span className="text-xs text-slate-500">Gruha AI is searching properties...</span>
          </div>
        )}

        {/* VOICE SEARCH LISTENING STATE */}
        {isListening && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-center space-y-1 animate-pulse">
            <p className="text-xs font-bold text-amber-900">🎤 Listening...</p>
            <p className="text-[11px] text-amber-700">&quot;I need a 2BHK near Gachibowli under 75 lakhs.&quot;</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK SUGGESTIONS */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="shrink-0 bg-slate-100 hover:bg-amber-50 hover:text-[#0B2948] hover:border-amber-300 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <button
          onClick={handleVoiceSearch}
          className={`p-2 rounded-xl transition-colors ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything about properties..."
          className="flex-1 bg-slate-100 text-slate-900 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B2948]"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="bg-[#0B2948] hover:bg-[#123B63] disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
