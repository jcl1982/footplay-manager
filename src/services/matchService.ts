
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Match {
  id: string;
  homeTeamId: string;
  homeTeamName: string;
  homeTeamLogo?: string;
  homeTeamScore?: number;
  awayTeamId: string;
  awayTeamName: string;
  awayTeamLogo?: string;
  awayTeamScore?: number;
  date: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface MatchFormData {
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
  homeTeamScore?: number;
  awayTeamScore?: number;
}

// Format match data from Supabase
const formatMatch = (match: any, homeTeam: any, awayTeam: any): Match => {
  return {
    id: match.id,
    homeTeamId: match.home_team_id,
    homeTeamName: homeTeam?.name || '',
    homeTeamLogo: homeTeam?.logo_url || '',
    homeTeamScore: match.home_team_score,
    awayTeamId: match.away_team_id,
    awayTeamName: awayTeam?.name || '',
    awayTeamLogo: awayTeam?.logo_url || '',
    awayTeamScore: match.away_team_score,
    date: match.date,
    location: match.location || '',
    status: match.status as 'upcoming' | 'live' | 'completed',
  };
};

// Fetch all matches
export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select('*');
    
    if (error) throw error;

    // Fetch teams data for all matches at once
    const teamIds = Array.from(new Set([
      ...matches.map(match => match.home_team_id),
      ...matches.map(match => match.away_team_id)
    ]));

    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .in('id', teamIds);
    
    if (teamsError) throw teamsError;

    // Map teams for easy lookup
    const teamsMap = teams.reduce((acc: Record<string, any>, team) => {
      acc[team.id] = team;
      return acc;
    }, {});

    return matches.map(match => formatMatch(
      match, 
      teamsMap[match.home_team_id],
      teamsMap[match.away_team_id]
    ));
  } catch (error: any) {
    console.error('Error fetching matches:', error);
    toast.error('Failed to load matches');
    return [];
  }
};

// Add a new match
export const addMatch = async (matchData: MatchFormData): Promise<Match | null> => {
  try {
    // Combine date and time into ISO string
    const dateTimeString = `${matchData.date}T${matchData.time}:00`;
    
    const { data, error } = await supabase
      .from('matches')
      .insert({
        home_team_id: matchData.homeTeamId,
        away_team_id: matchData.awayTeamId,
        date: dateTimeString,
        location: matchData.location,
        status: matchData.status,
        home_team_score: matchData.homeTeamScore || 0,
        away_team_score: matchData.awayTeamScore || 0
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Fetch the teams data to include in the returned match
    const { data: homeTeam } = await supabase
      .from('teams')
      .select('*')
      .eq('id', matchData.homeTeamId)
      .single();
    
    const { data: awayTeam } = await supabase
      .from('teams')
      .select('*')
      .eq('id', matchData.awayTeamId)
      .single();
    
    return formatMatch(data, homeTeam, awayTeam);
  } catch (error: any) {
    console.error('Error adding match:', error);
    toast.error('Failed to add match');
    return null;
  }
};

// Update an existing match
export const updateMatch = async (id: string, matchData: MatchFormData): Promise<Match | null> => {
  try {
    // Combine date and time into ISO string
    const dateTimeString = `${matchData.date}T${matchData.time}:00`;
    
    const { data, error } = await supabase
      .from('matches')
      .update({
        home_team_id: matchData.homeTeamId,
        away_team_id: matchData.awayTeamId,
        date: dateTimeString,
        location: matchData.location,
        status: matchData.status,
        home_team_score: matchData.homeTeamScore || 0,
        away_team_score: matchData.awayTeamScore || 0
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Fetch the teams data to include in the returned match
    const { data: homeTeam } = await supabase
      .from('teams')
      .select('*')
      .eq('id', matchData.homeTeamId)
      .single();
    
    const { data: awayTeam } = await supabase
      .from('teams')
      .select('*')
      .eq('id', matchData.awayTeamId)
      .single();
    
    return formatMatch(data, homeTeam, awayTeam);
  } catch (error: any) {
    console.error('Error updating match:', error);
    toast.error('Failed to update match');
    return null;
  }
};

// Get teams for dropdown
export const fetchTeams = async () => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name, logo_url');
    
    if (error) throw error;
    
    return data.map(team => ({
      id: team.id,
      name: team.name,
      logoUrl: team.logo_url
    }));
  } catch (error: any) {
    console.error('Error fetching teams:', error);
    toast.error('Failed to load teams');
    return [];
  }
};
