
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchFormHeaderProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const MatchFormHeader: React.FC<MatchFormHeaderProps> = ({ 
  isEditing, 
  isSubmitting, 
  onCancel 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        {isEditing ? 'Modifier le match' : 'Ajouter un match'}
      </h2>
      <Button variant="ghost" size="icon" onClick={onCancel} disabled={isSubmitting}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};
