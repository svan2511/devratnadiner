import { useRef, useState } from 'react';
import { CATEGORY_LABELS, MENU_ITEMS, MENU_TABS } from '../data/site';

const ITEMS_PER_PAGE = 10;

// Compact page list: [1, …, current-1, current, current+1, …, total]
function getPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('start-ellipsis');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p += 1) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('end-ellipsis');
  pages.push(total);
  return pages;
}

export default function MenuCatalog({ onOrder }) {
  const [active, setActive] = useState('all');
  const [page, setPage] = useState(1);
  const listTopRef = useRef(null);

  const visible = active === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active);
  const totalPages = Math.max(1, Math.ceil(visible.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = visible.slice(start, start + ITEMS_PER_PAGE);
  const end = Math.min(start + ITEMS_PER_PAGE, visible.length);

  const selectTab = (key) => {
    setActive(key);
    setPage(1);
  };

  const goToPage = (p) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    requestAnimationFrame(() => {
      listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="menu-catalog" className="w-full py-space-2xl bg-surface-container-low text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <span className="font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
            100% Pure Veg • As Per Printed Menu Card
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
            Dine-In &amp; Takeaway Menu
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            All {MENU_ITEMS.length} items with prices straight from our restaurant menu card. Double prices (e.g. ₹40 /
            70) mean Half / Full servings.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-5xl mx-auto">
          {MENU_TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => selectTab(t.key)}
                className={
                  isActive
                    ? 'px-4 py-2 rounded-full bg-primary-container text-surface-bright font-label-md text-label-md transition-colors shadow-sm'
                    : 'px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors'
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <p ref={listTopRef} className="text-center font-label-md text-label-md text-on-surface-variant scroll-mt-24">
          Showing {visible.length === 0 ? 0 : start + 1}–{end} of {visible.length}{' '}
          {visible.length === 1 ? 'item' : 'items'}
          {active !== 'all' && CATEGORY_LABELS[active] ? ` in ${CATEGORY_LABELS[active]}` : ''}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 pt-space-md">
          {pageItems.map((item) => (
            <div
              key={item.name}
              className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-colors flex items-start justify-between gap-space-md"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                  <h4 className="font-subhead-lg text-subhead-lg font-bold text-on-surface">{item.name}</h4>
                  {active === 'all' && CATEGORY_LABELS[item.category] && (
                    <span className="font-caption text-caption text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  )}
                </div>
                {item.desc && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">{item.desc}</p>
                )}
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-secondary whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Menu pages" className="flex items-center justify-center gap-3 pt-space-md flex-wrap">
            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="h-10 w-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>

            {getPageList(safePage, totalPages).map((p) =>
              typeof p === 'number' ? (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === safePage ? 'page' : undefined}
                  className={
                    p === safePage
                      ? 'h-10 min-w-10 px-2 rounded-full bg-primary-container text-surface-bright font-label-md text-label-md transition-colors shadow-sm'
                      : 'h-10 min-w-10 px-2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors'
                  }
                >
                  {p}
                </button>
              ) : (
                <span
                  key={p}
                  aria-hidden="true"
                  className="h-10 min-w-8 px-1 flex items-center justify-center text-on-surface-variant font-label-md text-label-md"
                >
                  …
                </span>
              ),
            )}

            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
              className="h-10 w-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </nav>
        )}

        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            type="button"
            onClick={onOrder}
            className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-all"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">shopping_bag</span>
            Request for Order
          </button>
          <a
            className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
            href="tel:+918439356155"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">phone_in_talk</span>
            Call: +91 8439356155
          </a>
        </div>
      </div>
    </section>
  );
}
