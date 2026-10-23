import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import SignatureDishes from './components/SignatureDishes';
import MenuCatalog from './components/MenuCatalog';
import TodaysSpecial from './components/TodaysSpecial';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Location from './components/Location';
import AppDownload from './components/AppDownload';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import OrderModal from './components/OrderModal';
import NotFound from './components/NotFound';

function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);

  // Hash (e.g. /#menu-catalog) ko respect karo, warna hero se top pe le jao.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-surface">
      <Navbar onOrder={openOrder} />
      <main className="w-full pt-20 bg-surface pb-20 md:pb-0">
        <div className="flex flex-col w-full">
          <Hero />
          <About />
          <WhyUs />
          <SignatureDishes onOrder={openOrder} />
          <MenuCatalog onOrder={openOrder} />
          <TodaysSpecial />
          <Gallery />
          <Reviews />
          <Location />
          <AppDownload />
          <FinalCta />
        </div>
      </main>
      <MobileBar onOrder={openOrder} />
      <Footer />
      <OrderModal open={orderOpen} onClose={closeOrder} />
    </div>
  );
}

function App() {
  if (typeof window === 'undefined') return null;

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = path === '/' || path === '/index.html';

  return isHome ? <HomePage /> : <NotFound />;
}

export default App;
