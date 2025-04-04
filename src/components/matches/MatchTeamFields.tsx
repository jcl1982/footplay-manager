
import React from 'react';
import { Info, Check } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { Team, MatchFormValues } from '@/types/match';

interface MatchTeamFieldsProps {
  form: UseFormReturn<MatchFormValues>;
  homeTeamOptions: Team[];
  awayTeamOptions: Team[];
}

export const MatchTeamFields: React.FC<MatchTeamFieldsProps> = ({ 
  form, 
  homeTeamOptions, 
  awayTeamOptions 
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="homeTeamId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Équipe à domicile</FormLabel>
            <div className="relative">
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className={field.value ? "border-green-500 pr-8" : ""}>
                    <SelectValue placeholder="Sélectionner une équipe" />
                    {field.value && <Check className="absolute right-8 h-4 w-4 text-green-500" />}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {homeTeamOptions.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.homeTeamId && (
                <Info className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="awayTeamId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Équipe à l'extérieur</FormLabel>
            <div className="relative">
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className={field.value ? "border-green-500 pr-8" : ""}>
                    <SelectValue placeholder="Sélectionner une équipe" />
                    {field.value && <Check className="absolute right-8 h-4 w-4 text-green-500" />}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {awayTeamOptions.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.awayTeamId && (
                <Info className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
