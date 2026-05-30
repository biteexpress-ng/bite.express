import { Container } from "@/components/ui/container";

export function PartnerTrustStrip() {
  return (
    <section className="bg-white pb-16 pt-8">
      <Container className="max-w-[1400px]">
        <div className="border-t border-dashed border-[#e5e5e5] pt-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Text */}
            <div className="flex-shrink-0">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
                TRUSTED BY THOUSANDS
              </h3>
              <p className="mt-2 text-[15px] font-bold text-[#1a1a1a]">
                Loved by customers. Powered by partners.
              </p>
            </div>

            {/* Right Logos */}
            <div className="flex flex-wrap items-center justify-start gap-8 opacity-60 grayscale sm:justify-end lg:gap-12 xl:gap-16">
              {/* Cold Stone */}
              <div className="font-serif text-[22px] font-bold italic tracking-tight text-[#333]">
                Cold Stone
              </div>
              {/* SPAR */}
              <div className="flex items-center gap-1.5 font-sans text-[26px] font-black uppercase tracking-tighter text-[#333]">
                SPAR
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-[#333]">
                  <div className="mb-0.5 h-2 w-2 rounded-sm bg-[#333] rotate-45"></div>
                </div>
              </div>
              {/* Medplus */}
              <div className="font-sans text-[22px] font-bold tracking-tight text-[#333]">
                Medplus+
              </div>
              {/* Domino's */}
              <div className="flex items-center gap-1.5 font-sans text-[22px] font-bold tracking-tight text-[#333]">
                <div className="grid h-5 w-5 grid-cols-2 gap-0.5 rotate-45">
                  <div className="rounded-[2px] bg-[#333]"></div>
                  <div className="rounded-[2px] bg-[#333]"></div>
                  <div className="col-span-2 rounded-[2px] bg-[#333]"></div>
                </div>
                Domino&apos;s
              </div>
              {/* ShopRite */}
              <div className="font-serif text-[26px] font-bold italic tracking-tight text-[#333]">
                ShopRite
              </div>
              {/* Mobil */}
              <div className="font-sans text-[26px] font-black tracking-tight text-[#333]">
                Mobil
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
