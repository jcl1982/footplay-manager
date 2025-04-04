
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, UserCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface AuthFormProps {
  setError: (error: string | null) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ setError }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setError(null);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Sign up flow
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;
        toast.success("Compte créé avec succès! Vérifiez votre email pour confirmer.");
      } else {
        // Sign in flow
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        toast.success("Connexion réussie!");
        navigate('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || "Une erreur est survenue lors de l'authentification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">
          {isSignUp ? "Créer un compte" : "Se connecter"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isSignUp 
            ? "Créez votre compte pour gérer votre équipe" 
            : "Connectez-vous pour accéder à votre espace"
          }
        </p>
      </div>

      {isSignUp && (
        <>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Nom complet
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Entrez votre nom complet"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nom d'utilisateur
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Choisissez un nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Mot de passe
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
            Chargement...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {isSignUp ? "S'inscrire" : "Se connecter"}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>

      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={toggleMode} 
          className="text-sm text-primary hover:underline"
        >
          {isSignUp 
            ? "Déjà un compte? Se connecter" 
            : "Pas encore de compte? S'inscrire"
          }
        </button>
      </div>
    </form>
  );
};
