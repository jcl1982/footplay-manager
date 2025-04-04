
import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
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
import { Player } from '@/services/playerService';

type PlayerFormValues = {
  name: string;
  position: string;
  number: number;
  teamId: string;
  nationality?: string;
  age?: number;
  photoUrl?: string;
};

interface PlayerFormProps {
  player?: Player;
  onSubmit: (values: PlayerFormValues) => void;
  onCancel: () => void;
  teams: { id: string; name: string }[];
  isLoading?: boolean;
}

const positions = [
  'GB', 'DD', 'DG', 'DC', 'MDC', 'MC', 
  'MD', 'MG', 'MOC', 'AT', 'AG', 'AD'
];

export const PlayerForm = ({ player, onSubmit, onCancel, teams, isLoading = false }: PlayerFormProps) => {
  const form = useForm<PlayerFormValues>({
    defaultValues: player 
      ? {
          name: player.name,
          position: player.position,
          number: player.number,
          teamId: player.teamId,
          nationality: player.nationality || '',
          age: player.age || undefined,
          photoUrl: player.photoUrl || '',
        }
      : {
          name: '',
          position: 'MC',
          number: 1,
          teamId: teams[0]?.id || '',
          nationality: '',
          age: undefined,
          photoUrl: '',
        },
  });

  const handleSubmit = (values: PlayerFormValues) => {
    onSubmit(values);
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {player ? 'Modifier le joueur' : 'Ajouter un joueur'}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du joueur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      max={99} 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipe</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationalité</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationalité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Âge</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={16} 
                      max={45} 
                      placeholder="Âge" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de la photo</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={onCancel} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : null}
              {player ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlayerForm;
