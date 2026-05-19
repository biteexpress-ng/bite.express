import {
  Bike,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  PackageCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";

export function PhoneOrderPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[24rem]">
      <div className="premium-shadow relative rounded-[2.5rem] border border-white/15 bg-white/10 p-2 backdrop-blur-2xl">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,107,74,0.18),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(222,22,0,0.2),transparent_28%),linear-gradient(180deg,#111,#030303)]" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative z-10 flex h-full flex-col p-5">
            <div className="mx-auto h-5 w-24 rounded-full bg-white/10 ring-1 ring-white/10" />

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-white shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] uppercase text-white/45">
                    Arriving in
                  </p>
                  <p className="font-serif text-3xl leading-none">18 min</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red text-white">
                  <Navigation size={20} />
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Clock3 size={14} />
                Kitchen pickup complete
              </div>
            </div>

            <div className="relative mt-6 flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40">
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 300 360"
                fill="none"
              >
                <path
                  d="M34 310C81 236 100 194 150 190C210 185 208 91 265 58"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M34 310C81 236 100 194 150 190C210 185 208 91 265 58"
                  stroke="#de1600"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="10 10"
                />
                <circle cx="34" cy="310" r="11" fill="#ff6b4a" />
                <circle cx="265" cy="58" r="11" fill="#de1600" />
              </svg>

              <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-xs text-white/70 backdrop-blur">
                Live route
              </div>
              <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-red shadow-xl">
                <Bike size={22} />
              </div>
              <div className="absolute left-6 top-[52%] flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/25">
                <MapPin size={17} />
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white p-4 text-ink-900 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase text-ink-600">
                    Order card
                  </p>
                  <p className="mt-1 font-serif text-xl leading-none">
                    Mama&apos;s Kitchen
                  </p>
                  <p className="mt-2 text-xs text-ink-600">
                    Jollof rice, suya spice, chilled drink
                  </p>
                </div>
                <PackageCheck className="text-brand-red" size={23} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 text-xs font-semibold text-white"
                >
                  <MessageCircle size={15} />
                  Chat rider
                </button>
                <button
                  type="button"
                  aria-label="Call rider"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-900"
                >
                  <Phone size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Order protected"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-brand-red"
                >
                  <ShieldCheck size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-brand-red/25 blur-3xl"
      />
    </div>
  );
}
