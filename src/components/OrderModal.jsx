import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORY_LABELS, MENU_ITEMS, MENU_TABS } from '../data/site';
import {
  DELIVERY_RADIUS_METERS,
  MIN_ORDER_AMOUNT,
  ORDER_PHONE_DISPLAY,
  ORDER_WHATSAPP_NUMBER,
  buildWhatsAppOrderLink,
  cartKey,
  formatDistance,
  formatINR,
  getPriceOptions,
  haversineMeters,
  RESTAURANT_LAT,
  RESTAURANT_LNG,
} from '../utils/order';

function QtyStepper({ qty, onInc, onDec }) {
  if (qty === 0) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-container text-surface-bright px-1.5 py-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDec}
        className="w-6 h-6 rounded-full bg-surface-bright/20 hover:bg-surface-bright/30 flex items-center justify-center font-bold leading-none"
      >
        −
      </button>
      <span className="min-w-5 text-center font-label-md text-label-md font-bold">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onInc}
        className="w-6 h-6 rounded-full bg-surface-bright/20 hover:bg-surface-bright/30 flex items-center justify-center font-bold leading-none"
      >
        +
      </button>
    </div>
  );
}

export default function OrderModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState({}); // key -> { name, variant, amount, qty, mrp }
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [locStatus, setLocStatus] = useState('idle'); // idle | locating | ok | error
  const [locError, setLocError] = useState('');
  const [userPos, setUserPos] = useState(null); // { lat, lng }
  const [distanceM, setDistanceM] = useState(null);
  const [locAccuracy, setLocAccuracy] = useState(null); // meters, from browser
  const bodyRef = useRef(null);
  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getPhoneDigits = (v) => String(v || '').replace(/\D/g, '').slice(0, 10);
  const phoneDigits = getPhoneDigits(phone);
  const isPhoneValid = /^[6-9]\d{9}$/.test(phoneDigits);

  const getPhoneError = (digits) => {
    if (!digits) return 'Mobile number is required to place your order.';
    if (digits.length !== 10) return 'Mobile number must be exactly 10 digits.';
    if (!/^[6-9]/.test(digits)) return 'Mobile number must start with 6, 7, 8 or 9.';
    return '';
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      const cat = (CATEGORY_LABELS[item.category] || '').toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.desc || '').toLowerCase().includes(q) ||
        cat.includes(q)
      );
    });
  }, [query, category]);

  if (!open) return null;

  const inc = (item, opt) => {
    const key = cartKey(item.name, opt.label);
    setCart((prev) => {
      const cur = prev[key]?.qty ?? 0;
      return {
        ...prev,
        [key]: { name: item.name, variant: opt.label, amount: opt.amount, qty: cur + 1, mrp: !!opt.mrp },
      };
    });
  };

  const dec = (item, opt) => {
    const key = cartKey(item.name, opt.label);
    setCart((prev) => {
      const cur = prev[key]?.qty ?? 0;
      if (cur <= 1) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { ...prev[key], qty: cur - 1 } };
    });
  };

  const removeLine = (key) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const verifyLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocStatus('error');
      setLocError(`Location is not supported on this device. Please call ${ORDER_PHONE_DISPLAY} to order.`);
      return;
    }
    setLocStatus('locating');
    setLocError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setUserPos({ lat: latitude, lng: longitude });
        setDistanceM(haversineMeters(RESTAURANT_LAT, RESTAURANT_LNG, latitude, longitude));
        setLocAccuracy(accuracy != null ? Math.round(accuracy) : null);
        setLocStatus('ok');
      },
      (err) => {
        setLocStatus('error');
        setLocAccuracy(null);
        if (err.code === 1) {
          setLocError('Location permission denied. Please allow location access and try again, or call us to order.');
        } else if (err.code === 2) {
          setLocError('Could not detect your location. Please try again or call us to order.');
        } else if (err.code === 3) {
          setLocError('Location request timed out. Please try again.');
        } else {
          setLocError('Could not verify your location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  };

  const lines = Object.entries(cart).map(([key, v]) => ({ key, ...v }));
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);
  const totalAmt = lines.reduce((s, l) => s + (l.mrp ? 0 : l.amount * l.qty), 0);
  const hasMrp = lines.some((l) => l.mrp);
  const minOrderMet = totalAmt >= MIN_ORDER_AMOUNT;
  const amountNeeded = MIN_ORDER_AMOUNT - totalAmt;
  const inRange = locStatus === 'ok' && distanceM != null && distanceM <= DELIVERY_RADIUS_METERS;

  const placeOrder = () => {
    if (lines.length === 0) return;
    const err = getPhoneError(getPhoneDigits(phone));
    if (err) {
      setPhoneError(err);
      return;
    }
    if (!minOrderMet || !inRange) return;
    setPhoneError('');
    const cleanPhone = getPhoneDigits(phone);
    const url = buildWhatsAppOrderLink(
      lines,
      { name, phone: cleanPhone, note },
      userPos ? { distanceM, userLat: userPos.lat, userLng: userPos.lng } : undefined,
    );
    window.open(url, '_blank', 'noopener');
  };

  const canPlace = lines.length > 0 && isPhoneValid && minOrderMet && inRange;

  const firstBlocker =
    lines.length === 0
      ? 'Add items to your order first'
      : !isPhoneValid
        ? 'Enter your 10-digit mobile number first'
        : !minOrderMet
          ? `Add ${formatINR(amountNeeded)} more (minimum ${formatINR(MIN_ORDER_AMOUNT)})`
          : locStatus !== 'ok'
            ? 'Verify your location first'
            : !inRange
              ? 'You are outside the 500m delivery range'
              : undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Request for Order">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      <div className="relative w-full sm:max-w-5xl bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] m-0 sm:m-4">
        {/* Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-surface-container bg-surface-container-low">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">Request for Order</h2>
              <p className="hidden sm:block font-body-sm text-body-sm text-on-surface-variant mt-1">
                Search and add items — your total will appear below. Pressing Place Order will send a formatted order on WhatsApp ({ORDER_PHONE_DISPLAY}).
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 shrink-0 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <label className="flex-1 flex min-w-0 items-center gap-2 h-11 px-4 rounded-xl bg-surface border border-surface-container-high focus-within:border-secondary">
              <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes… e.g. Paneer, Momos, Thali"
                className="w-full min-w-0 flex-1 bg-transparent outline-none font-body-md text-body-md text-on-surface placeholder:text-outline"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="shrink-0 text-outline hover:text-on-surface" aria-label="Clear search">
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </label>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {MENU_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setCategory(t.key)}
                className={
                  t.key === category
                    ? 'shrink-0 px-4 py-2 rounded-full bg-primary-container text-surface-bright font-label-md text-label-md shadow-sm'
                    : 'shrink-0 px-4 py-2 rounded-full bg-surface text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high border border-surface-container-high'
                }
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-2 font-caption text-caption text-on-surface-variant">
            {filtered.length} items found{query ? ` for “${query}”` : ''} • {MENU_ITEMS.length} items in total menu
          </p>
        </div>

        {/* Body — single scroll on mobile, two independent panes on desktop */}
        <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_340px]">
          {/* Items */}
          <div className="p-4 sm:p-5 space-y-3 lg:min-h-0 lg:overflow-y-auto">
            {filtered.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant font-body-md text-body-md">
                No items found. Please try a different search.
              </div>
            )}
            {filtered.map((item) => {
              const opts = getPriceOptions(item.price);
              return (
                <div key={item.name} className="p-4 rounded-xl bg-surface-container-low border border-surface-container hover:border-secondary/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                        <h4 className="font-subhead-lg text-subhead-lg font-bold text-on-surface">{item.name}</h4>
                        {CATEGORY_LABELS[item.category] && (
                          <span className="font-caption text-caption text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                            {CATEGORY_LABELS[item.category]}
                          </span>
                        )}
                      </div>
                      {item.desc && <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {opts.map((opt) => {
                      const key = cartKey(item.name, opt.label);
                      const qty = cart[key]?.qty ?? 0;
                      return (
                        <div key={opt.label} className="flex items-center justify-between gap-3 rounded-lg bg-surface px-3 py-2">
                          <span className="font-label-md text-label-md text-on-surface-variant">
                            {opts.length > 1 ? `${opt.label} • ` : ''}
                            <span className="font-bold text-secondary">{opt.mrp ? 'MRP' : formatINR(opt.amount)}</span>
                          </span>
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => inc(item, opt)}
                              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                              Add
                            </button>
                          ) : (
                            <QtyStepper qty={qty} onInc={() => inc(item, opt)} onDec={() => dec(item, opt)} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="h-2" />
          </div>

          {/* Cart */}
          <aside ref={cartRef} className="border-t lg:border-t-0 lg:border-l border-surface-container bg-surface-container-low/60 p-4 sm:p-5 flex flex-col lg:min-h-0 lg:overflow-y-auto">
            <h3 className="font-subhead-lg text-subhead-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">shopping_bag</span>
              Your Order ({totalQty})
            </h3>
            <div className="mt-3 space-y-2 max-h-56 overflow-y-auto lg:max-h-none lg:overflow-visible">
              {lines.length === 0 && (
                <p className="font-body-sm text-body-sm text-on-surface-variant rounded-xl bg-surface p-4 text-center">
                  Nothing selected yet.
                  <br />
                  Add items from the list.
                </p>
              )}
              {lines.map((l) => (
                <div key={l.key} className="flex items-center justify-between gap-2 rounded-xl bg-surface px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {l.name} <span className="font-normal text-on-surface-variant">({l.variant})</span>
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {l.mrp ? 'At MRP' : `${formatINR(l.amount)} x ${l.qty} = ${formatINR(l.amount * l.qty)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-1 py-0.5">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => {
                          const [nm, vr] = l.key.split('||');
                          dec({ name: nm }, { label: vr, amount: l.amount, mrp: l.mrp });
                        }}
                        className="w-6 h-6 rounded-full hover:bg-surface-container-high font-bold"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center font-bold text-label-md">{l.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() => {
                          const [nm, vr] = l.key.split('||');
                          inc({ name: nm }, { label: vr, amount: l.amount, mrp: l.mrp });
                        }}
                        className="w-6 h-6 rounded-full hover:bg-surface-container-high font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button type="button" aria-label="Remove" onClick={() => removeLine(l.key)} className="text-outline hover:text-error">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-10 px-3 rounded-lg bg-surface border border-surface-container-high font-body-sm text-body-sm outline-none focus:border-secondary"
              />
              <div className="relative">
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                    if (phoneError) setPhoneError('');
                  }}
                  onBlur={() => {
                    if (phone) setPhoneError(getPhoneError(getPhoneDigits(phone)));
                  }}
                  placeholder="Mobile number *"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  minLength={10}
                  pattern="[6-9][0-9]{9}"
                  required
                  aria-invalid={phoneError ? 'true' : undefined}
                  className={`h-10 w-full px-3 rounded-lg bg-surface border font-body-sm text-body-sm outline-none focus:border-secondary ${
                    phoneDigits.length > 0 ? 'pr-12' : ''
                  } ${phoneError ? 'border-error' : 'border-surface-container-high'}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-caption text-caption text-on-surface-variant pointer-events-none">
                  {phoneDigits.length > 0 ? `${phoneDigits.length}/10` : ''}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <label className="block font-label-md text-label-md font-bold text-on-surface mb-1.5">
                Note <span className="font-normal text-on-surface-variant">(optional)</span>
              </label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Less spicy, parcel, address…"
                className="w-full h-11 px-3.5 rounded-xl bg-surface border border-surface-container-high font-body-sm text-body-sm outline-none focus:border-secondary placeholder:text-outline"
              />
            </div>

            <div className="mt-3 rounded-xl bg-primary-container text-surface-bright px-5 py-3.5 flex items-center justify-between gap-3">
              <span className="font-label-md text-label-md opacity-90">Total {hasMrp ? '(MRP extra)' : ''}</span>
              <span className="text-xl font-bold whitespace-nowrap">{formatINR(totalAmt)}</span>
            </div>

            {/* Requirements */}
            <div className="mt-3 rounded-xl bg-surface border border-surface-container-high px-3.5 py-3 space-y-2.5">
              <div className="flex items-center gap-2.5">
                {isPhoneValid ? (
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
                )}
                <p className={`font-label-md text-label-md ${phoneError ? 'text-red-600 font-semibold' : 'text-on-surface-variant'}`}>
                  {isPhoneValid ? 'Mobile number added' : phoneError || 'Add your 10-digit mobile number'}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  {minOrderMet ? (
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
                  )}
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    {lines.length === 0
                      ? `Minimum online order ${formatINR(MIN_ORDER_AMOUNT)}`
                      : minOrderMet
                        ? 'Minimum order complete'
                        : `Add ${formatINR(amountNeeded)} more (min ${formatINR(MIN_ORDER_AMOUNT)})`}
                  </p>
                </div>
                {lines.length > 0 && !minOrderMet && (
                  <div className="mt-2 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary transition-all"
                      style={{ width: `${Math.min(100, (totalAmt / MIN_ORDER_AMOUNT) * 100)}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                {locStatus === 'ok' && inRange ? (
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                ) : locStatus === 'ok' ? (
                  <span className="material-symbols-outlined text-red-600 text-[20px]">error</span>
                ) : (
                  <span className="material-symbols-outlined text-outline text-[20px]">radio_button_unchecked</span>
                )}
                <p className={`flex-1 font-label-md text-label-md ${locStatus === 'ok' && !inRange ? 'text-red-600 font-semibold' : 'text-on-surface-variant'}`}>
                  {locStatus === 'ok' && inRange
                    ? `Location verified (${formatDistance(distanceM)} away${locAccuracy != null ? ` • ±${locAccuracy}m` : ''})`
                    : locStatus === 'ok'
                      ? `You are ${formatDistance(distanceM)} away — 500m limit${locAccuracy != null ? ` (±${locAccuracy}m)` : ''}`
                      : locStatus === 'locating'
                        ? 'Detecting your location…'
                        : locStatus === 'error'
                          ? locError
                          : 'Verify you are within 500m'}
                </p>
                {locStatus === 'ok' && inRange && (
                  <button
                    type="button"
                    onClick={verifyLocation}
                    className="shrink-0 font-caption text-caption font-bold text-secondary hover:underline"
                  >
                    Re-check
                  </button>
                )}
              </div>
              {locStatus === 'ok' && locAccuracy != null && locAccuracy > 150 && (
                <p className="font-caption text-caption text-amber-700">
                  Approximate location (±{locAccuracy}m) — turn on GPS / go outdoors and Re-check for exact result.
                </p>
              )}
            </div>

            {/* Location action — always visible until verified */}
            {!(locStatus === 'ok' && inRange) && locStatus !== 'locating' && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={verifyLocation}
                  className="w-full h-12 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold inline-flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(159,65,32,0.2)] hover:bg-secondary-container hover:text-on-secondary-container active:scale-[0.99] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">my_location</span>
                  {locStatus === 'ok' ? 'Check Location Again' : 'Verify My Location'}
                </button>
                {locStatus === 'ok' ? (
                  <a
                    href={`tel:+${ORDER_WHATSAPP_NUMBER}`}
                    className="mt-2 w-full h-11 rounded-xl border border-surface-container-high bg-surface text-on-surface font-label-md text-label-md font-bold inline-flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                    Call {ORDER_PHONE_DISPLAY} to Order
                  </a>
                ) : (
                  <p className="mt-1.5 text-center font-caption text-caption text-on-surface-variant">
                    Needed for online ordering (500m range)
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              disabled={!canPlace}
              onClick={placeOrder}
              title={firstBlocker}
              className={`mt-3 w-full rounded-2xl p-1 transition active:scale-[0.99] ${
                canPlace
                  ? 'bg-gradient-to-r from-[#128C7E] to-[#25D366] shadow-[0_10px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:brightness-105'
                  : 'bg-surface-container-high cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3 px-3 py-2">
                <span
                  className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${
                    canPlace ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">{canPlace ? 'chat' : 'lock'}</span>
                </span>
                <span className="flex-1 min-w-0 text-left">
                  <span className={`block font-label-lg text-label-lg font-bold ${canPlace ? 'text-white' : 'text-on-surface-variant'}`}>
                    Place Order on WhatsApp
                  </span>
                  <span className={`block font-caption text-caption truncate ${canPlace ? 'text-white/85' : 'text-on-surface-variant'}`}>
                    {canPlace ? `Total ${formatINR(totalAmt)} • Just press Send` : firstBlocker}
                  </span>
                </span>
                <span className={`material-symbols-outlined text-[22px] shrink-0 ${canPlace ? 'text-white' : 'text-on-surface-variant'}`}>
                  arrow_forward
                </span>
              </span>
            </button>
            <p className="mt-2 text-center font-caption text-caption text-on-surface-variant">
              WhatsApp will open with your order ready — just press Send.
            </p>
            {lines.length > 0 && (
              <button type="button" onClick={() => setCart({})} className="mt-1 font-caption text-caption text-outline hover:text-error">
                Clear entire order
              </button>
            )}
          </aside>

          {/* Mobile-only floating cart bar — shows live total, jumps to order */}
          {lines.length > 0 && (
            <div className="lg:hidden sticky bottom-0 z-10 px-4 pb-4 pt-2 bg-gradient-to-t from-surface via-surface to-transparent">
              <button
                type="button"
                onClick={scrollToCart}
                className="w-full rounded-2xl bg-primary-container text-surface-bright pl-4 pr-2 py-2 flex items-center justify-between gap-3 shadow-[0_10px_30px_rgba(36,26,23,0.35)] active:scale-[0.99] transition"
              >
                <span className="min-w-0 text-left">
                  <span className="block font-label-lg text-label-lg font-bold leading-tight">
                    {totalQty} {totalQty === 1 ? 'item' : 'items'} • {formatINR(totalAmt)}
                  </span>
                  <span className="block font-caption text-caption text-surface-container-high/80">
                    Added to your order
                  </span>
                </span>
                <span className="shrink-0 inline-flex items-center gap-1 h-10 px-4 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold">
                  View Order
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
