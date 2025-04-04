
import React from 'react';
import { Calendar, Clock, MapPin, Check, Info } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormValues } from '@/types/match';

interface MatchDetailsFieldsProps {
  form: UseFormReturn<MatchFormValues>;
}

export const MatchDetailsFields: React.FC<MatchDetailsFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" /> Date
            </FormLabel>
            <div className="relative">
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                  className={field.value ? "border-green-500 pr-8" : ""}
                />
              </FormControl>
              {field.value ? (
                <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              ) : form.formState.errors.date ? (
                <Info className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              ) : null}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Clock className="mr-1 h-4 w-4" /> Heure
            </FormLabel>
            <div className="relative">
              <FormControl>
                <Input 
                  type="time" 
                  {...field} 
                  className={field.value ? "border-green-500 pr-8" : ""}
                />
              </FormControl>
              {field.value ? (
                <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              ) : form.formState.errors.time ? (
                <Info className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              ) : null}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" /> Lieu
            </FormLabel>
            <div className="relative">
              <FormControl>
                <Input 
                  placeholder="Parc des Princes" 
                  {...field} 
                  className={field.value ? "border-green-500 pr-8" : ""}
                />
              </FormControl>
              {field.value ? (
                <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              ) : form.formState.errors.location ? (
                <Info className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              ) : null}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <div className="relative">
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className={field.value ? "border-green-500 pr-8" : ""}>
                    <SelectValue placeholder="Sélectionner un statut" />
                    {field.value && <Check className="absolute right-8 h-4 w-4 text-green-500" />}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="live">En direct</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
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
