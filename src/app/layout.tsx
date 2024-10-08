import React from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Providers } from './providers/app-providers';
import Navbar from './components/Navbar';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Luminify - AI Annotation',
  description: 'Annotate images and videos with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('flex flex-col h-screen w-screen bg-background  font-sans antialiased', fontSans.variable)}>
        <div className='h-full w-full flex flex-col px-10 py-4'>
          <Providers>
            <Navbar />
            <main className='flex-grow flex py-6'>{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
