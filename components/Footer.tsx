import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                <span className="text-xl font-bold">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">ArchLife</span>
                <span className="text-xs text-neutral-400">BHK99</span>
              </div>
            </div>
            <p className="mb-6 text-sm text-neutral-400">
              Delivering world-class architectural solutions to clients across the globe.
              Excellence in every design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 transition-colors hover:text-primary-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 transition-colors hover:text-primary-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 transition-colors hover:text-primary-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#residential" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Residential Design
                </Link>
              </li>
              <li>
                <Link href="/services#commercial" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link href="/services#interior" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/services#landscape" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                  Landscape Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <div className="text-sm text-neutral-400">Email</div>
                  <a href="mailto:info@archlifebhk99.com" className="text-sm text-white transition-colors hover:text-primary-500">
                    info@archlifebhk99.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <div className="text-sm text-neutral-400">Phone</div>
                  <a href="tel:+919876543210" className="text-sm text-white transition-colors hover:text-primary-500">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <div className="text-sm text-neutral-400">Location</div>
                  <p className="text-sm text-white">
                    Pune, Maharashtra, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-400">
              © 2024 ArchLife BHK99. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-neutral-400 transition-colors hover:text-primary-500">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
