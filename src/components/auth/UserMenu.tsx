
import React from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Vous êtes déconnecté');
    navigate('/');
  };

  if (!user) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-1 text-gray-600 hover:text-primary"
        onClick={() => navigate('/auth')}
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden md:inline">Connexion</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-1 text-gray-600 hover:text-primary"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden md:inline">Déconnexion</span>
      </Button>
      <div className="hidden md:flex items-center gap-1">
        <UserCircle className="h-5 w-5 text-primary" />
        <span className="text-xs font-medium truncate max-w-[100px]">
          {user.email?.split('@')[0]}
        </span>
      </div>
    </div>
  );
};
