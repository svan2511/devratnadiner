import { LOGO_URL } from '../data/site';

const EXPLORE_LINKS = [
  { label: 'Our Clement Town Heritage', href: '#about' },
  { label: 'Seasonal À La Carte', href: '#menu-catalog' },
  { label: "Chef's Recommendations", href: '#signature-dishes' },
  { label: 'Tasting Experiences', href: '#todays-special' },
  { label: 'Veranda & Conservatory', href: '#gallery' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary-container text-surface-container-high py-space-2xl">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-2xl">
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img alt="Dev Ratna Diner Logo" className="h-10 w-10 rounded-full object-cover bg-white shadow-sm" src={LOGO_URL} />
              <span className="font-headline-sm text-headline-sm text-surface-bright font-semibold">
                Dev Ratna Diner
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed">
              An elevated neighborhood bistro rooted in Clement Town, Dehradun. Blending timeless Garhwali warmth,
              heritage recipes, and contemporary Himalayan gastronomy.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <a
                aria-label="Reviews"
                className="w-9 h-9 rounded-full bg-surface-container-highest/10 hover:bg-secondary hover:text-on-secondary text-surface-container-high flex items-center justify-center transition-colors"
                href="#reviews"
              >
                <span className="material-symbols-outlined text-[18px]">reviews</span>
              </a>
              <a
                aria-label="Photo Gallery"
                className="w-9 h-9 rounded-full bg-surface-container-highest/10 hover:bg-secondary hover:text-on-secondary text-surface-container-high flex items-center justify-center transition-colors"
                href="#gallery"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="Location"
                className="w-9 h-9 rounded-full bg-surface-container-highest/10 hover:bg-secondary hover:text-on-secondary text-surface-container-high flex items-center justify-center transition-colors"
                href="#location-map"
              >
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </a>
            </div>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-subhead-lg text-subhead-lg text-surface-bright">Explore</h3>
            <ul className="space-y-3.5">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label} className="font-body-sm text-body-sm">
                  <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-subhead-lg text-subhead-lg text-surface-bright">Visit Us</h3>
            <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed">
              Society Area, Behind Sakshi Electronics,
              <br />
              Clement Town, Dehradun, Uttarakhand 248002
            </p>
            <div className="font-body-sm text-body-sm text-outline-variant space-y-1">
              <p>
                <span className="text-surface-bright font-medium">Lunch:</span> 12:00 PM – 4:00 PM
              </p>
              <p>
                <span className="text-surface-bright font-medium">Dinner:</span> 7:00 PM – 11:30 PM
              </p>
              <p className="text-tertiary-fixed-dim pt-space-xs font-caption text-caption">Open All Seven Days</p>
            </div>
            <a
              className="inline-block font-label-md text-label-md text-secondary-fixed-dim hover:text-surface-bright transition-colors"
              href="tel:+918439356155"
            >
              Direct: +91 8439356155
            </a>
          </div>

          <div className="space-y-space-md">
            <h3 className="font-subhead-lg text-subhead-lg text-surface-bright">Table &amp; Stories</h3>
            <p className="font-body-sm text-body-sm text-outline-variant">
              Receive notes on seasonal harvests, regional recipes, and quiet bistro evenings.
            </p>
            <div className="flex flex-col gap-space-xs">
              <input
                className="w-full h-11 px-space-md rounded-lg bg-surface-container-highest/15 text-surface-bright placeholder:text-outline text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="w-full h-10 rounded-lg bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary font-label-md text-label-md transition-colors"
                type="button"
              >
                Join the Table
              </button>
            </div>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-outline-variant font-caption text-caption">
          <p>© 2025 Dev Ratna Diner. All culinary rights reserved.</p>
          <div className="flex items-center gap-8">
            <a className="hover:text-surface-bright transition-colors" href="#home">
              Privacy Policy
            </a>
            <a className="hover:text-surface-bright transition-colors" href="#home">
              Terms of Hospitality
            </a>
            <a className="hover:text-surface-bright transition-colors" href="#location-map">
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
