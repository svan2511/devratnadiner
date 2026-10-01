import { useEffect, useState } from 'react';
import {
  DELIVERY_CHARGE,
  DELIVERY_RADIUS_METERS,
  MIN_ORDER_AMOUNT,
} from '../utils/order';

// Live backend (admin panel ka single source of truth).
// VITE_API_URL se override, default production API.
export const SHOP_API_BASE = (
  import.meta.env.VITE_API_URL || 'https://devratna-apis.onrender.com'
).replace(/\/$/, '');

/**
 * Live menu + shop settings — mobile app jaisa behaviour webapp ke liye.
 * - /api/v1/menu se is_available + price_label (admin dish OFF/rate change turant)
 * - /api/v1/shop-status se min_order, delivery_charge, radius_m, shop_open
 * - Fail silent = bundled static fallback, 25s polling jaise mobile app me hai.
 */
export function useLiveShop() {
  const [liveByName, setLiveByName] = useState({});
  const [shop, setShop] = useState({
    minOrder: MIN_ORDER_AMOUNT,
    deliveryCharge: DELIVERY_CHARGE,
    radiusM: DELIVERY_RADIUS_METERS,
    shopOpen: true,
  });

  useEffect(() => {
    let alive = true;

    const loadMenu = () => {
      fetch(`${SHOP_API_BASE}/api/v1/menu`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          if (!alive || !j?.data || !Array.isArray(j.data)) return;
          const map = {};
          for (const cat of j.data) {
            for (const it of cat.items || []) {
              if (!it?.name) continue;
              map[it.name] = {
                price_label: it.price_label,
                is_available: it.is_available ?? true,
                description: it.description ?? null,
              };
            }
          }
          setLiveByName(map);
        })
        .catch(() => {});
    };

    const loadShop = () => {
      fetch(`${SHOP_API_BASE}/api/v1/shop-status`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          const d = j?.data;
          if (!alive || !d) return;
          setShop((prev) => ({
            minOrder:
              Number.isFinite(d.min_order) && d.min_order >= 0
                ? Math.round(d.min_order)
                : prev.minOrder,
            deliveryCharge:
              Number.isFinite(d.delivery_charge) && d.delivery_charge >= 0
                ? Math.round(d.delivery_charge)
                : prev.deliveryCharge,
            radiusM:
              Number.isFinite(d.radius_m) && d.radius_m >= 100
                ? Math.round(d.radius_m)
                : prev.radiusM,
            shopOpen: typeof d.shop_open === 'boolean' ? d.shop_open : prev.shopOpen,
          }));
        })
        .catch(() => {});
    };

    loadMenu();
    loadShop();
    // Mobile app ki tarah silent polling — admin change ~25s me dikhega.
    const poll = setInterval(() => {
      loadMenu();
      loadShop();
    }, 25000);
    return () => {
      alive = false;
      clearInterval(poll);
    };
  }, []);

  return { liveByName, shop };
}

/** Static item pe live override lagao — price + availability. */
export function withLive(item, liveByName) {
  const live = liveByName?.[item.name];
  if (!live) return { ...item, available: true };
  return {
    ...item,
    price: live.price_label || item.price,
    desc:
      typeof live.description === 'string' && live.description.length > 0
        ? live.description
        : item.desc,
    available: live.is_available !== false,
  };
}
