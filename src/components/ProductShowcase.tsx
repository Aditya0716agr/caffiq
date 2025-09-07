"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Scale3d, Scaling, Package2 } from "lucide-react";

interface ProductShowcaseProps {
  className?: string;
}

export default function ProductShowcase({ className }: ProductShowcaseProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const primaryProducts = [
  {
    id: "blister-main",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757197530710-fz56nttjvzv.png",
    alt: "Caffiq Energy Gum - Premium black box with blue caffeinated gum tablets",
    title: "Caffiq",
    description: "India's first sugar-free caffeinated gum"
  }];


  const secondaryProducts = [
  {
    id: "blister-pack",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757197530710-fz56nttjvzv.png",
    alt: "Caffiq Energy Gum - Blister pack and sleek black pouch packaging",
    title: "Premium Packaging",
    description: "Blister pack & travel pouch design"
  },
  {
    id: "box-display",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757197526116-13q1hyzigul.png",
    alt: "Caffiq Energy Gum - Elegant black box with premium branding",
    title: "Luxury Box",
    description: "Premium black box with metallic accents"
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

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className={`py-20 lg:py-32 bg-gradient-to-b from-background via-card/20 to-background ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16">

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-accent-foreground mb-4">
              <Package2 className="h-6 w-6" />
              <span className="text-sm font-medium tracking-wider uppercase">Product Showcase</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Premium Design
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of focus enhancement with our meticulously crafted packaging
            </p>
          </motion.div>

          {/* Primary Product Display */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-accent-foreground/10 to-purple-900/20 rounded-3xl blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-foreground/5 to-transparent rounded-3xl !w-5 !h-[548px]" />
              
              {primaryProducts.map((product) =>
              <motion.div
                key={product.id}
                animate={floatAnimation}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="relative group cursor-pointer">

                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-accent-foreground/20 via-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shadow */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/20 rounded-full blur-xl" />
                    
                    {/* Product Image */}
                    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                      <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-accent-foreground/20"
                      style={{
                        filter: hoveredProduct === product.id ?
                        'brightness(1.1) contrast(1.1) saturate(1.2)' :
                        'brightness(1) contrast(1) saturate(1)'
                      }} />

                      
                      {/* Reflection Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-2xl" />
                      
                      {/* Hover Indicators */}
                      <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        scale: hoveredProduct === product.id ? 1 : 0.8
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-6 -right-6 bg-accent-foreground text-card p-2 rounded-full shadow-lg">

                        <Scale3d className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Secondary Products Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent-foreground mb-4">
                <Scaling className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wider uppercase">Multiple Angles</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-semibold">
                Detailed Product Views
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="relative group cursor-pointer">

                  <div className="relative bg-card/30 rounded-2xl p-6 border border-border/20 backdrop-blur-sm">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-foreground/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Product Image */}
                    <div className="relative mb-4">
                      <div className="aspect-square w-full max-w-xs mx-auto">
                        <img
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
                        style={{
                          filter: hoveredProduct === product.id ?
                          'brightness(1.05) contrast(1.05)' :
                          'brightness(1) contrast(1)'
                        }} />

                        
                        {/* Subtle Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-xl" />
                      </div>
                      
                      {/* Shadow Under Image */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 rounded-full blur-md" />
                    </div>
                    
                    {/* Product Info */}
                    <div className="text-center space-y-2 relative z-10">
                      <h4 className="font-heading font-semibold text-lg">
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