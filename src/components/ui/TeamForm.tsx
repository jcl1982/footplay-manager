
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trophy, Image as ImageIcon } from 'lucide-react';
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
import { Team } from '@/lib/data';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  logoUrl: z.string().optional(),
  playerCount: z.coerce.number().min(0, { message: 'Le nombre de joueurs doit être positif' }),
  league: z.string().min(1, { message: 'La ligue est requise' }),
  wins: z.coerce.number().min(0, { message: 'Les victoires doivent être positives' }),
  draws: z.coerce.number().min(0, { message: 'Les nuls doivent être positifs' }),
  losses: z.coerce.number().min(0, { message: 'Les défaites doivent être positives' }),
});

type FormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  initialData?: Team;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export const TeamForm: React.FC<TeamFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!initialData;
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      logoUrl: '',
      playerCount: 0,
      league: 'Ligue 1',
      wins: 0,
      draws: 0,
      losses: 0,
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          {isEditing ? 'Modifier l\'équipe' : 'Ajouter une équipe'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'équipe</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris Saint-Germain" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="league"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ligue</FormLabel>
                    <FormControl>
                      <Input placeholder="Ligue 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL du logo (optionnel)</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input placeholder="https://..." {...field} />
                        <Button type="button" variant="outline" className="ml-2" size="icon">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="playerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de joueurs</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Statistiques</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="wins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Victoires</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="draws"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nuls</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="losses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Défaites</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
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

export default TeamForm;
