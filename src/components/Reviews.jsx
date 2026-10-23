import { useCallback, useEffect, useRef, useState } from 'react';
import { REVIEWS } from '../data/site';

// Elfsight Google Reviews widget (real reviews). Free-plan limit khatam ho jaye
// ya network/adblock se widget na aaye to neeche ka fallback bilkul isi design
// me render hota hai — custom reviews ke saath. User ko farq nahi dikhta.
const ELFSIGHT_APP_ID = '793ddcc0-af76-4b7d-af1b-b7b60aeb4283';
const ELFSIGHT_BOOT_URL = 'https://core.service.elfsight.com/p/boot/';
const WIDGET_LOAD_TIMEOUT_MS = 9000;

const REVIEW_DATES = ['29 days ago', '2 months ago', '3 weeks ago'];

const GOOGLE_WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJPQXtp-ErCTkRjPY-qjm3cjI';
const FREE_WIDGET_URL =
  'https://elfsight.com/google-reviews-widget/?utm_source=websites&utm_medium=clients&utm_content=google-reviews&utm_campaign=free-widget';

function GoogleGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function GoogleWordmark() {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5">
      <svg
        className="h-[22px] w-auto sm:h-[24px]"
        viewBox="0 0 272 92"
        role="img"
        aria-label="Google"
      >
        <path
          fill="#EA4335"
          d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        />
        <path
          fill="#FBBC05"
          d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        />
        <path
          fill="#4285F4"
          d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
        />
        <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
        <path
          fill="#EA4335"
          d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
        />
        <path
          fill="#4285F4"
          d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
        />
      </svg>
      <span
        className="text-[22px] leading-none tracking-tight text-[#111] sm:text-[24px]"
        style={{ fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}
      >
        Reviews
      </span>
    </div>
  );
}

function RatingStars({ rating = 4.8, size = 24 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative inline-block shrink-0"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <span
              className="material-symbols-outlined absolute inset-0 leading-none"
              style={{ fontSize: size, color: '#D9D9D9', fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap"
                style={{ width: `${fill * 100}%` }}
              >
                <span
                  className="material-symbols-outlined leading-none"
                  style={{ fontSize: size, color: '#FBBC05', fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function StarRow({ size = 18 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="material-symbols-outlined leading-none"
          style={{ fontSize: size, color: '#FCBF02', fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </div>
  );
}

function widgetHasContent(node) {
  if (!node) return false;
  if (node.querySelector('iframe')) return true;
  return node.children.length > 0 && node.getBoundingClientRect().height > 40;
}

// Elfsight carousel ka same look: title, Google header, grey review cards,
// arrows + dots. Reviews wahi custom REVIEWS array se aate hain.
function ReviewsFallback() {
  const trackRef = useRef(null);
  const [expanded, setExpanded] = useState({});
  const [nav, setNav] = useState({ prev: false, next: false, page: 0, pages: 1 });

  const updateNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const width = el.clientWidth || 1;
    setNav({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft < max - 4,
      page: Math.round(el.scrollLeft / width),
      pages: Math.max(1, Math.ceil(el.scrollWidth / width)),
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateNav();
    el.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateNav) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener('scroll', updateNav);
      window.removeEventListener('resize', updateNav);
      ro?.disconnect();
    };
  }, [updateNav]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  const scrollToPage = (page) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="w-full p-4 sm:p-10 font-sans">
      <h3 className="text-center text-[24px] font-bold leading-tight text-[#111]">
        What Our Customers Say
      </h3>

      <div className="mt-5 flex flex-col gap-3 rounded-xl bg-[#F5F5F7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div>
          <GoogleWordmark />
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-[28px] font-semibold leading-none text-[#111] sm:text-[30px]">
              4.8
            </span>
            <RatingStars rating={4.8} size={20} />
            <span className="text-[14px] leading-none text-[#111]/50">(16)</span>
          </div>
        </div>
        <a
          href={GOOGLE_WRITE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 shrink-0 items-center justify-center self-start rounded-full bg-[#006DFF] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#005edb] sm:self-auto"
        >
          Review Us on Google
        </a>
      </div>

      <div className="relative mt-5">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => scrollByPage(-1)}
          className={`absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5F5F7] text-[#111] shadow-sm ring-1 ring-black/5 transition hover:bg-[#dedee0] ${
            nav.prev ? '' : 'pointer-events-none opacity-0'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
        >
          {REVIEWS.map((r, index) => (
            <article
              key={r.name}
              className="flex w-full shrink-0 snap-start flex-col gap-3 rounded-xl bg-[#F5F5F7] p-5 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E4E4E7] text-[15px] font-semibold text-[#3F3F46]">
                    {r.initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white">
                    <GoogleGlyph className="h-[22px] w-[22px]" />
                  </span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[17px] font-semibold leading-6 text-[#111]">
                      {r.name}
                    </span>
                    <span
                      className="material-symbols-outlined shrink-0 text-[16px] leading-none"
                      style={{ color: '#1A73E8', fontVariationSettings: "'FILL' 1" }}
                      aria-label="Verified review"
                    >
                      verified
                    </span>
                  </div>
                  <div className="truncate text-[14px] leading-5 text-[#111]/50">
                    {REVIEW_DATES[index] || r.meta}
                  </div>
                </div>
              </div>

              <StarRow />

              <p
                className={`text-[15px] leading-[1.55] text-[#111] ${
                  expanded[r.name] ? '' : 'line-clamp-3'
                }`}
              >
                {r.text}
              </p>
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [r.name]: !prev[r.name] }))}
                className="self-start text-[14px] font-medium text-[#006DFF] hover:underline"
              >
                {expanded[r.name] ? 'Read less' : 'Read more'}
              </button>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => scrollByPage(1)}
          className={`absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5F5F7] text-[#111] shadow-sm ring-1 ring-black/5 transition hover:bg-[#dedee0] ${
            nav.next ? '' : 'pointer-events-none opacity-0'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>

      {nav.pages > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: nav.pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to reviews page ${i + 1}`}
              onClick={() => scrollToPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === nav.page ? 'w-5 bg-[#111]' : 'w-1.5 bg-[#111]/25'
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <a
          href={FREE_WIDGET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#111]/45 hover:underline"
        >
          Free Google Reviews Widget
        </a>
      </div>
    </div>
  );
}

export default function Reviews() {
  const widgetRef = useRef(null);
  const fallbackLockedRef = useRef(false);
  const [fallback, setFallback] = useState(false);

  // Elfsight free-plan limit / widget deactivation server se pehle hi pata chal jata hai.
  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    (async () => {
      try {
        const url = `${ELFSIGHT_BOOT_URL}?w=${ELFSIGHT_APP_ID}&page=${encodeURIComponent(
          window.location.href,
        )}`;
        const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        const widget = json?.data?.widgets?.[ELFSIGHT_APP_ID];
        if (!widget) return;
        const prefs = widget.preferences || {};
        const unavailable =
          widget.status !== 1 ||
          Number(prefs.disable_widget) === 1 ||
          prefs.display_deactivation === true ||
          Number(widget.percentage || 0) >= 100;
        if (unavailable && alive) {
          fallbackLockedRef.current = true;
          setFallback(true);
        }
      } catch {
        // CORS/network/adblock — neeche ka watchdog fallback sambhal lega.
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  // Widget viewport me aane ke baad 9s tak iframe ka wait. Na aaye to fallback.
  // Boot check fail hua ho (unknown) aur widget late load ho jaye to wapas live.
  useEffect(() => {
    if (fallback && fallbackLockedRef.current) return;
    const node = widgetRef.current;
    if (!node) return;

    if (!fallback) {
      let pollId = null;
      let fallbackTimer = null;

      const stop = () => {
        if (pollId) clearInterval(pollId);
        if (fallbackTimer) clearTimeout(fallbackTimer);
      };

      const startWatch = () => {
        if (pollId) return;
        fallbackTimer = setTimeout(() => {
          if (!fallbackLockedRef.current && !widgetHasContent(widgetRef.current)) {
            setFallback(true);
          }
        }, WIDGET_LOAD_TIMEOUT_MS);
        pollId = setInterval(() => {
          if (widgetHasContent(widgetRef.current)) stop();
        }, 500);
      };

      if (typeof IntersectionObserver === 'undefined') {
        startWatch();
        return stop;
      }

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            startWatch();
            io.disconnect();
          }
        },
        { rootMargin: '300px 0px' },
      );
      io.observe(node);
      return () => {
        io.disconnect();
        stop();
      };
    }

    const recoverId = setInterval(() => {
      if (widgetHasContent(widgetRef.current)) {
        setFallback(false);
        clearInterval(recoverId);
      }
    }, 1500);
    const stopRecover = setTimeout(() => clearInterval(recoverId), 30000);
    return () => {
      clearInterval(recoverId);
      clearTimeout(stopRecover);
    };
  }, [fallback]);

  return (
    <section id="reviews" className="w-full py-space-2xl bg-surface-container-low text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          {/* <div className="inline-flex items-center gap-1 text-amber-600">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
            <span className="font-label-md text-label-md text-on-surface font-bold ml-1.5">
              5.0 Star Rated on Google
            </span>
          </div> */}
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
            What Clement Town Says
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real words from students, travelers, and families who make this diner their daily table.
          </p>
        </div>

        <div className="relative">
          <div ref={widgetRef} className={fallback ? 'hidden' : undefined}>
            <div
              className={`elfsight-app-${ELFSIGHT_APP_ID}`}
              data-elfsight-app-lazy=""
            />
          </div>
          {fallback && <ReviewsFallback />}
        </div>
      </div>
    </section>
  );
}
