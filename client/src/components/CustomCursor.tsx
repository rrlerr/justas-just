import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Track mouse movement
    window.addEventListener('mousemove', updateMousePosition);

    // Track hover states on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .magnetic-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-[var(--electric)] pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 4,
        y: mousePosition.y - 4,
        scale: isHovering ? 3 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
      style={{
        backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.8)' : 'rgba(0, 212, 255, 0.6)',
      }}
    />
  );
}
