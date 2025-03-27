
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Match, teams } from '@/lib/data';

// Define form schema with Zod
const formSchema = z.object({
  homeTeamId: z.coerce.number().min(1, { message: "L'équipe à domicile est requise" }),
  awayTeamId: z.coerce.number().min(1, { message: "L'équipe à l'extérieur est requise" })
    .refine((awayId) => awayId, { message: "L'équipe à l'extérieur est requise" }),
  date: z.string().min(1, { message: "La date est requise" }),
  time: z.string().min(1, { message: "L'heure est requise" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  homeTeamScore: z.coerce.number().optional(),
  awayTeamScore: z.coerce.number().optional(),
  status: z.enum(['upcoming', 'live', 'completed']),
});

type FormValues = z.infer<typeof formSchema>;

interface MatchFormProps {
  initialData?: Match;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const MatchForm: React.FC<MatchFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!initialData;
  const isCompleted = initialData?.status === 'completed';
  
  // Parse date and time from the initialData date string
  let defaultDate = '';
  let defaultTime = '';
  
  if (initialData?.date) {
    const date = new Date(initialData.date);
    defaultDate = date.toISOString().split('T')[0];
    defaultTime = date.toTimeString().slice(0, 5);
  }
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      homeTeamId: initialData.homeTeamId,
      awayTeamId: initialData.awayTeamId,
      date: defaultDate,
      time: defaultTime,
      location: initialData.location,
      homeTeamScore: initialData.homeTeamScore || 0,
      awayTeamScore: initialData.awayTeamScore || 0,
      status: initialData.status,
    } : {
      homeTeamId: 0,
      awayTeamId: 0,
      date: '',
      time: '',
      location: '',
      homeTeamScore: 0,
      awayTeamScore: 0,
      status: 'upcoming',
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    // Combine date and time into ISO string
    const dateTimeString = `${data.date}T${data.time}:00`;
    
    // Prepare the data for submission
    const submissionData = {
      ...data,
      date: dateTimeString,
      homeTeamName: teams.find(team => team.id === data.homeTeamId)?.name || '',
      awayTeamName: teams.find(team => team.id === data.awayTeamId)?.name || '',
      homeTeamLogo: teams.find(team => team.id === data.homeTeamId)?.logoUrl || '',
      awayTeamLogo: teams.find(team => team.id === data.awayTeamId)?.logoUrl || '',
    };
    
    delete submissionData.time;
    onSubmit(submissionData);
  };

  // This prevents choosing the same team for home and away
  const awayTeamOptions = teams.filter(team => team.id !== form.watch('homeTeamId'));
  const homeTeamOptions = teams.filter(team => team.id !== form.watch('awayTeamId'));

  return (
    <Card className="w-full mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          {isEditing ? 'Modifier le match' : 'Ajouter un match'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="homeTeamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Équipe à domicile</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value ? field.value.toString() : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une équipe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {homeTeamOptions.map(team => (
                          <SelectItem key={team.id} value={team.id.toString()}>
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
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value ? field.value.toString() : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une équipe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {awayTeamOptions.map(team => (
                          <SelectItem key={team.id} value={team.id.toString()}>
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> Date
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
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> Heure
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="Parc des Princes" {...field} />
                    </FormControl>
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
                    <Select 
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">À venir</SelectItem>
                        <SelectItem value="live">En direct</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {(isCompleted || form.watch('status') === 'completed') && (
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
            )}
            
            <CardFooter className="flex justify-end gap-2 px-0 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button type="submit">
                {isEditing ? 'Enregistrer' : 'Ajouter'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MatchForm;
