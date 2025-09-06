"use client";

import { motion } from "framer-motion";

const FloatingGeometricElements = () => {
  const elements = [
    // Circles
    { type: "circle", size: "w-32 h-32", x: "10%", y: "20%", duration: 25, delay: 0 },
    { type: "circle", size: "w-20 h-20", x: "80%", y: "60%", duration: 30, delay: 5 },
    { type: "circle", size: "w-40 h-40", x: "60%", y: "10%", duration: 35, delay: 10 },
    { type: "circle", size: "w-16 h-16", x: "25%", y: "80%", duration: 20, delay: 15 },
    
    // Triangles
    { type: "triangle", size: "w-24 h-24", x: "70%", y: "30%", duration: 28, delay: 3 },
    { type: "triangle", size: "w-16 h-16", x: "15%", y: "70%", duration: 32, delay: 8 },
    { type: "triangle", size: "w-28 h-28", x: "85%", y: "15%", duration: 22, delay: 12 },
    
    // Hexagons
    { type: "hexagon", size: "w-20 h-20", x: "40%", y: "25%", duration: 26, delay: 6 },
    { type: "hexagon", size: "w-24 h-24", x: "90%", y: "75%", duration: 24, delay: 14 },
    { type: "hexagon", size: "w-18 h-18", x: "5%", y: "45%", duration: 29, delay: 2 }
  ];

  const getShapeClasses = (type: string) => {
    switch (type) {
      case "circle":
        return "rounded-full bg-gradient-to-br from-[#00e0d5]/5 to-blue-500/3";
      case "triangle":
        return "rotate-45 bg-gradient-to-br from-purple-500/4 to-[#00e0d5]/3";
      case "hexagon":
        return "rotate-12 bg-gradient-to-br from-blue-500/4 to-purple-400/3";
      default:
        return "";
    }
  };

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${getShapeClasses(element.type)} opacity-20`}
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </>
  );
};

const AnimatedGrid = () => {
  const gridPoints = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i % 10) * 10 + 5,
    y: Math.floor(i / 10) * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern
            id="grid"
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
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Pulsing grid points */}
      {gridPoints.map((point) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 bg-[#00e0d5] rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: point.id * 0.1,
          }}
        />
      ))}
    </div>
  );
};

const GradientOrbs = () => {
  const orbs = [
    {
      size: "w-96 h-96",
      gradient: "bg-gradient-radial from-[#00e0d5]/8 via-blue-500/4 to-transparent",
      x: "-10%",
      y: "20%",
      duration: 45,
      delay: 0,
    },
    {
      size: "w-80 h-80",
      gradient: "bg-gradient-radial from-purple-500/6 via-[#00e0d5]/3 to-transparent",
      x: "70%",
      y: "50%",
      duration: 50,
      delay: 10,
    },
    {
      size: "w-64 h-64",
      gradient: "bg-gradient-radial from-blue-600/5 via-purple-400/3 to-transparent",
      x: "30%",
      y: "70%",
      duration: 40,
      delay: 20,
    },
    {
      size: "w-72 h-72",
      gradient: "bg-gradient-radial from-[#00e0d5]/7 to-transparent",
      x: "80%",
      y: "10%",
      duration: 55,
      delay: 15,
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
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
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

const ParticleSystem = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 20,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#00e0d5] rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

export const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Animated Grid Pattern */}
      <AnimatedGrid />
      
      {/* Gradient Orbs - Bottom Layer */}
      <GradientOrbs />
      
      {/* Floating Geometric Elements */}
      <FloatingGeometricElements />
      
      {/* Particle System - Top Layer */}
      <ParticleSystem />
      
      {/* Additional ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-[#00e0d5]/2 to-transparent opacity-30"
        animate={{
          opacity: [0.1, 0.3, 0.1],
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