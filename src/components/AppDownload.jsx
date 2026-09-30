import { APP_APK_URL, APP_VERSION, LOGO_URL } from '../data/site';

const PERKS = [
  { icon: 'my_location', title: 'GPS delivery', text: 'Live location pe exact ghar tak khana' },
  { icon: 'payments', title: 'Instant payment', text: 'UPI / cards se 1-tap Razorpay checkout' },
  { icon: 'notifications_active', title: 'Live tracking', text: 'Preparing → Out for delivery, har step pe push' },
];

const STEPS = [
  { n: '1', text: 'Download dabao — app.apk save hogi' },
  { n: '2', text: 'Open karo, “Install unknown apps” allow karo' },
  { n: '3', text: 'Install → OTP login → order shuru!' },
];

export default function AppDownload() {
  return (
    <section id="get-app" className="w-full py-space-2xl bg-surface">
      <div className="max-w-6xl mx-auto px-gutter">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container text-surface-bright shadow-2xl">
          {/* glow decor */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-3xl" />

          <div className="relative z-10 grid md:grid-cols-2 gap-space-xl items-center p-space-xl sm:p-space-2xl">
            {/* left — copy + CTA */}
            <div className="space-y-space-md">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-tertiary-fixed font-caption text-caption uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">smartphone</span>
                Dev Ratna App • {APP_VERSION}
              </span>
              <h2 className="font-display-hero text-headline-lg sm:text-display-hero font-bold tracking-tight leading-tight">
                Khana ab <span className="italic text-secondary-container">jeb me.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-surface-container-high/90 leading-relaxed max-w-md">
                Website se order karo ya app se — app pe live tracking, GPS delivery
                aur instant payment ke saath experience aur smooth hai.
              </p>

              <ul className="space-y-space-sm pt-space-xs">
                {PERKS.map((p) => (
                  <li key={p.title} className="flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-full bg-secondary/25 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary-container text-[20px]">{p.icon}</span>
                    </span>
                    <span>
                      <span className="block font-label-lg text-label-lg font-bold">{p.title}</span>
                      <span className="block font-caption text-caption text-surface-container-high/80">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <a
                  href={APP_APK_URL}
                  className="inline-flex items-center justify-center gap-2 px-space-xl h-14 rounded-2xl bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">android</span>
                  Download for Android
                </a>
                <span className="font-caption text-caption text-surface-container-high/70">
                  {APP_VERSION} • Free • ~15 MB
                </span>
              </div>

              <ol className="flex flex-wrap gap-2 pt-space-xs">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-bright/10 font-caption text-caption text-surface-container-high"
                  >
                    <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-primary-container text-[11px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    {s.text}
                  </li>
                ))}
              </ol>
            </div>

            {/* right — phone mockup */}
            <div className="relative flex justify-center py-space-sm" aria-hidden="true">
              <div className="absolute w-72 h-72 rounded-full bg-secondary/25 blur-3xl" />
              <div className="relative w-[250px] sm:w-[270px] rounded-[2.6rem] bg-on-surface p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.45)] rotate-2">
                <div className="rounded-[2rem] bg-background overflow-hidden">
                  {/* notch */}
                  <div className="flex justify-center pt-2">
                    <div className="w-20 h-5 rounded-full bg-on-surface" />
                  </div>
                  {/* mini app UI */}
                  <div className="px-4 pt-3 pb-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <img src={LOGO_URL} alt="" className="w-9 h-9 rounded-full object-cover bg-white" />
                      <div>
                        <p className="font-bold text-[13px] text-on-surface leading-none">Dev Ratna</p>
                        <p className="text-[9px] tracking-[0.2em] text-secondary font-bold">DINER</p>
                      </div>
                      <span className="ml-auto text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        ● OPEN
                      </span>
                    </div>
                    <div className="rounded-2xl bg-primary-container text-surface-bright p-3">
                      <p className="text-[10px] opacity-80">Order #1042 • ₹580</p>
                      <p className="text-[13px] font-bold">Out for delivery 🛵</p>
                      <div className="flex gap-1 mt-2">
                        {[0, 1, 2, 3].map((i) => (
                          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? 'bg-[#25D366]' : 'bg-white/25'}`} />
                        ))}
                      </div>
                    </div>
                    {['Special Veg Thali — ₹250', 'Kadhai Paneer (Full) — ₹240'].map((t) => (
                      <div key={t} className="flex items-center gap-2 rounded-xl bg-surface-container-low px-3 py-2">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        <p className="text-[11px] font-semibold text-on-surface">{t}</p>
                      </div>
                    ))}
                    <div className="rounded-xl bg-secondary py-2.5 text-center text-[12px] font-bold text-on-secondary">
                      Track Order
                    </div>
                  </div>
                </div>
              </div>
              {/* floating badges */}
              <div className="absolute top-6 -left-1 sm:left-2 flex items-center gap-1.5 bg-surface-bright rounded-full pl-1 pr-3 py-1 shadow-xl -rotate-3">
                <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                <span className="text-[11px] font-bold text-on-surface">Payment done ✓</span>
              </div>
              <div className="absolute bottom-8 -right-1 sm:right-2 flex items-center gap-1.5 bg-surface-bright rounded-full pl-1 pr-3 py-1 shadow-xl rotate-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                <span className="text-[11px] font-bold text-on-surface">350m away</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
