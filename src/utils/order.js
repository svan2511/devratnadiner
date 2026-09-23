// Central helper for Request-for-Order flow (search + cart + WhatsApp checkout).

export const ORDER_WHATSAPP_NUMBER = '918439356155';
export const ORDER_PHONE_DISPLAY = '+91 8439356155';

// Restaurant location (from Google Maps embed) + online-order rules
export const RESTAURANT_LAT = 30.271015;
export const RESTAURANT_LNG = 77.9945629;
export const MIN_ORDER_AMOUNT = 500;
export const DELIVERY_RADIUS_METERS = 1000;
export const DELIVERY_CHARGE = 40;

// Online ordering hours (local time). 9:30 AM se pehle aur 11:00 PM ke baad order band.
export const ORDER_OPEN_MINUTES = 9 * 60 + 30; // 570 = 9:30 AM
export const ORDER_CLOSE_MINUTES = 23 * 60; // 1380 = 11:00 PM (23:00 wali minute tak allowed)
export const ORDER_HOURS_LABEL = '9:30 AM – 11:00 PM';

/** Straight-line distance in meters between two lat/lng points. */
export function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const a =
    Math.sin(toRad(lat2 - lat1) / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lng2 - lng1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function formatDistance(m) {
  if (m == null) return '';
  if (m < 1000) return `~${Math.round(m)}m`;
  return `~${(m / 1000).toFixed(1)} km`;
}

/** Radius ko display ke liye — 1000 => "1 km", 500 => "500m". */
export function formatRadius(m) {
  if (m == null) return '';
  if (m >= 1000 && m % 1000 === 0) return `${m / 1000} km`;
  if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
  return `${m}m`;
}

/**
 * Ordering time check (local time).
 * Open: 9:30 AM (570) se 11:00 PM (1380) tak — 23:00 wali minute included.
 * Returns { isOpen, state: 'open' | 'early' | 'late', message }
 */
export function getOrderingTimeStatus(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (minutes < ORDER_OPEN_MINUTES) {
    return {
      isOpen: false,
      state: 'early',
      message: 'Ordering opens at 9:30 AM',
    };
  }
  if (minutes > ORDER_CLOSE_MINUTES) {
    return {
      isOpen: false,
      state: 'late',
      message: 'Ordering closed for today — opens tomorrow at 9:30 AM',
    };
  }
  return {
    isOpen: true,
    state: 'open',
    message: `Ordering open • ${ORDER_HOURS_LABEL}`,
  };
}

/**
 * "₹40 / 70" => Half/Full, "₹20 / 40 / 80" => Small/Medium/Large,
 * "₹120" => Regular, "MRP" => MRP (amount 0)
 */
export function getPriceOptions(priceStr) {
  if (!priceStr) return [{ label: 'Regular', amount: 0 }];
  const nums = String(priceStr).match(/\d+/g)?.map(Number) ?? [];
  if (nums.length === 0) return [{ label: 'MRP', amount: 0, mrp: true }];
  if (nums.length === 1) return [{ label: 'Regular', amount: nums[0] }];
  if (nums.length === 2) {
    return [
      { label: 'Half', amount: nums[0] },
      { label: 'Full', amount: nums[1] },
    ];
  }
  if (nums.length === 3) {
    return [
      { label: 'Small', amount: nums[0] },
      { label: 'Medium', amount: nums[1] },
      { label: 'Large', amount: nums[2] },
    ];
  }
  return nums.map((n, i) => ({ label: `Option ${i + 1}`, amount: n }));
}

export function formatINR(n) {
  return `₹${Number(n || 0)}`;
}

export function cartKey(name, variant) {
  return `${name}||${variant}`;
}

export function buildOrderMessage(lines, customer, meta) {
  const { name = '', phone = '', note = '' } = customer || {};
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + (l.mrp ? 0 : l.amount * l.qty), 0);
  const deliveryFee = lines.length > 0 ? DELIVERY_CHARGE : 0;
  const totalAmt = subtotal + deliveryFee;
  const hasMrp = lines.some((l) => l.mrp);

  const now = new Date();
  const dateStr = now.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const orderNo = `#DR-${Date.now().toString(36).toUpperCase().slice(-5)}`;
  const DIV = '━━━━━━━━━━━━━━━';

  let msg = `🍽️ *DEV RATNA DINER*\n`;
  msg += `📍 Clement Town, Dehradun\n`;
  msg += `🧾 *New Order Request*\n`;
  msg += `${orderNo} | 🕐 ${dateStr}\n`;
  msg += `${DIV}\n`;
  msg += `🍛 *ORDER ITEMS*\n`;
  msg += `${DIV}\n`;
  lines.forEach((l, i) => {
    msg += `${i + 1}. *${l.name}*\n`;
    if (l.mrp) {
      msg += `   ${l.variant} · Qty ${l.qty} · At MRP\n`;
    } else if (l.variant && l.variant !== 'Regular') {
      msg += `   ${l.variant} · ${l.qty} x ${formatINR(l.amount)} = ${formatINR(l.amount * l.qty)}\n`;
    } else {
      msg += `   ${l.qty} x ${formatINR(l.amount)} = ${formatINR(l.amount * l.qty)}\n`;
    }
  });
  msg += `${DIV}\n`;
  msg += `📦 Total Items: ${totalQty}\n`;
  msg += `🧾 Food Subtotal: ${formatINR(subtotal)}${hasMrp ? ' (+ MRP extra)' : ''}\n`;
  msg += `🛵 Delivery Charge: ${formatINR(deliveryFee)}\n`;
  msg += `💰 *Total Payable: ${formatINR(totalAmt)}*${hasMrp ? ' (+ MRP extra)' : ''}\n`;
  msg += `${DIV}\n`;
  msg += `👤 *CUSTOMER DETAILS*\n`;
  if (name.trim()) msg += `Name: ${name.trim()}\n`;
  if (phone.trim()) msg += `Phone: ${phone.trim()}\n`;
  if (note.trim()) msg += `Note: ${note.trim()}\n`;
  if (meta && meta.distanceM != null && meta.userLat != null) {
    msg += `Location: ${formatDistance(meta.distanceM)} away\n`;
    msg += `https://www.google.com/maps?q=${meta.userLat},${meta.userLng}\n`;
  }
  msg += `${DIV}\n`;
  msg += `✅ Please confirm my order. Thank you! 🙏`;
  return msg;
}

export function buildWhatsAppOrderLink(lines, customer, meta) {
  const msg = buildOrderMessage(lines, customer, meta);
  return `https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
