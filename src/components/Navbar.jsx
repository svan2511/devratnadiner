import { useState } from 'react';
import { LOGO_URL, NAV_LINKS } from '../data/site';

export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(36,26,23,0.06)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <img alt="Dev Ratna Diner Logo" className="h-10 w-10 rounded-full object-cover bg-white shadow-sm" src={LOGO_URL} />
          <a className="flex flex-col" href="#home">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Dev Ratna</span>
            <span className="font-caption text-caption text-center text-secondary uppercase tracking-widest">Diner </span>
          </a>
        </div>

        <nav className="hidden xl:flex items-center gap-10">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={
                i === 0
                  ? 'transition-colors text-secondary font-semibold'
                  : 'font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors'
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <a
            className="hidden md:inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-container px-space-md py-space-sm rounded-lg hover:bg-surface-container transition-colors"
            href="tel:+918439356155"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
            <span>+91 8439356155</span>
          </a>
          <button
            type="button"
            onClick={onOrder}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 font-label-lg text-label-lg text-on-secondary bg-secondary hover:bg-secondary-container hover:text-on-secondary-container px-space-lg h-10 rounded-lg shadow-[0_4px_12px_rgba(159,65,32,0.2)] transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Request for Order
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button
            aria-label="Toggle Navigation"
            className="xl:hidden p-space-sm text-on-surface hover:bg-surface-container rounded-lg flex items-center justify-center"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-[24px]">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden bg-surface border-t border-surface-container px-gutter py-space-md flex flex-col gap-3 shadow-lg">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container px-space-md py-space-sm rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOrder?.();
            }}
            className="mt-2 inline-flex items-center justify-center gap-1.5 font-label-lg text-label-lg text-on-secondary bg-secondary px-space-lg h-10 rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Request for Order
          </button>
        </nav>
      )}
    </header>
  );
}
