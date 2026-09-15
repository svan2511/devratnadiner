const HOURS = [
  { label: 'Breakfast Service', time: '7:30 AM – 11:30 AM' },
  { label: 'Lunch Spread', time: '12:00 PM – 4:00 PM' },
  { label: 'High Tea & Quick Bites', time: '4:00 PM – 7:00 PM' },
  { label: 'Dinner & Tandoor', time: '7:30 PM – 11:00 PM' },
];

export default function Location() {
  return (
    <section id="location-map" className="w-full py-space-2xl bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        <div className="space-y-space-xs">
          <span className="font-caption text-caption uppercase tracking-widest text-secondary font-semibold">
            Directions &amp; Hours
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
            Come Visit Us in Clement Town
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Tucked in Society Area, just behind Sakshi Electronics — easy to find and easy to reach from anywhere in
            Clement Town.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-5 space-y-space-md">
            <div className="p-space-lg rounded-2xl bg-surface-container space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">
                    Open Now • Closes 11:00 PM
                  </span>
                </div>
                <span className="font-caption text-caption text-secondary font-semibold uppercase">7 Days a Week</span>
              </div>
              <div className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
                {HOURS.map((h, i) => (
                  <div
                    key={h.label}
                    className={`flex justify-between py-1 ${
                      i < HOURS.length - 1 ? 'border-b border-surface-container-high' : ''
                    }`}
                  >
                    <span className="text-on-surface font-medium">{h.label}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-space-lg rounded-2xl bg-surface-container-low space-y-space-md">
              <div className="space-y-1">
                <h4 className="font-subhead-lg text-subhead-lg font-bold text-on-surface">Address &amp; Landmark</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Society Area, Behind Sakshi Electronics,
                  <br />
                  Clement Town,
                  <br />
                  Dehradun, Uttarakhand 248002
                </p>
              </div>
              <div className="space-y-space-xs pt-2">
                <div className="flex items-center gap-space-sm text-body-sm font-body-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">phone</span>
                  <a className="text-on-surface hover:text-secondary font-semibold" href="tel:+918439356155">
                    +91 8439356155
                  </a>
                  {/* <span className="text-outline-variant">/</span>
                  <a className="text-on-surface hover:text-secondary font-semibold" href="tel:+911352640000">
                    +91 135 2640000
                  </a> */}
                </div>
                <div className="flex items-center gap-space-sm text-body-sm font-body-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
                  <span className="text-on-surface-variant">hello@devratnadiner.com</span>
                </div>
              </div>
              {/* <div className="pt-space-xs flex gap-space-sm">
                <a
                  className="flex-1 inline-flex items-center justify-center h-11 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                  href="tel:+919897012345"
                >
                  <span className="material-symbols-outlined text-[18px] mr-1.5">call</span>
                  Call for Table
                </a>
                <a
                  className="flex-1 inline-flex items-center justify-center h-11 rounded-lg bg-primary-container text-surface-bright font-label-md text-label-md hover:bg-inverse-surface transition-colors"
                  href="https://www.google.com/maps/search/?api=1&query=Dev+Ratna+Diner+Clement+Town+Dehradun"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="material-symbols-outlined text-[18px] mr-1.5">directions</span>
                  Navigate
                </a>
              </div> */}
            </div>
          </div>

          <div className="lg:col-span-7 h-[440px] rounded-2xl overflow-hidden shadow-lg relative bg-surface-container">
            <iframe
              title="Dev Ratna Diner on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d861.4523188027272!2d77.99456286956804!3d30.271014998425667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092be1a7ed053d%3A0x3272b739aa3ef68c!2sDev%20Ratna%20Diner!5e0!3m2!1sen!2sin!4v1789452772620!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
            {/* <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-space-md rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl text-on-surface space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="font-subhead-md text-subhead-md font-bold">Dev Ratna Diner</span>
              </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Society Area, Behind Sakshi Electronics, Clement Town
                </p>
                <a
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline pt-1"
                  href="https://www.google.com/maps/search/?api=1&query=Dev+Ratna+Diner+Clement+Town+Dehradun"
                rel="noopener"
                target="_blank"
              >
                <span>Open in Google Maps App</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
