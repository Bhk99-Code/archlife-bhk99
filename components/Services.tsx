'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Ruler, Palette, TreePine } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Residential Design',
    description: 'Luxury homes, villas, and apartments designed to perfection. Every detail crafted for modern living.',
    features: ['Custom Floor Plans', '3D Visualization', 'Interior Integration']
  },
  {
    icon: Ruler,
    title: 'Commercial Spaces',
    description: 'Offices, retail, and hospitality projects that drive business success through intelligent design.',
    features: ['Functional Layouts', 'Brand Identity', 'ROI Optimization']
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description: 'Complete interior solutions that blend aesthetics with functionality for any space.',
    features: ['Furniture Selection', 'Material Palette', 'Lighting Design']
  },
  {
    icon: TreePine,
    title: 'Landscape Architecture',
    description: 'Outdoor spaces that complement your architecture and enhance environmental harmony.',
    features: ['Garden Design', 'Hardscape Planning', 'Sustainable Solutions']
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative bg-white py-24 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary-100 opacity-30 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-neutral-100 opacity-50 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary-600">
            Our Services
          </span>
          <h2 className="mb-6 text-4xl font-bold text-neutral-900 md:text-5xl lg:text-6xl">
            Complete architectural
            <br />
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              solutions worldwide
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            From initial concept to final delivery, we provide end-to-end architectural services
            for clients across the globe.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-neutral-50 p-8 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-xl bg-primary-100 p-4 text-primary-600 transition-all group-hover:bg-primary-500 group-hover:text-white">
                  <service.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                  {service.title}
                </h3>
                <p className="mb-6 text-neutral-600">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Arrow */}
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all group-hover:gap-4">
                  Learn more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 font-semibold text-white transition-all hover:bg-neutral-800"
          >
            View All Services
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
