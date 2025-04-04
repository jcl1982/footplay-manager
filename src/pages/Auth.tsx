
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { AuthForm } from '@/components/auth/AuthForm';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Layout title="Espace de connexion">
      <div className="max-w-md mx-auto">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <AuthForm setError={setError} />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
