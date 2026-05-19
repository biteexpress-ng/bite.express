import { Container } from "@/components/ui/container";

type Props = {
  title: string;
  items: string[];
};

export function PartnerTrustStrip({ title, items }: Props) {
  return (
    <section className="border-y border-ink-200 bg-white py-8">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md text-sm font-medium uppercase text-ink-500">
            {title}
          </p>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-5">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3 text-center font-serif text-lg tracking-normal text-ink-700 grayscale"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
