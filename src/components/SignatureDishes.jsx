import { SIGNATURE_DISHES } from '../data/site';

export default function SignatureDishes() {
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
              The iconic plates that made Dev Ratna Diner Clement Town&apos;s beloved table.
            </p>
          </div>
          <div>
            <a
              className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-secondary hover:text-primary-container transition-colors"
              href="#menu-catalog"
            >
              <span>Explore All 100+ Dishes</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_DISHES.map((d) => (
            <div
              key={d.name}
              className="group rounded-2xl bg-surface-container-low overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-surface-container">
                  <img
                    alt={d.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={d.img}
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${d.badgeStyle} text-white font-caption text-caption flex items-center gap-1 shadow-sm`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> {d.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-container/90 text-surface-bright font-label-md text-label-md backdrop-blur-sm">
                    {d.price}
                  </span>
                </div>
                <div className="p-space-md space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">{d.name}</h3>
                    <span className="font-caption text-caption text-on-tertiary-container bg-tertiary-fixed/50 px-2 py-0.5 rounded">
                      {d.tag}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{d.desc}</p>
                </div>
              </div>
              <div className="p-space-md pt-0 flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-medium">{d.foot}</span>
                <a
                  className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-primary-container transition-colors"
                  href="tel:+918439356155"
                  title="Order via Phone"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
