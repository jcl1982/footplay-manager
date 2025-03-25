
import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-16">
        {title && (
          <header className="mb-8">
            <div className="relative">
              <span className="absolute -top-3 left-0 text-xs font-medium text-primary/70 uppercase tracking-wider">
                Football Manager
              </span>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
            </div>
          </header>
        )}
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
