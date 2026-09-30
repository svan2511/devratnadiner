import { useState } from 'react';
import { SIGNATURE_DISHES, getDishImage } from '../data/site';
import DishModal from './DishModal';

export default function SignatureDishes({ onOrder }) {
  const [selected, setSelected] = useState(null);

  return (
    <section id="signature-dishes" className="w-full py-space-2xl bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-xl">
            <span className="font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
              Chef&apos;s Recommendations
            </span>
            <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
              Something Delicious Is Waiting
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The iconic plates that made Dev Ratna Diner Clement Town&apos;s beloved table. Tap any dish for details.
            </p>
          </div>
          <div>
            <a
              className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-secondary hover:text-primary-container transition-colors"
              href="#menu-catalog"
            >
              <span>Explore All 90+ Dishes</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_DISHES.map((d) => {
            const img = getDishImage(d) || d.img;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => setSelected(d)}
                className="group text-left rounded-3xl bg-surface-container-low overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer border border-transparent hover:border-surface-container-high"
              >
                <div>
                  {/* Bigger Zomato-style photo */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-surface-container">
                    <img
                      alt={d.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img}
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${d.badgeStyle} text-white font-caption text-caption flex items-center gap-1 shadow-sm`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> {d.badge}
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-container/90 text-surface-bright font-label-md text-label-md backdrop-blur-sm">
                      {d.price}
                    </span>
                    <span className="absolute bottom-3 right-3 px-4 py-1.5 rounded-xl bg-surface text-secondary font-label-md text-label-md font-bold shadow-lg">
                      View +
                    </span>
                  </div>
                  <div className="p-space-md space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">{d.name}</h3>
                      <span className="font-caption text-caption text-on-tertiary-container bg-tertiary-fixed/50 px-2 py-0.5 rounded shrink-0">
                        {d.tag}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">{d.desc}</p>
                  </div>
                </div>
                <div className="p-space-md pt-0 flex items-center justify-between">
                  <span className="font-caption text-caption text-secondary font-medium">{d.foot}</span>
                  <span
                    className="p-2 rounded-lg bg-surface-container group-hover:bg-secondary group-hover:text-on-secondary text-primary-container transition-colors"
                    title="Order via Phone"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <DishModal
        dish={selected}
        onClose={() => setSelected(null)}
        onOrder={() => {
          const dish = selected;
          setSelected(null);
          if (onOrder) onOrder(dish);
          else document.getElementById('menu-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </section>
  );
}
