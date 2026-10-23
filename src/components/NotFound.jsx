import { useEffect } from 'react';
import { LOGO_URL } from '../data/site';
import { ORDER_PHONE_DISPLAY } from '../utils/order';

const QUICK_LINKS = [
  { label: 'Full Menu', href: '/#menu-catalog' },
  { label: 'Signature Dishes', href: '/#signature-dishes' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Find Us', href: '/#location-map' },
];

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page Not Found • Dev Ratna Diner';

    const robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.getAttribute('content') ?? null;
    robots?.setAttribute('content', 'noindex, follow');

    if (window.location.pathname !== '/404') {
      window.history.replaceState(null, '', '/404');
    }
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots !== null) robots.setAttribute('content', previousRobots);
    };
  }, []);

  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-surface text-on-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-[-12%] h-[460px] w-[460px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-[-18%] h-[540px] w-[540px] rounded-full bg-[#C89B5B]/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/40" />
        <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/25" />
      </div>

      <header className="relative z-10">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-gutter">
          <a href="/" className="flex items-center gap-space-sm">
            <img
              alt="Dev Ratna Diner Logo"
              className="h-10 w-10 rounded-full bg-white object-cover shadow-sm"
              src={LOGO_URL}
            />
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface">
                Dev Ratna
              </span>
              <span className="text-center font-caption text-caption uppercase tracking-widest text-secondary">
                Diner
              </span>
            </span>
          </a>

          <a
            href="tel:+918439356155"
            className="inline-flex h-10 items-center gap-space-xs rounded-lg px-space-md font-label-md text-label-md text-primary-container transition-colors hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
            <span className="hidden sm:inline">{ORDER_PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center px-gutter py-space-xl">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-space-xl lg:grid-cols-[1.05fr_0.95fr] lg:gap-space-2xl">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C89B5B]/40 bg-[#C89B5B]/10 px-4 py-1.5 font-label-md text-label-md uppercase tracking-[0.18em] text-[#8a6631]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C89B5B]" />
              404 · Off the Menu
            </span>

            <h1
              className="mt-space-md bg-gradient-to-br from-[#241a17] via-[#9f4120] to-[#C89B5B] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(5.5rem, 16vw, 10rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
              }}
            >
              404
            </h1>

            <h2 className="mt-space-md font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
              This page isn’t on our menu.
            </h2>
            <p className="mx-auto mt-space-sm max-w-xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant lg:mx-0">
              The dish you’re looking for may have been moved, renamed, or never existed. Let’s get
              you back to something warm and delicious.
            </p>

            <div className="mt-space-xl flex flex-col items-center gap-space-sm sm:flex-row lg:justify-start">
              <a
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-space-lg font-label-lg text-label-lg text-on-secondary shadow-[0_10px_25px_-8px_rgba(159,65,32,0.55)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container hover:text-on-secondary-container active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                Back to Home
              </a>
              <a
                href="/#menu-catalog"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#C89B5B] px-space-lg font-label-lg text-label-lg text-on-surface transition-colors hover:bg-[#C89B5B] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                Explore the Menu
              </a>
            </div>

            <div className="mt-space-xl">
              <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
                Popular right now
              </p>
              <div className="mt-space-sm flex flex-wrap justify-center gap-space-sm lg:justify-start">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-surface-container-high bg-surface-container-low px-4 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:border-secondary/40 hover:text-secondary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute inset-0 rounded-full bg-secondary/5 blur-2xl" />
            <div className="relative flex aspect-square flex-col items-center justify-center rounded-full border border-outline-variant/70 bg-surface-container-low shadow-[0_30px_70px_-30px_rgba(36,26,23,0.35)]">
              <div className="absolute inset-5 rounded-full border border-dashed border-[#C89B5B]/50" />
              <div className="absolute inset-10 rounded-full border border-outline-variant/50" />
              <div className="relative flex flex-col items-center px-10 text-center">
                <img
                  alt="Dev Ratna Diner Logo"
                  className="h-20 w-20 rounded-full bg-white object-cover shadow-md"
                  src={LOGO_URL}
                />
                <p className="mt-space-md font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Dev Ratna Diner
                </p>
                <p className="mt-1 font-caption text-caption uppercase tracking-[0.18em] text-on-surface-variant">
                  Clement Town · Dehradun
                </p>
                <div className="mt-space-sm flex items-center gap-1 text-[#C89B5B]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="mt-space-md rounded-full bg-emerald-800/10 px-4 py-1 font-label-md text-label-md uppercase tracking-[0.14em] text-emerald-900">
                  100% Pure Veg
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-outline-variant/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-gutter py-space-md font-body-sm text-body-sm text-on-surface-variant sm:flex-row">
          <p>© {new Date().getFullYear()} Dev Ratna Diner. All rights reserved.</p>
          <p>Society Area, Clement Town, Dehradun · {ORDER_PHONE_DISPLAY}</p>
        </div>
      </footer>
    </main>
  );
}
