import './globals.css';
import ClientProviders from '../components/ClientProviders';
import { ThemeProvider } from '../components/ThemeProvider';
import React from 'react';

export const metadata = {
  title: 'Piyush | Fullstack DevOps Intern & Solutions Architect',
  description: 'Official portfolio of Piyush. Specializing in AWS Cloud Architecture, fullstack development, CI/CD pipelines, and high-performance web systems.',
  authors: [{ name: 'Piyush' }],
  openGraph: {
    title: 'Piyush | Fullstack DevOps Intern & Solutions Architect',
    description: 'Personal portfolio of Piyush. Specializing in AWS Cloud Architecture, fullstack development, and high-performance DevOps pipelines.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Additional links can be placed here */}
      </head>
      <body className="relative w-full overflow-x-hidden min-h-screen">
        <ThemeProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
