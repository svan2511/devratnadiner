export default function FinalCta() {
  return (
    <section id="contact" className="w-full py-space-2xl bg-primary-container text-surface-bright relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-gutter text-center space-y-space-lg relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-tertiary-fixed font-caption text-caption uppercase tracking-wider">
          Taste the Tradition
        </span>
        <h2 className="font-display-hero text-headline-lg sm:text-display-hero font-bold tracking-tight text-surface-bright leading-tight">
          Your Table. Your People. <br />
          <span className="italic text-secondary-container">Your Moment.</span>
        </h2>
        <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-2xl mx-auto leading-relaxed">
          Whether you are planning a reunion with old batchmates, an intimate dinner date, or a weekend family feast,
          we are ready to welcome you with hot tandoor breads and genuine warmth.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-sm">
          <a
            className="inline-flex items-center justify-center px-space-xl h-12 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-xl hover:bg-secondary-container hover:text-on-secondary-container transition-all hover:-translate-y-0.5"
            href="#menu-catalog"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">restaurant</span>
            View Complete Menu
          </a>
          <a
            className="inline-flex items-center justify-center px-space-xl h-12 rounded-lg bg-surface-container-highest/20 text-surface-bright font-label-lg text-label-lg hover:bg-surface-bright hover:text-primary-container transition-all"
            href="#location-map"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">near_me</span>
            Get Directions
          </a>
          <a
            className="inline-flex items-center justify-center px-space-lg h-12 rounded-lg text-surface-container-high hover:text-surface-bright font-label-md text-label-md transition-colors"
            href="tel:+918439356155"
          >
            <span className="material-symbols-outlined mr-2 text-secondary-container">call</span>
            Call Now: +91 84393 56155
          </a>
        </div>
      </div>
    </section>
  );
}
