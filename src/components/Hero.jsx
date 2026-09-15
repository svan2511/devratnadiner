import { IMAGES } from '../data/site';

export default function Hero() {
  return (
    <section id="home" className="relative w-full -mt-20 overflow-hidden bg-primary-container text-on-primary">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${IMAGES.heroBg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/85 to-primary-container/50"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-primary-container/40 to-primary-container"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-gutter pt-36 pb-space-2xl min-h-[92vh] flex flex-col justify-between">
        <div className="flex flex-wrap items-center gap-space-sm pt-4">
          <span className="inline-flex items-center gap-space-xs px-3.5 py-1 rounded-full bg-secondary text-on-secondary font-label-md text-label-md tracking-widest uppercase shadow-md">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">eco</span>
            Welcome to Dev Ratna Diner
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/20 backdrop-blur-md text-tertiary-fixed font-caption text-caption">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Open Today • 8:30 AM to 11:00 PM</span>
          </div>
        </div>

        <div className="my-auto py-space-xl max-w-3xl space-y-space-md">
          <p className="font-subhead-lg text-subhead-lg text-tertiary-fixed-dim uppercase tracking-wider font-semibold">
            Dev Ratna Diner • Dehradun
          </p>
          <h1 className="font-display-hero text-display-hero-mobile sm:text-display-hero font-bold tracking-tight text-surface-bright leading-none drop-shadow-sm">
            Good Food. <br className="hidden sm:block" />
            Good Mood. <br />
            <span className="italic text-secondary-container">Good Moments.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-2xl leading-relaxed pt-space-xs">
            Fresh flavours, comforting meals, and genuine Garhwali hospitality in the quiet pine-swept heart of Clement
            Town. From sizzling tandoor skewers to slow-simmered valley classics.
          </p>
          <div className="flex flex-wrap items-center gap-space-md pt-space-md">
            <a
              className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all hover:-translate-y-0.5 active:scale-95"
              href="#menu-catalog"
            >
              <span className="material-symbols-outlined mr-2 text-[20px]">restaurant_menu</span>
              Explore Our Menu
            </a>
            <a
              className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg bg-surface-container-highest/25 backdrop-blur-md text-surface-bright font-label-lg text-label-lg hover:bg-surface-bright hover:text-primary-container transition-all shadow-sm"
              href="#location-map"
            >
              <span className="material-symbols-outlined mr-2 text-[20px] text-secondary-container">near_me</span>
              Get Directions
            </a>
            <a
              className="inline-flex items-center gap-space-xs px-space-md h-12 rounded-lg text-surface-container-high hover:text-surface-bright font-label-md text-label-md transition-colors"
              href="tel:+918439356155"
            >
              <span className="material-symbols-outlined text-secondary-container">phone_in_talk</span>
              <span>+91 8439356155</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-md border-t border-surface-container-highest/20 text-surface-container-high font-body-sm text-body-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary-container text-[26px]">pin_drop</span>
            <div>
              <span className="text-surface-bright font-semibold block">Society Area, Clement Town</span>
              <span className="text-outline-variant text-[12px]">Behind Sakshi Electronics, Dehradun</span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[26px]">skillet</span>
            <div>
              <span className="text-surface-bright font-semibold block">Clay Oven &amp; Slow Handi</span>
              <span className="text-outline-variant text-[12px]">Cooked fresh to order every day</span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary-container text-[26px]">star</span>
            <div>
              <span className="text-surface-bright font-semibold block">4.7 Star Neighborhood Gem</span>
              <span className="text-outline-variant text-[12px]">Beloved by students &amp; Doon families</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
