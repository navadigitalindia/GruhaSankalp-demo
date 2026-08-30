'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Property, mockProperties as initialMockProperties } from '@/data/mockProperties';

export interface SiteVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  contactMethod: 'Phone' | 'WhatsApp' | 'Email';
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface SearchAlert {
  id: string;
  city: string;
  locality?: string;
  category: string;
  bhk?: string;
  maxBudget?: string;
  createdAt: string;
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
}

interface AppContextType {
  properties: Property[];
  savedPropertyIds: string[];
  recentlyViewedIds: string[];
  compareList: Property[];
  siteVisits: SiteVisit[];
  enquiries: Enquiry[];
  searchAlerts: SearchAlert[];
  toasts: ToastMessage[];
  isAiOpen: boolean;
  aiInitialPrompt: string;
  activeCategory: string;
  isLoggedIn: boolean;
  loggedInUser: string;
  
  // Actions
  toggleSaveProperty: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  toggleCompare: (property: Property) => void;
  clearCompare: () => void;
  scheduleVisit: (visit: Omit<SiteVisit, 'id' | 'createdAt' | 'status'>) => void;
  sendEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => void;
  addSearchAlert: (alert: Omit<SearchAlert, 'id' | 'createdAt'>) => void;
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  openAiAssistant: (prompt?: string) => void;
  closeAiAssistant: () => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'danger') => void;
  removeToast: (id: string) => void;
  setActiveCategory: (cat: string) => void;
  login: (name: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialMockProperties);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchAlerts, setSearchAlerts] = useState<SearchAlert[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [activeCategory, setActiveCategory] = useState('Buy');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const savedProps = localStorage.getItem('gruha_saved_props');
      if (savedProps) setSavedPropertyIds(JSON.parse(savedProps));

      const viewedProps = localStorage.getItem('gruha_recent_props');
      if (viewedProps) setRecentlyViewedIds(JSON.parse(viewedProps));

      const visits = localStorage.getItem('gruha_site_visits');
      if (visits) setSiteVisits(JSON.parse(visits));

      const enqs = localStorage.getItem('gruha_enquiries');
      if (enqs) setEnquiries(JSON.parse(enqs));

      const customProps = localStorage.getItem('gruha_custom_properties');
      if (customProps) {
        const parsedCustom: Property[] = JSON.parse(customProps);
        setProperties([...parsedCustom, ...initialMockProperties]);
      }
    } catch (e) {
      console.error('LocalStorage hydration error:', e);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const toggleSaveProperty = useCallback((id: string) => {
    setSavedPropertyIds(prev => {
      const isSaved = prev.includes(id);
      const next = isSaved ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('gruha_saved_props', JSON.stringify(next));
      if (!isSaved) {
        showToast('Saved to Favorites', 'Property added to your saved list for quick access.');
      } else {
        showToast('Removed from Favorites', 'Property removed from saved list.', 'info');
      }
      return next;
    });
  }, [showToast]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewedIds(prev => {
      if (prev.length > 0 && prev[0] === id) return prev;
      const filtered = prev.filter(item => item !== id);
      const next = [id, ...filtered].slice(0, 10);
      localStorage.setItem('gruha_recent_props', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleCompare = useCallback((property: Property) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === property.id);
      if (exists) {
        showToast('Comparison Updated', `${property.title.slice(0, 20)}... removed from comparison list.`, 'info');
        return prev.filter(p => p.id !== property.id);
      }
      if (prev.length >= 3) {
        showToast('Limit Reached', 'You can compare up to 3 properties at a time.', 'warning');
        return prev;
      }
      showToast('Added to Compare', `${property.title.slice(0, 20)}... added to comparison tray.`);
      return [...prev, property];
    });
  }, [showToast]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const scheduleVisit = useCallback((visitData: Omit<SiteVisit, 'id' | 'createdAt' | 'status'>) => {
    const newVisit: SiteVisit = {
      ...visitData,
      id: 'visit-' + Date.now(),
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setSiteVisits(prev => {
      const next = [newVisit, ...prev];
      localStorage.setItem('gruha_site_visits', JSON.stringify(next));
      return next;
    });
    showToast('Site Visit Scheduled 🎉', `Your visit for ${newVisit.date} at ${newVisit.timeSlot} is confirmed!`);
  }, [showToast]);

  const sendEnquiry = useCallback((enquiryData: Omit<Enquiry, 'id' | 'createdAt'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setEnquiries(prev => {
      const next = [newEnquiry, ...prev];
      localStorage.setItem('gruha_enquiries', JSON.stringify(next));
      return next;
    });
    showToast('Enquiry Sent Successfully', 'The property owner/agent will contact you shortly.');
  }, [showToast]);

  const addSearchAlert = useCallback((alertData: Omit<SearchAlert, 'id' | 'createdAt'>) => {
    const newAlert: SearchAlert = {
      ...alertData,
      id: 'alert-' + Date.now(),
      createdAt: new Date().toLocaleDateString()
    };
    setSearchAlerts(prev => [...prev, newAlert]);
    showToast('Search Alert Set', 'We will notify you as soon as matching properties are listed.');
  }, [showToast]);

  const addProperty = useCallback((newProperty: Property) => {
    setProperties(prev => {
      const next = [newProperty, ...prev];
      const customProps = next.filter(p => p.id.startsWith('custom-'));
      localStorage.setItem('gruha_custom_properties', JSON.stringify(customProps));
      return next;
    });
    showToast('Property Posted Successfully! 🚀', 'Your listing is now live on GruhaSankalp.');
  }, [showToast]);

  const removeProperty = useCallback((id: string) => {
    setProperties(prev => {
      const next = prev.filter(p => p.id !== id);
      const customProps = next.filter(p => p.id.startsWith('custom-'));
      localStorage.setItem('gruha_custom_properties', JSON.stringify(customProps));
      return next;
    });
    showToast('Property Removed', 'Your listing has been deleted.', 'info');
  }, [showToast]);

  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      const customProps = next.filter(p => p.id.startsWith('custom-'));
      localStorage.setItem('gruha_custom_properties', JSON.stringify(customProps));
      return next;
    });
    showToast('Property Updated', 'Your listing has been updated successfully.');
  }, [showToast]);

  const openAiAssistant = useCallback((prompt?: string) => {
    if (prompt) setAiInitialPrompt(prompt);
    setIsAiOpen(true);
  }, []);

  const closeAiAssistant = useCallback(() => {
    setIsAiOpen(false);
  }, []);

  const login = useCallback((name: string) => {
    setIsLoggedIn(true);
    setLoggedInUser(name);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedInUser('');
  }, []);

  return (
    <AppContext.Provider
      value={{
        properties,
        savedPropertyIds,
        recentlyViewedIds,
        compareList,
        siteVisits,
        enquiries,
        searchAlerts,
        toasts,
        isAiOpen,
        aiInitialPrompt,
        activeCategory,
        isLoggedIn,
        loggedInUser,
        toggleSaveProperty,
        addRecentlyViewed,
        toggleCompare,
        clearCompare,
        scheduleVisit,
        sendEnquiry,
        addSearchAlert,
        addProperty,
        removeProperty,
        updateProperty,
        openAiAssistant,
        closeAiAssistant,
        showToast,
        removeToast,
        setActiveCategory,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
