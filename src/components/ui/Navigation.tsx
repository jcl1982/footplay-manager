
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Layers, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/teams', label: 'Équipes', icon: Shield },
  { path: '/players', label: 'Joueurs', icon: Users },
  { path: '/matches', label: 'Matchs', icon: Calendar },
  { path: '/field', label: 'Terrain', icon: Layers },
];

export const Navigation = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto bg-white/80 backdrop-blur-lg border-t md:border-b border-gray-200 px-4 py-2 md:py-4">
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="relative">
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col md:flex-row items-center p-2 rounded-lg transition-all duration-300 gap-1 md:gap-2",
                    isActive 
                      ? "text-primary font-medium" 
                      : "text-gray-500 hover:text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full md:h-full md:w-1 md:left-0 md:top-0 md:bottom-0 md:-translate-x-0 md:translate-y-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
