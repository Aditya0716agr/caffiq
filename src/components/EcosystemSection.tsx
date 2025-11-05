"use client";

import { motion } from "motion/react";
import { Droplets, Flame } from "lucide-react";

export const EcosystemSection = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#FBFCFD] to-[#F9FAFB]">
      <div className="container max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground tracking-[0.5px] mb-2">
            Two Formats.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00B386] to-[#4DB6E5]">
              Infinite Focus.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Energy Water Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative group">
            <div className="bg-white/80 backdrop-blur border border-[#E5E7EB] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full">
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#00B386] to-[#039a74] text-white shadow-sm">
                  Launching First
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B386]/10 to-[#4DB6E5]/10 flex items-center justify-center mb-6">
                <Droplets className="w-8 h-8 text-[#00B386]" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-3 tracking-[0.5px]">
                💧 Energy Water
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                80mg caffeine. Zero sugar. All refreshment.
              </p>
            </div>
          </motion.div>

          {/* Caffeine Gum Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative group">
            <div className="bg-white/80 backdrop-blur border border-[#E5E7EB] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full">
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground shadow-sm">
                  Coming Soon
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 flex items-center justify-center mb-6">
                <Flame className="w-8 h-8 text-[#FF6B6B]" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-3 tracking-[0.5px]">
                🔥 Caffeine Gum
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                50mg caffeine. Pocket-sized. Pure power.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12">
          <p className="text-base md:text-lg text-foreground/70 font-medium">
            Subscribe to both. Never run out of energy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
