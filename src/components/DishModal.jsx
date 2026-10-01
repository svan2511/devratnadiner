import { useEffect } from 'react';
import { CATEGORY_LABELS, getDishImage } from '../data/site';
import { useLiveShop } from '../hooks/useLiveShop';

export default function DishModal({ dish, onClose, onOrder }) {
  const { liveByName, shop } = useLiveShop();
  useEffect(() => {
    if (!dish) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  // Admin live state — naam se match (mobile app jaisa).
  const live = dish?.name ? liveByName[dish.name] : null;
  const unavailable = live ? live.is_available === false : dish.available === false;
  const livePrice = live?.price_label || dish.price;
  const shopClosed = shop.shopOpen === false;
  const orderBlocked = unavailable || shopClosed;

  const img = getDishImage(dish);
  const category = CATEGORY_LABELS[dish.category] || dish.tag || dish.badge || 'Dev Ratna Special';

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={dish.name}>
      <button aria-label="Close dish details" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="relative w-full sm:max-w-lg bg-surface rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Big Zomato-style photo */}
        <div className="relative w-full h-64 sm:h-80 bg-surface-container">
          {img ? (
            <img src={img} alt={dish.alt || dish.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container">
              <span className="font-display-hero text-display-hero font-bold text-secondary/30">
                {dish.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/70"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-primary-container/90 text-surface-bright font-label-md text-label-md backdrop-blur-sm">
            {livePrice}
          </span>
          {unavailable && (
            <span className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-red-600 text-white font-label-md text-label-md font-bold backdrop-blur-sm">
              Not Available now
            </span>
          )}
          {dish.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${dish.badgeStyle || 'bg-secondary'} text-white font-caption text-caption shadow-sm`}>
              {dish.badge}
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-start gap-2">
            <span className="mt-1 w-4 h-4 rounded border-[1.5px] border-emerald-700 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </span>
            <div className="min-w-0">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">{dish.name}</h3>
              <p className="mt-0.5 font-caption text-caption uppercase tracking-wider text-secondary font-semibold">
                {category} • 100% Pure Veg
              </p>
            </div>
          </div>

          {dish.tag && (
            <span className="inline-block font-caption text-caption text-on-tertiary-container bg-tertiary-fixed/60 px-2.5 py-1 rounded-full">
              {dish.tag}
            </span>
          )}

          {dish.desc && (
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{dish.desc}</p>
          )}

          {dish.foot && (
            <p className="font-caption text-caption text-secondary font-semibold">★ {dish.foot}</p>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => !orderBlocked && onOrder?.(dish)}
              disabled={orderBlocked}
              title={
                unavailable
                  ? 'Ye dish aaj available nahi hai'
                  : shopClosed
                    ? 'Shop is closed now — ordering paused'
                    : undefined
              }
              className={`flex-1 inline-flex items-center justify-center px-space-lg h-12 rounded-xl font-label-lg text-label-lg shadow-md transition-all ${
                orderBlocked
                  ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                  : 'bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container'
              }`}
            >
              <span className="material-symbols-outlined mr-2 text-[20px]">shopping_bag</span>
              {unavailable ? 'Not Available now' : shopClosed ? 'Shop Closed' : 'Order this dish'}
            </button>
            <a
              href="tel:+918439356155"
              className="flex-1 inline-flex items-center justify-center px-space-lg h-12 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined mr-2 text-[20px]">call</span>
              Call to order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
