import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArchLife BHK99 - Premium Architecture Services Worldwide',
  description: 'World-class architectural designs delivered globally. From concept to completion, we transform spaces into extraordinary experiences.',
  keywords: 'architecture, architectural services, international architecture, residential design, commercial design, interior design, landscape architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
