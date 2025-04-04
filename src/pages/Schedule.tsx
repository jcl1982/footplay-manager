
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { ScheduleForm } from '@/components/ui/ScheduleForm';
import { ScheduleResults } from '@/components/ui/ScheduleResults';
import { Match, teams } from '@/lib/data';
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
  const { teamIds, fieldCount, startDate, endDate, timeSlots, matchDuration, roundRobin } = data;
  const generatedMatches: Match[] = [];
  
  // Create matches based on selected algorithm
  const createMatchPairs = (teams: number[], isRoundRobin: boolean): [number, number][] => {
    const pairs: [number, number][] = [];
    
    if (isRoundRobin) {
      // Round Robin algorithm (each team plays against every other team)
      for (let round = 0; round < teams.length - 1; round++) {
        const tempTeams = [...teams];
        const firstTeam = tempTeams[0]; // The first team is fixed
        tempTeams.shift(); // Remove the first team
        
        // Rotate all other teams
        const rotatedTeams = [...tempTeams];
        rotatedTeams.unshift(rotatedTeams.pop() as number);
        
        // Create matches for this round
        for (let i = 0; i < teams.length / 2; i++) {
          if (i === 0) {
            pairs.push([firstTeam, rotatedTeams[i]]);
          } else {
            pairs.push([rotatedTeams[i], rotatedTeams[teams.length - 2 - i]]);
          }
        }
        
        // Update the teams array for the next round
        tempTeams.splice(0, 0, firstTeam);
        tempTeams.splice(1, tempTeams.length - 1, ...rotatedTeams);
      }
    } else {
      // Default algorithm: each team plays against each other once
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          pairs.push([teams[i], teams[j]]);
        }
      }
    }
    
    return pairs;
  };
  
  // Get all possible matches based on selected algorithm
  const allPossibleMatches = createMatchPairs(teamIds, !!roundRobin);
  
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
  let matchId = Math.max(...(data.existingMatchIds || [0]), 0) + 1;
  
  // Map to track which teams have been scheduled on each day to avoid conflicts
  const teamScheduleByDay: Record<string, Set<number>> = {};
  
  // Schedule matches across available days and fields
  for (let day = 0; day < daysDiff && matchCount < matchesToSchedule.length; day++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + day);
    const dateKey = currentDate.toISOString().split('T')[0];
    
    // Initialize team schedule tracking for this day
    if (!teamScheduleByDay[dateKey]) {
      teamScheduleByDay[dateKey] = new Set<number>();
    }
    
    // For each time slot
    for (let slot = 0; slot < timeSlots.length && matchCount < matchesToSchedule.length; slot++) {
      const [hours, minutes] = timeSlots[slot].split(':').map(Number);
      currentDate.setHours(hours, minutes, 0, 0);
      
      // For each field
      for (let field = 1; field <= fieldCount && matchCount < matchesToSchedule.length; field++) {
        // Find a match where the teams haven't played yet on this day
        let matchFound = false;
        
        for (let i = matchCount; i < matchesToSchedule.length; i++) {
          const matchPair = matchesToSchedule[i];
          const homeTeamId = matchPair[0];
          const awayTeamId = matchPair[1];
          
          // Check if either team is already scheduled on this day
          if (teamScheduleByDay[dateKey].has(homeTeamId) || teamScheduleByDay[dateKey].has(awayTeamId)) {
            continue; // Skip this match as one of the teams is already playing today
          }
          
          // Find team names from the array of team objects
          const homeTeam = data.teams.find((t: any) => t.id === homeTeamId);
          const awayTeam = data.teams.find((t: any) => t.id === awayTeamId);
          
          if (homeTeam && awayTeam) {
            // Swap this match with the current position
            if (i !== matchCount) {
              const temp = matchesToSchedule[matchCount];
              matchesToSchedule[matchCount] = matchesToSchedule[i];
              matchesToSchedule[i] = temp;
            }
            
            // Add the match to the schedule
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
            
            // Mark these teams as scheduled for this day
            teamScheduleByDay[dateKey].add(homeTeamId);
            teamScheduleByDay[dateKey].add(awayTeamId);
            
            matchCount++;
            matchFound = true;
            break;
          }
        }
        
        // If no match was found with available teams, just skip this slot
        if (!matchFound) {
          continue;
        }
      }
    }
  }
  
  return generatedMatches;
};

export default Schedule;
