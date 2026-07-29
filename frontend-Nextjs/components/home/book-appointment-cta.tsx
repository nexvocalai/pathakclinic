import Link from "next/link";

export function BookAppointmentCTA() {
  return (
    <section className="bg-[var(--color-navy)] py-10 md:py-14">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Book Your Appointment Today!
          </h2>
          <p className="mt-2 text-white/75 max-w-lg">
            Take the first step towards a healthier, happier you and your family.
          </p>
        </div>
        <Link
          href="/appointment"
          className="shrink-0 rounded-md bg-[var(--color-gold)] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-xl hover:scale-105"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
