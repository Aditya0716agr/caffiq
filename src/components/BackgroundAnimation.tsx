"use client";

import { motion } from "framer-motion";

// Floating energy particles
const EnergyParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 6 + 8,
    delay: Math.random() * 10,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-[#00e0d5]/60 to-blue-400/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.8, 0],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

// Gradient orbs for ambient lighting
const AmbientOrbs = () => {
  const orbs = [
    {
      size: "w-96 h-96",
      gradient: "bg-gradient-radial from-[#00e0d5]/8 via-blue-500/4 to-transparent",
      x: "10%",
      y: "20%",
      duration: 15,
      delay: 0,
    },
    {
      size: "w-80 h-80",
      gradient: "bg-gradient-radial from-blue-500/6 via-[#00e0d5]/3 to-transparent",
      x: "80%",
      y: "60%",
      duration: 18,
      delay: 5,
    },
    {
      size: "w-64 h-64",
      gradient: "bg-gradient-radial from-[#00e0d5]/6 to-transparent",
      x: "50%",
      y: "80%",
      duration: 12,
      delay: 2,
    },
  ];

  return (
    <>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.gradient} rounded-full blur-3xl`}
          style={{
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
};

// Grid pattern
const SubtleGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="subtleGrid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#00e0d5]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtleGrid)" />
      </svg>
    </div>
  );
};

// Floating geometric shapes
const FloatingShapes = () => {
  const shapes = [
    { type: "circle", size: "w-20 h-20", x: "15%", y: "25%", duration: 12, delay: 0 },
    { type: "circle", size: "w-16 h-16", x: "85%", y: "70%", duration: 15, delay: 3 },
    { type: "circle", size: "w-24 h-24", x: "70%", y: "20%", duration: 18, delay: 6 },
    { type: "circle", size: "w-18 h-18", x: "25%", y: "75%", duration: 14, delay: 2 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} rounded-full bg-gradient-to-br from-[#00e0d5]/15 to-blue-500/8`}
          style={{
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </>
  );
};

// Energy wave effect
const EnergyWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e0d5]/10 to-transparent"
          style={{
            transform: `translateX(-100%)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

export const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Subtle grid pattern */}
      <SubtleGrid />
      
      {/* Ambient gradient orbs */}
      <AmbientOrbs />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Energy particles */}
      <EnergyParticles />
      
      {/* Energy waves */}
      <EnergyWaves />
      
      {/* Overall ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-[#00e0d5]/3 to-transparent"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};