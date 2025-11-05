"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "ecosystem",
    question: "What's the ecosystem?",
    answer: "Two products, one brand. Caffeine water for hydration + energy. Caffeine gum for portable focus. Use them solo or together."
  },
  {
    id: "timeline",
    question: "When do I get what?",
    answer: "Water ships first (Month 0-3). Gum follows later (Month 9-12). Waitlist members get priority access to both."
  },
  {
    id: "options",
    question: "Can I just get one?",
    answer: "Yep! Buy water only, gum only, or subscribe to the full ecosystem for 15% off."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Everything you need to know about{" "}
            <span className="text-transparent bg-gradient-to-r from-[#00B386] to-[#4DB6E5] bg-clip-text">
              Caffiq
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get answers to the most frequently asked questions about our revolutionary energy ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-0"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={faq.id} 
                  className="border border-[#E5E7EB] rounded-xl bg-white hover:bg-white transition-all duration-300 px-6 py-2 shadow-sm hover:shadow-md"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-6">
                    <span className="text-lg font-semibold text-foreground group-hover:text-[#00B386] transition-colors duration-300">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent mb-4" />
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <button className="bg-[#00B386] text-white px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md hover:bg-[#00aa7b] transform hover:scale-105 transition-all duration-300">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};