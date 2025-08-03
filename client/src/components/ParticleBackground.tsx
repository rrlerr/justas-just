import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  delay: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 9; i++) {
        newParticles.push({
          id: i,
          x: 10 + (i * 10), // Distribute across screen width
          delay: i * 2,
          size: Math.random() * 8 + 4, // Random size between 4-12px
          opacity: Math.random() * 0.3 + 0.1, // Random opacity 0.1-0.4
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            backgroundColor: particle.id % 2 === 0 ? 'var(--electric)' : 'var(--platinum)',
            opacity: particle.opacity,
          }}
          animate={{
            y: [window.innerHeight, -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
