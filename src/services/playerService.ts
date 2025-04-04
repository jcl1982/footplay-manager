
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  teamId: string;
  teamName: string;
  rating: number;
  photoUrl?: string;
  nationality?: string;
  age?: number;
}

export interface PlayerFormData {
  name: string;
  position: string;
  number: number;
  teamId: string;
  nationality?: string;
  age?: number;
  photoUrl?: string;
}

// Format player data from Supabase to match our application model
const formatPlayer = (player: any, teamName: string): Player => {
  return {
    id: player.id,
    name: `${player.first_name} ${player.last_name}`,
    position: player.position || '',
    number: player.jersey_number || 0,
    teamId: player.team_id || '',
    teamName: teamName || '',
    rating: 6.0, // Default rating since we don't have it in DB yet
    photoUrl: player.avatar_url,
    nationality: '',
    age: player.birth_date ? calculateAge(new Date(player.birth_date)) : undefined
  };
};

// Calculate age from birth date
const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Fetch all players
export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const { data: players, error } = await supabase
      .from('players')
      .select(`
        *,
        teams:team_id (
          name
        )
      `);
    
    if (error) throw error;
    
    return players.map(player => formatPlayer(player, player.teams?.name || ''));
  } catch (error: any) {
    console.error('Error fetching players:', error);
    toast.error('Failed to load players');
    return [];
  }
};

// Add a new player
export const addPlayer = async (playerData: PlayerFormData): Promise<Player | null> => {
  try {
    // Split the name into first name and last name
    const nameParts = playerData.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Calculate birth date if age is provided
    let birthDate = null;
    if (playerData.age) {
      const today = new Date();
      birthDate = new Date(today.getFullYear() - playerData.age, today.getMonth(), today.getDate());
    }
    
    const { data, error } = await supabase
      .from('players')
      .insert({
        first_name: firstName,
        last_name: lastName,
        position: playerData.position,
        jersey_number: playerData.number,
        team_id: playerData.teamId,
        avatar_url: playerData.photoUrl,
        birth_date: birthDate
      })
      .select(`
        *,
        teams:team_id (
          name
        )
      `)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    return formatPlayer(data, data.teams?.name || '');
  } catch (error: any) {
    console.error('Error adding player:', error);
    toast.error('Failed to add player');
    return null;
  }
};

// Update an existing player
export const updatePlayer = async (id: string, playerData: PlayerFormData): Promise<Player | null> => {
  try {
    // Split the name into first name and last name
    const nameParts = playerData.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Calculate birth date if age is provided
    let birthDate = null;
    if (playerData.age) {
      const today = new Date();
      birthDate = new Date(today.getFullYear() - playerData.age, today.getMonth(), today.getDate());
    }
    
    const { data, error } = await supabase
      .from('players')
      .update({
        first_name: firstName,
        last_name: lastName,
        position: playerData.position,
        jersey_number: playerData.number,
        team_id: playerData.teamId,
        avatar_url: playerData.photoUrl,
        birth_date: birthDate
      })
      .eq('id', id)
      .select(`
        *,
        teams:team_id (
          name
        )
      `)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    return formatPlayer(data, data.teams?.name || '');
  } catch (error: any) {
    console.error('Error updating player:', error);
    toast.error('Failed to update player');
    return null;
  }
};

// Get teams for dropdown
export const fetchTeams = async () => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name');
    
    if (error) throw error;
    
    return data.map(team => ({
      id: team.id,
      name: team.name
    }));
  } catch (error: any) {
    console.error('Error fetching teams:', error);
    toast.error('Failed to load teams');
    return [];
  }
};
