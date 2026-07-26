const trustedLogos = [
  { name: "Homoeopathy360", text: "Homoeopathy360" },
  { name: "Lybrate", text: "lybrate" },
  { name: "HealthSite", text: "HealthSite.com" },
  { name: "JustDial", text: "JustDial" },
  { name: "Practo", text: "•practo•" },
];

export function TrustedBy() {
  return (
    <section className="border-t border-b border-border/40 bg-white py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          As Featured In / Trusted By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {trustedLogos.map((logo) => (
            <span
              key={logo.name}
              className="text-lg font-bold text-muted-foreground/50 transition-colors hover:text-[var(--color-navy)]/70 md:text-xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {logo.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
