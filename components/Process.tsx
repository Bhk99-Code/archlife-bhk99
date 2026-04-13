'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, PenTool, Hammer, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Concept',
    description: 'We understand your vision, requirements, and constraints to create the perfect foundation.',
    details: ['Site Analysis', 'Client Brief', 'Initial Sketches']
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Detailed architectural plans with stunning 3D visualizations that bring your project to life.',
    details: ['Floor Plans', '3D Renders', 'Material Selection']
  },
  {
    icon: Hammer,
    title: 'Documentation',
    description: 'Complete construction drawings and technical specifications for seamless execution.',
    details: ['Working Drawings', 'BOQ Preparation', 'Permit Assistance']
  },
  {
    icon: CheckCircle,
    title: 'Support',
    description: 'Ongoing support during construction to ensure your vision is perfectly realized.',
    details: ['Site Visits', 'Contractor Coordination', 'Quality Control']
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={containerRef} className="relative bg-neutral-900 py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            Our Process
          </span>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            From vision to reality
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              in four simple steps
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            A streamlined workflow designed for efficiency, transparency, and exceptional results.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary-500 via-primary-600 to-transparent md:left-1/2 md:block" />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center gap-8`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="rounded-2xl bg-neutral-800 p-8 transition-all hover:bg-neutral-700">
                    <div className={`mb-4 flex items-center gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="inline-flex rounded-lg bg-primary-500/10 p-3 text-primary-500">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold text-primary-500">
                        Step {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    
                    <p className="mb-4 text-neutral-400">
                      {step.description}
                    </p>

                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className={`flex items-center gap-2 text-sm text-neutral-500 ${
                            index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''
                          }`}
                        >
                          <div className="h-1 w-1 rounded-full bg-primary-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-neutral-900 bg-primary-500 text-2xl font-bold text-white shadow-lg shadow-primary-500/50">
                  {index + 1}
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="mb-6 text-lg text-neutral-400">
            Ready to start your architectural journey?
          </p>
          <a
            href="/submit-project"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/50"
          >
            Get Started Today
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
