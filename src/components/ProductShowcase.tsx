"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Scaling } from "lucide-react";
import Image from "next/image";

interface ProductShowcaseProps {
  className?: string;
}

export default function ProductShowcase({ className }: ProductShowcaseProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const secondaryProducts = [
  {
    id: "energy-water",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-10-26-024527-1762368573184.png",
    alt: "Caffiq Energy Water - For Workouts & Workdays",
    title: "Energy Water",
    description: "For Workouts & Workdays"
  },
  {
    id: "caffeine-gum",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-10-26-025656-1762368573430.png",
    alt: "Caffiq Caffeine Gum - For Exams & Everything Else",
    title: "Caffeine Gum",
    description: "For Exams & Everything Else"
  }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`py-20 lg:py-32 bg-gradient-to-b from-[#F9FAFB] via-[#EFFFF8] to-[#F9FAFB] ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16">

          {/* Secondary Products Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-[#00B386] mb-3">
                <Scaling className="h-5 w-5" />
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">The Ecosystem</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                The Ecosystem
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {secondaryProducts.map((product, index) =>
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="relative group cursor-pointer">

                  <div className="relative bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm transition-all duration-300 group-hover:shadow-lg">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#00B386]/5 to-[#4DB6E5]/5" />
                    
                    {/* Product Image */}
                    <div className="relative mb-4">
                      <div className="aspect-square w-full max-w-xs mx-auto p-4">
                        <Image
                          src={product.image}
                          alt={product.alt}
                          width={400}
                          height={400}
                          priority={index === 0}
                          quality={90}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 20rem, 20rem"
                          className="w-full h-full object-contain rounded-xl transition-all duration-300"
                          style={{
                            filter: hoveredProduct === product.id ?
                            'brightness(1.03) contrast(1.03)' :
                            'brightness(1) contrast(1)'
                          }} />
                        
                        {/* Subtle Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/40 rounded-xl pointer-events-none" />
                      </div>
                      
                      {/* Shadow Under Image */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/5 rounded-full blur-md" />
                    </div>
                    
                    {/* Product Info */}
                    <div className="text-center space-y-2 relative z-10">
                      <h4 className="font-heading font-semibold text-lg text-foreground">
                        {product.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}