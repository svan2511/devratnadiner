import { IMAGES } from '../data/site';

export default function Gallery() {
  return (
    <section id="gallery" className="w-full py-space-2xl bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-xl">
            <span className="font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
              The Ambience
            </span>
            <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
              A Taste of Dev Ratna
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Come hungry. Leave happy. From quiet candlelit corners to cheerful laughter across long shared tables.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-secondary text-[20px]">photo_camera</span>
            <span>
              Share your memories: <strong className="text-on-surface font-semibold">@devratnadiner</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-space-md auto-rows-[220px]">
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group shadow-md">
            <img
              alt="Dev Ratna Diner dining hall bathed in warm candlelight and lanterns"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={IMAGES.heroBg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-6 left-6 text-surface-bright">
              <span className="font-caption text-caption text-tertiary-fixed tracking-widest uppercase block">
                Atmosphere
              </span>
              <h3 className="font-headline-md text-headline-md font-semibold">Warm Pine Wood &amp; Candlelight</h3>
              <p className="font-body-sm text-body-sm text-outline-variant">
                A comforting retreat from the bustling college corridor.
              </p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden relative group shadow-md">
            <img
              alt="Dal Makhani with swirled cream in copper handi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={IMAGES.dalMakhani}
            />
            <div className="absolute inset-0 bg-primary-container/30 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute bottom-3 left-3 text-surface-bright">
              <p className="font-label-md text-label-md font-semibold">Heritage Recipes</p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden relative group shadow-md">
            <img
              alt="Freshly charred paneer tikka skewers on wooden platter"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={IMAGES.story}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-surface-bright">
              <span className="font-caption text-caption text-tertiary-fixed tracking-widest uppercase block">
                Live Tandoor
              </span>
              <p className="font-subhead-md text-subhead-md font-semibold">Charred to Perfection</p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden relative group shadow-md">
            <img
              alt="Students sharing food together"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={IMAGES.students}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-surface-bright">
              <p className="font-label-md text-label-md font-semibold">Student Hangout Zone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
