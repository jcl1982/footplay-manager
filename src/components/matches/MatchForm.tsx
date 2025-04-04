
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trophy, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchTeams } from '@/services/matchService';
import { MatchTeamFields } from '@/components/matches/MatchTeamFields';
import { MatchDetailsFields } from '@/components/matches/MatchDetailsFields';
import { MatchScoreFields } from '@/components/matches/MatchScoreFields';
import { MatchFormProps, matchFormSchema, MatchFormValues, Team } from '@/types/match';

export const MatchForm: React.FC<MatchFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
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
  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchFormSchema),
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
      homeTeamId: '',
      awayTeamId: '',
      date: '',
      time: '',
      location: '',
      homeTeamScore: 0,
      awayTeamScore: 0,
      status: 'upcoming',
    },
    mode: 'onChange'
  });

  // Fetch teams for dropdowns
  useEffect(() => {
    const loadTeams = async () => {
      setIsLoading(true);
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error loading teams:', error);
        setFormError('Erreur lors du chargement des équipes. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTeams();
  }, []);
  
  const handleFormSubmit = (data: MatchFormValues) => {
    // Check if teams are the same
    if (data.homeTeamId === data.awayTeamId) {
      setFormError('Une équipe ne peut pas jouer contre elle-même.');
      return;
    }
    
    setFormError('');
    // Submit form data to parent component
    onSubmit(data);
  };

  // This prevents choosing the same team for home and away
  const awayTeamOptions = teams.filter(team => team.id !== form.watch('homeTeamId'));
  const homeTeamOptions = teams.filter(team => team.id !== form.watch('awayTeamId'));

  if (isLoading) {
    return (
      <Card className="w-full mx-auto animate-fade-in">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          {isEditing ? 'Modifier le match' : 'Ajouter un match'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MatchTeamFields 
                form={form} 
                homeTeamOptions={homeTeamOptions} 
                awayTeamOptions={awayTeamOptions} 
              />
              
              <MatchDetailsFields form={form} />
            </div>
            
            {(isCompleted || form.watch('status') === 'completed') && (
              <MatchScoreFields form={form} />
            )}
            
            <CardFooter className="flex justify-end gap-2 px-0 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={!form.formState.isValid && form.formState.isDirty}
              >
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
