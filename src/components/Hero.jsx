import { IMAGES } from '../data/site';

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-primary-container text-on-primary">
      <div className="max-w-7xl mx-auto px-gutter pt-6 sm:pt-8 pb-space-2xl flex flex-col gap-space-lg">
        {/* Shop photo — poori original, top (signboard) se pinned, koi blur/overlay nahi */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={IMAGES.heroFront}
            alt="Dev Ratna Diner shop front in Clement Town"
            loading="eager"
            className="w-full h-[300px] sm:h-[420px] lg:h-[500px] object-cover object-top"
          />
        </div>
        <div className="flex flex-wrap items-center gap-space-md">
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
              className="inline-flex items-center gap-space-xs px-space-md h-12 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 font-label-md text-label-md transition-colors"
              href="tel:+918439356155"
            >
              <span className="material-symbols-outlined text-secondary-container">phone_in_talk</span>
              <span>+91 8439356155</span>
            </a>
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
