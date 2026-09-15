import { IMAGES } from '../data/site';

export default function About() {
  return (
    <section id="about" className="w-full py-space-2xl bg-surface text-on-surface relative">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high">
              <img
                alt="Tandoori delicacies being prepared at Dev Ratna Diner"
                className="w-full h-72 sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                src={IMAGES.story}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3 text-surface-bright">
                <div className="min-w-0">
                  <p className="font-caption text-caption tracking-widest uppercase text-tertiary-fixed">
                    Clement Town Culinary Heritage
                  </p>
                  <h3 className="font-headline-sm text-headline-sm font-semibold">Tandoor &amp; Himalayan Hearth</h3>
                </div>
                <span className="shrink-0 px-3 py-1 rounded-full bg-secondary font-label-md text-label-md text-on-secondary shadow-md">
                  Est. Dehradun
                </span>
              </div>
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-72 h-72 rounded-2xl bg-secondary-fixed/50 -z-0"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-tertiary-fixed/40 blur-2xl -z-0"></div>
          </div>

          <div className="lg:col-span-6 space-y-space-md lg:pl-space-md">
            <div className="inline-flex items-center gap-space-xs font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
              <span className="w-6 h-[2px] bg-secondary"></span>
              Our Story
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight leading-tight">
              A Place Made for Good Food &amp; Good Company.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Nestled in the green calm of Clement Town, just minutes away from Graphic Era University and the quiet
              monasteries, <strong className="text-on-surface font-semibold">Dev Ratna Diner</strong> began with an
              honest promise: to serve unpretentious, soul-stirring food that reminds you of home while treating you to
              exceptional dining.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Whether it’s university students gathering over steaming platters of crispy butter naan and handi dal,
              travelers seeking respite after visiting Mindrolling Monastery, or local Dehradun families celebrating
              milestones, our kitchen honors time-tested North Indian recipes and seasonal hill produce. Every dish is
              seasoned with warmth, patience, and freshly ground valley spices.
            </p>
            <div className="grid grid-cols-2 gap-space-md py-space-sm">
              <div className="p-space-md rounded-xl bg-surface-container">
                <span className="font-headline-md text-headline-md font-bold text-secondary block">100%</span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Fresh Daily Produce &amp; Pure Veg Prep
                </span>
              </div>
              {/* <div className="p-space-md rounded-xl bg-surface-container">
                <span className="font-headline-md text-headline-md font-bold text-primary-container block">15+</span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Years of Collective Culinary Craft
                </span>
              </div> */}
            </div>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center px-space-lg h-11 rounded-lg bg-primary-container text-surface-bright font-label-lg text-label-lg hover:bg-inverse-surface transition-colors shadow-sm"
                href="#menu-catalog"
              >
                Discover Our Menu
              </a>
              {/* <a
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors"
                href="tel:+919897012345"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Reserve via +91 98970 12345</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
