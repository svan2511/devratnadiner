const FEATURES = [
  {
    icon: 'local_dining',
    title: 'Fresh & Wholesome',
    desc: 'Carefully prepared food using authentic hand-pounded mountain spices, rich slow-simmered gravies, and seasonal Clement Town produce.',
  },
  {
    icon: 'fireplace',
    title: 'Warm & Welcoming',
    desc: 'A cozy sanctuary bathed in candlelight and vintage wood accents, welcoming students, remote workers, and extended family gatherings.',
  },
  {
    icon: 'savings',
    title: 'Generous Value',
    desc: 'Hearty portions, honest university-friendly pricing, and student thali combos that give you uncompromising taste without breaking the wallet.',
  },
  {
    icon: 'mood',
    title: 'Every Mood & Hour',
    desc: 'From morning ginger-cardamom chai with stuffed parathas to celebratory evening biryanis and post-lecture snack meetups.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="w-full py-space-2xl bg-surface-container-low text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <span className="font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
            The Dev Ratna Difference
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
            Why Dine With Us?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Thoughtfully curated cooking, mindful spaces, and a welcoming team that treats you like family every single
            time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-space-lg rounded-2xl bg-surface-container hover:bg-surface-container-lowest transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-space-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">{f.icon}</span>
              </div>
              <h3 className="font-subhead-lg text-subhead-lg font-bold text-on-surface mb-2">{f.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
