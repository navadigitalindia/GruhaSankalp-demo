import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';
import GruhaAI from '@/components/GruhaAI';
import ToastContainer from '@/components/Toast';

export const metadata: Metadata = {
  title: 'GruhaSankalp | Find Your Dream Home with AI Property Assistant',
  description: 'India\'s modern real-estate discovery platform. Buy, rent, and explore verified apartments, villas, plots, PGs, and commercial spaces with Gruha AI.',
  keywords: ['real estate India', 'buy flat Hyderabad', 'rent apartment Gachibowli', 'plots for sale Kokapet', 'GruhaSankalp'],
  openGraph: {
    title: 'GruhaSankalp | Find Your Dream Home',
    description: 'Discover properties, compare options and get intelligent assistance with GruhaSankalp.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F7F9FC] text-[#17202A] antialiased min-h-screen flex flex-col selection:bg-[#D9A72C] selection:text-[#0B2948]">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <GruhaAI />
          <BottomNavigation />
          <Footer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
