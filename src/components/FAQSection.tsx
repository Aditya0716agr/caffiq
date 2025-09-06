"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is Caffiq safe to use daily?",
    answer: "Absolutely. Caffiq is formulated with natural caffeine and carefully selected ingredients that are safe for daily consumption. Each piece contains the equivalent caffeine of a cup of coffee, so we recommend no more than 4 pieces per day."
  },
  {
    question: "When will Caffiq be available for purchase?",
    answer: "We're launching in Q2 2024! Join our waitlist to be among the first to experience Caffiq and receive exclusive early access pricing. Waitlist members will be notified 48 hours before our public launch."
  },
  {
    question: "How much caffeine is in each piece?",
    answer: "Each piece of Caffiq contains 80mg of natural caffeine - equivalent to a standard cup of coffee. The caffeine is absorbed through your mouth for faster energy delivery than traditional coffee or energy drinks."
  },
  {
    question: "What makes Caffiq different from energy drinks?",
    answer: "Caffiq delivers energy in 5 minutes versus 20-30 minutes for drinks. No sugar crashes, no calories, and completely portable. Plus, the act of chewing naturally increases alertness and focus through improved blood flow to the brain."
  },
  {
    question: "Can I take Caffiq with other caffeine products?",
    answer: "We recommend monitoring your total daily caffeine intake. If you're sensitive to caffeine or consume other caffeinated products, start with half a piece to assess your tolerance. Always consult your healthcare provider if you have concerns."
  },
  {
    question: "How long does the energy boost last?",
    answer: "Most users experience sustained energy for 3-4 hours without the crash associated with sugary energy drinks. The natural caffeine provides smooth, consistent energy that gradually tapers off rather than dropping suddenly."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [clickedItem, setClickedItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setClickedItem(index);
    setTimeout(() => setClickedItem(null), 200);
    
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-background via-card/10 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 text-accent-foreground mb-4">
              <HelpCircle className="h-6 w-6" />
              <span className="text-sm font-medium tracking-wider uppercase">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Caffiq and how it can transform your daily energy routine.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {faqData.map((item, index) => {
              const isOpen = openItems.has(index);
              const isClicked = clickedItem === index;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  layout
                  className="relative group"
                >
                  {/* Background Glow Effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-accent-foreground/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: isOpen ? 0.3 : 0,
                    }}
                  />
                  
                  <motion.div
                    className="relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(var(--accent-foreground), 0.3)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                    }}
                    animate={{
                      scale: isClicked ? 0.98 : 1,
                      borderColor: isOpen ? "rgba(var(--accent-foreground), 0.4)" : "rgba(var(--border), 0.4)"
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <motion.button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 md:px-8 md:py-6 text-left flex items-center justify-between gap-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-foreground/20 focus:ring-offset-2 focus:ring-offset-background relative overflow-hidden"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Click Ripple Effect */}
                      <AnimatePresence>
                        {isClicked && (
                          <motion.div
                            className="absolute inset-0 bg-accent-foreground/10 rounded-xl"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>
                      
                      <h3 className="text-lg md:text-xl font-heading text-card-foreground font-medium leading-tight relative z-10">
                        {item.question}
                      </h3>
                      
                      <motion.div 
                        className="flex-shrink-0 relative"
                        animate={{ 
                          rotate: isOpen ? 180 : 0,
                          scale: isClicked ? 0.9 : 1
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Icon Glow */}
                        <motion.div
                          className="absolute inset-0 bg-accent-foreground/20 rounded-full blur-sm"
                          animate={{
                            opacity: isOpen ? 1 : 0,
                            scale: isOpen ? 1.2 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <ChevronDown
                          className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                            isOpen ? 'text-accent-foreground' : 'text-muted-foreground'
                          }`}
                          aria-hidden="true"
                        />
                        
                        {/* Sparkle Effect on Open */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className="absolute -top-1 -right-1"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              <Sparkles className="w-3 h-3 text-accent-foreground" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: "easeOut" },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: "easeIn" },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            className="px-6 pb-5 md:px-8 md:pb-6 border-t border-border/20"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {/* Answer Highlight Bar */}
                            <motion.div
                              className="w-12 h-1 bg-gradient-to-r from-accent-foreground to-blue-500 rounded-full mb-4"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            
                            <motion.p 
                              className="text-muted-foreground leading-relaxed text-base md:text-lg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                            >
                              {item.answer}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            variants={itemVariants}
            className="text-center mt-12 md:mt-16"
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-foreground/10 to-blue-500/10 rounded-lg blur-lg" />
              
              <div className="relative bg-card/40 backdrop-blur-sm border border-border/30 rounded-lg px-6 py-4">
                <p className="text-muted-foreground text-base md:text-lg">
                  Have more questions?{" "}
                  <motion.span 
                    className="text-accent-foreground font-medium cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join our community and get answers from the Caffiq team.
                  </motion.span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}