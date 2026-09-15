import { REVIEWS } from '../data/site';

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-600">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full py-space-2xl bg-surface-container-low text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <div className="inline-flex items-center gap-1 text-amber-600">
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
          </div>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
            What Clement Town Says
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real words from students, travelers, and families who make this diner their daily table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="p-space-lg rounded-2xl bg-surface shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-space-md"
            >
              <div className="space-y-space-sm">
                <Stars />
                <p className="font-body-md text-body-md text-on-surface leading-relaxed italic">{r.text}</p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary font-bold flex items-center justify-center font-label-lg">
                  {r.initials}
                </div>
                <div>
                  <h4 className="font-subhead-md text-subhead-md font-semibold text-on-surface">{r.name}</h4>
                  <span className="font-caption text-caption text-on-surface-variant">{r.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
