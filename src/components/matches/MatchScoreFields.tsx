
import React from 'react';
import { Check, Info } from 'lucide-react';
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
              <div className="relative">
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    className={field.value !== undefined ? "border-green-500 pr-8" : ""}
                  />
                </FormControl>
                {field.value !== undefined ? (
                  <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                ) : form.formState.errors.homeTeamScore ? (
                  <Info className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                ) : null}
              </div>
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
              <div className="relative">
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    className={field.value !== undefined ? "border-green-500 pr-8" : ""}
                  />
                </FormControl>
                {field.value !== undefined ? (
                  <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                ) : form.formState.errors.awayTeamScore ? (
                  <Info className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                ) : null}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
