const PARATHA_PICKS = [
  { name: 'Aloo Pyaz Paratha', price: '₹50', note: 'Spiced potato & onion' },
  { name: 'Gobhi Paratha', price: '₹60', note: 'With white butter' },
  { name: 'Paneer Paratha', price: '₹80', note: 'Spiced paneer stuffing' },
];

export default function TodaysSpecial() {
  return (
    <section id="todays-special" className="w-full py-space-2xl bg-primary-container text-surface-bright relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 space-y-space-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-tertiary-fixed font-caption text-caption uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-secondary-container">whatshot</span>
              What&apos;s Cooking Today • Limited Batches
            </div>
            <h2 className="font-display-hero text-headline-lg sm:text-display-hero font-bold tracking-tight text-surface-bright leading-tight">
              Tawa-Fresh Stuffed Parathas <br className="hidden sm:block" />
              <span className="italic text-secondary-container">Aloo Pyaz • Gobhi • Paneer</span>
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-high/90 leading-relaxed max-w-xl">
              Rolled fresh every morning and roasted on the hot tawa with desi ghee. Served with white butter, fresh
              curd &amp; homemade pickle — best paired with a kulhad of kadak chai.
            </p>
            <div className="rounded-xl bg-surface-container-highest/10 max-w-lg divide-y divide-surface-container-highest/10">
              {PARATHA_PICKS.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-space-md px-space-md py-3">
                  <div>
                    <p className="font-subhead-md text-subhead-md font-bold text-surface-bright">{p.name}</p>
                    <p className="font-body-sm text-body-sm text-outline-variant">{p.note}</p>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-semibold text-tertiary-fixed whitespace-nowrap">
                    {p.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-highest/10 border-l-4 border-secondary max-w-lg">
              <p className="font-body-sm text-body-sm text-outline-variant italic">
                &quot;Crisp outside, soft inside, and stuffed generously — just like home. Ask for extra white butter on
                top.&quot;
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg"
                href="tel:+918439356155"
              >
                <span className="material-symbols-outlined mr-2 text-[20px]">room_service</span>
                Ask About Today&apos;s Special
              </a>
              <a
                className="inline-flex items-center justify-center px-space-md h-12 rounded-lg bg-surface-container-highest/20 text-surface-bright hover:bg-surface-container-highest/30 font-label-md text-label-md transition-colors"
                href="tel:+918439356155"
              >
                Call for Clement Town Delivery
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high">
              <img
                alt="Tawa-fresh stuffed parathas served with curd and pickle"
                className="w-full h-96 object-cover"
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Aloo_Paratha_with_curd_and_Pickle.jpg?width=800"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 p-space-md rounded-xl bg-secondary text-on-secondary shadow-xl max-w-xs">
              <span className="font-caption text-caption uppercase tracking-wider block text-tertiary-fixed">
                Serving Hours
              </span>
              <p className="font-subhead-md text-subhead-md font-bold">8:30 AM • 11:30 AM Daily</p>
              <span className="font-caption text-caption text-secondary-fixed">Tawa-fresh every morning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
