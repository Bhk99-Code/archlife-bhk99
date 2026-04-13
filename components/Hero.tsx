'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background Grid */}
      <motion.div 
        className="absolute inset-0"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-primary-500/20" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex h-full items-center justify-center px-4"
      >
        <div className="max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-2 text-sm font-medium text-primary-400">
              International Architecture Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Building the{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              future
            </span>
            <br />
            of architecture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-12 max-w-3xl text-lg text-neutral-300 md:text-xl"
          >
            Your vision. Our expertise. World-class architectural designs delivered globally.
            From concept to completion, we transform spaces into extraordinary experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/submit-project"
              className="group relative overflow-hidden rounded-full bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/50"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border-2 border-neutral-700 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:border-primary-500 hover:bg-primary-500/10"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-neutral-800 pt-12"
          >
            <div>
              <div className="text-4xl font-bold text-primary-500">250+</div>
              <div className="mt-2 text-sm text-neutral-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500">35+</div>
              <div className="mt-2 text-sm text-neutral-400">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500">98%</div>
              <div className="mt-2 text-sm text-neutral-400">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-500">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-12 w-6 rounded-full border-2 border-neutral-700 p-1"
          >
            <div className="h-2 w-2 rounded-full bg-primary-500" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
