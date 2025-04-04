
import React from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserMenu: React.FC = () => {
  const { user, signOut, isAdmin } = useAuth();
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-primary">
            <div className="flex items-center gap-1">
              {isAdmin ? (
                <ShieldCheck className="h-5 w-5 text-primary" />
              ) : (
                <UserCircle className="h-5 w-5 text-primary" />
              )}
              <span className="hidden md:inline text-xs font-medium truncate max-w-[100px]">
                {user.email?.split('@')[0]}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {user.email}
            {isAdmin && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                Admin
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && (
            <>
              <DropdownMenuItem onClick={() => navigate('/admin')}>
                Tableau de bord admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
