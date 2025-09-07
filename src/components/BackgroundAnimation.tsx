"use client";

import { motion } from "framer-motion";

// Subtle floating particles
const EnergyParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 15,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#00e0d5]/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

// Subtle ambient orbs
const AmbientOrbs = () => {
  const orbs = [
    {
      size: "w-96 h-96",
      gradient: "bg-gradient-radial from-[#00e0d5]/3 to-transparent",
      x: "10%",
      y: "20%",
      duration: 20,
      delay: 0,
    },
    {
      size: "w-80 h-80",
      gradient: "bg-gradient-radial from-[#00e0d5]/2 to-transparent",
      x: "80%",
      y: "60%",
      duration: 25,
      delay: 8,
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
            x: [0, 20, -15, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
};

// Minimal grid pattern
const SubtleGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="subtleGrid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 100 0 L 0 0 0 100"
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

// Minimal floating shapes
const FloatingShapes = () => {
  const shapes = [
    { type: "circle", size: "w-16 h-16", x: "15%", y: "25%", duration: 15, delay: 0 },
    { type: "circle", size: "w-12 h-12", x: "85%", y: "70%", duration: 18, delay: 5 },
    { type: "circle", size: "w-14 h-14", x: "70%", y: "20%", duration: 20, delay: 8 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} rounded-full bg-[#00e0d5]/8`}
          style={{
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
          }}
        />
      ))}
    </>
  );
};

// Subtle energy waves
const EnergyWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 2 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e0d5]/5 to-transparent"
          style={{
            transform: `translateX(-100%)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            delay: i * 4,
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
        className="absolute inset-0 bg-gradient-radial from-transparent via-[#00e0d5]/1 to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};