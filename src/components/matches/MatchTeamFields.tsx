
import React from 'react';
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
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une équipe" />
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
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une équipe" />
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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
