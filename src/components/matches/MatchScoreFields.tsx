
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormValues } from '@/types/match';

interface MatchScoreFieldsProps {
  form: UseFormReturn<MatchFormValues>;
}

export const MatchScoreFields: React.FC<MatchScoreFieldsProps> = ({ form }) => {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <h4 className="font-medium mb-3">Score</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="homeTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buts de l'équipe à domicile</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="awayTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buts de l'équipe à l'extérieur</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
