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
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import OrderModal from './components/OrderModal';

function App() {
  const [orderOpen, setOrderOpen] = useState(false);
  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);

  // Site load hote hi hamesha top (hero) dikhe — neeche scroll na ho
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
          <SignatureDishes />
          <MenuCatalog onOrder={openOrder} />
          <TodaysSpecial />
          <Gallery />
          <Reviews />
          <Location />
          <FinalCta />
        </div>
      </main>
      <MobileBar onOrder={openOrder} />
      <Footer />
      <OrderModal open={orderOpen} onClose={closeOrder} />
    </div>
  );
}

export default App;
