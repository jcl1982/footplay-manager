
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, MapPin, CalendarDays, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { teams, matches } from '@/lib/data';

// Define form schema with Zod
const formSchema = z.object({
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z.string().min(1, { message: "La date de fin est requise" }),
  fieldCount: z.coerce.number().min(1, { message: "Au moins un terrain est requis" }).max(10),
  teamIds: z.array(z.coerce.number()).min(2, { message: "Au moins deux équipes sont requises" }),
  timeSlots: z.array(z.string()).min(1, { message: "Au moins un créneau horaire est requis" }),
  matchDuration: z.coerce.number().min(60, { message: "La durée minimum est de 60 minutes" }),
  roundRobin: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ScheduleFormProps {
  onSubmit: (data: FormValues & { teams: typeof teams, existingMatchIds: number[] }) => void;
  isGenerating: boolean;
}

const DEFAULT_TIME_SLOTS = ['14:00', '16:00', '18:00', '20:00'];

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onSubmit,
  isGenerating
}) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>(DEFAULT_TIME_SLOTS);
  
  // Calculate tomorrow's date for default values
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Calculate one week from tomorrow for default end date
  const nextWeek = new Date(tomorrow);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().split('T')[0];
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: tomorrowStr,
      endDate: nextWeekStr,
      fieldCount: 2,
      teamIds: [],
      timeSlots: DEFAULT_TIME_SLOTS,
      matchDuration: 90,
      roundRobin: false,
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    // Get existing match IDs to avoid duplicates
    const existingMatchIds = matches.map(match => match.id);
    
    // Submit with team data for name lookups
    onSubmit({
      ...data,
      teams,
      existingMatchIds
    });
  };

  const toggleTimeSlot = (slot: string) => {
    const isSelected = selectedTimeSlots.includes(slot);
    
    if (isSelected) {
      // Remove slot if it's already selected
      const newSlots = selectedTimeSlots.filter(s => s !== slot);
      setSelectedTimeSlots(newSlots);
      form.setValue('timeSlots', newSlots);
    } else {
      // Add slot if it's not selected
      const newSlots = [...selectedTimeSlots, slot].sort();
      setSelectedTimeSlots(newSlots);
      form.setValue('timeSlots', newSlots);
    }
  };

  // Calculate the number of potential matches
  const selectedTeams = form.watch('teamIds');
  const roundRobin = form.watch('roundRobin');
  const fieldCount = form.watch('fieldCount');
  const timeSlots = form.watch('timeSlots');
  
  let potentialMatchCount = 0;
  
  if (selectedTeams.length >= 2) {
    if (roundRobin) {
      // For round robin: (n-1) rounds with n/2 matches per round
      potentialMatchCount = (selectedTeams.length - 1) * Math.floor(selectedTeams.length / 2);
      
      // Add extra match if odd number of teams (each team sits out once)
      if (selectedTeams.length % 2 === 1) {
        potentialMatchCount += Math.floor(selectedTeams.length / 2);
      }
    } else {
      // For regular schedule: n*(n-1)/2 total matches (each team plays every other team once)
      potentialMatchCount = (selectedTeams.length * (selectedTeams.length - 1)) / 2;
    }
  }
  
  // Calculate available slots
  const startDate = form.watch('startDate');
  const endDate = form.watch('endDate');
  
  let availableSlots = 0;
  if (startDate && endDate && timeSlots && timeSlots.length > 0 && fieldCount) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    availableSlots = daysDiff * timeSlots.length * fieldCount;
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Configurer le planning des matchs
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> Date de début
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <CalendarDays className="mr-1 h-4 w-4" /> Date de fin
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fieldCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> Nombre de terrains
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="matchDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> Durée des matchs (min)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="60" step="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="roundRobin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center">
                      <Repeat className="mr-1 h-4 w-4" /> Tournoi complet (Round Robin)
                    </FormLabel>
                    <FormDescription>
                      Chaque équipe affrontera toutes les autres équipes une fois
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="teamIds"
              render={() => (
                <FormItem>
                  <FormLabel>Équipes participantes</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 rounded-lg border">
                    {teams.map((team) => (
                      <FormField
                        key={team.id}
                        control={form.control}
                        name="teamIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={team.id}
                              className="flex flex-row items-start space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(team.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    const updatedValue = checked
                                      ? [...currentValue, team.id]
                                      : currentValue.filter((value) => value !== team.id);
                                    field.onChange(updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {team.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeSlots"
              render={() => (
                <FormItem>
                  <FormLabel>Créneaux horaires</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                    {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '21:00', '22:00'].map((slot) => (
                      <div
                        key={slot}
                        onClick={() => toggleTimeSlot(slot)}
                        className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                          selectedTimeSlots.includes(slot)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Match counts informational display */}
            {selectedTeams.length >= 2 && (
              <div className="rounded-lg bg-slate-50 p-3 space-y-2">
                <p className="text-sm font-medium">Informations complémentaires :</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Nombre de créneaux disponibles:</div>
                  <div className="font-medium">{availableSlots}</div>
                  
                  <div>Nombre de matchs potentiels:</div>
                  <div className={`font-medium ${potentialMatchCount > availableSlots ? 'text-amber-600' : 'text-green-600'}`}>
                    {potentialMatchCount}
                  </div>
                </div>
                {potentialMatchCount > availableSlots && (
                  <p className="text-xs text-amber-600">
                    Attention: le nombre de matchs potentiels dépasse les créneaux disponibles. 
                    Certains matchs ne pourront pas être planifiés.
                  </p>
                )}
              </div>
            )}
            
            <CardFooter className="flex justify-end gap-2 px-0 pt-4">
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? 'Génération en cours...' : 'Générer le planning'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;
