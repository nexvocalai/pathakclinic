import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is homoeopathy safe?",
    answer:
      "Yes, homoeopathic medicines are completely safe when prescribed by a qualified practitioner. They are made from natural substances and are highly diluted, making them free from toxic side effects. They can be safely used by people of all ages, including infants, pregnant women, and the elderly.",
  },
  {
    question: "How long does homoeopathic treatment take?",
    answer:
      "The duration of treatment varies depending on the nature and severity of the condition. Acute conditions may show improvement within days, while chronic diseases may require several months of treatment. The advantage is that homoeopathy aims for lasting cure rather than temporary suppression of symptoms.",
  },
  {
    question: "Is homoeopathy suitable for children?",
    answer:
      "Absolutely! Homoeopathy is particularly well-suited for children as the remedies are gentle, sweet-tasting, and free from side effects. It&apos;s effective for common childhood issues like recurrent colds, allergies, behavioral problems, and growth concerns.",
  },
  {
    question: "Can I take homoeopathic medicine with other medications?",
    answer:
      "In most cases, yes. Homoeopathic medicines generally work well alongside conventional treatments. However, it&apos;s important to inform your homoeopathic doctor about any other medications you are taking so they can provide appropriate guidance.",
  },
  {
    question: "Do I need to follow any dietary restrictions during treatment?",
    answer:
      "Some basic guidelines may be recommended, such as avoiding strong-flavored substances like coffee, mint, or camphor around the time of taking your medicine. Your doctor will provide specific instructions based on your individual treatment plan.",
  },
  {
    question: "How are homoeopathic medicines administered?",
    answer:
      "Homoeopathic medicines typically come in the form of small sugar pills (globules), liquid drops, or powders. They are usually taken by placing under the tongue and allowing them to dissolve. The dosage and frequency are determined by your doctor based on your condition.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">FAQs</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Find answers to common questions about homoeopathic treatment and
            what to expect during your healing journey.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
