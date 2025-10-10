import { FAQ } from "../../types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <Badge variant="secondary">FAQ</Badge>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Domande frequenti
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
