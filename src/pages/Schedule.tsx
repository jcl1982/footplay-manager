
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { ScheduleForm } from '@/components/ui/ScheduleForm';
import { ScheduleResults } from '@/components/ui/ScheduleResults';
import { Match } from '@/lib/data';
import { toast } from 'sonner';

const Schedule = () => {
  const [generatedMatches, setGeneratedMatches] = useState<Match[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSchedule = (data: any) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const matches = generateMatchSchedule(data);
      setGeneratedMatches(matches);
      setIsGenerating(false);
      
      toast.success(`Planning généré avec succès`, {
        description: `${matches.length} matches ont été planifiés.`
      });
    }, 800);
  };

  const handleSaveSchedule = () => {
    // Logic to save the generated matches would go here
    toast.success('Planning enregistré', {
      description: 'Les matchs ont été ajoutés au calendrier.'
    });
  };

  return (
    <Layout title="Planification des matchs">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ScheduleForm onSubmit={handleGenerateSchedule} isGenerating={isGenerating} />
        </div>
        
        <div>
          <ScheduleResults 
            matches={generatedMatches} 
            onSave={handleSaveSchedule}
          />
        </div>
      </div>
    </Layout>
  );
};

// Function to generate match schedule based on form data
const generateMatchSchedule = (data: any): Match[] => {
  const { teamIds, fieldCount, startDate, endDate, timeSlots, matchDuration } = data;
  const generatedMatches: Match[] = [];
  
  // Create matches by creating pairs of teams
  const createMatchPairs = (teams: number[]) => {
    const pairs: [number, number][] = [];
    
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        pairs.push([teams[i], teams[j]]);
      }
    }
    
    return pairs;
  };
  
  // Get all possible matches
  const allPossibleMatches = createMatchPairs(teamIds);
  
  // Calculate how many days are available for scheduling
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate how many matches can be played per day
  const matchesPerDay = fieldCount * timeSlots.length;
  
  // Calculate total match slots available
  const totalAvailableSlots = matchesPerDay * daysDiff;
  
  // If we have more matches than slots, we use random selection
  const matchesToSchedule = allPossibleMatches.length > totalAvailableSlots 
    ? allPossibleMatches.sort(() => 0.5 - Math.random()).slice(0, totalAvailableSlots)
    : allPossibleMatches;
  
  let matchCount = 0;
  let matchId = Math.max(...data.existingMatchIds, 0) + 1;
  
  // Schedule matches across available days and fields
  for (let day = 0; day < daysDiff && matchCount < matchesToSchedule.length; day++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + day);
    
    // For each time slot
    for (let slot = 0; slot < timeSlots.length && matchCount < matchesToSchedule.length; slot++) {
      const [hours, minutes] = timeSlots[slot].split(':').map(Number);
      currentDate.setHours(hours, minutes, 0, 0);
      
      // For each field
      for (let field = 1; field <= fieldCount && matchCount < matchesToSchedule.length; field++) {
        const matchPair = matchesToSchedule[matchCount];
        const homeTeamId = matchPair[0];
        const awayTeamId = matchPair[1];
        
        // Find team names from the array of team objects
        const homeTeam = data.teams.find((t: any) => t.id === homeTeamId);
        const awayTeam = data.teams.find((t: any) => t.id === awayTeamId);
        
        if (homeTeam && awayTeam) {
          generatedMatches.push({
            id: matchId++,
            homeTeamId,
            homeTeamName: homeTeam.name,
            homeTeamLogo: homeTeam.logoUrl,
            awayTeamId,
            awayTeamName: awayTeam.name,
            awayTeamLogo: awayTeam.logoUrl,
            date: currentDate.toISOString(),
            location: `Terrain ${field}`,
            status: 'upcoming'
          });
          
          matchCount++;
        }
      }
    }
  }
  
  return generatedMatches;
};

export default Schedule;
