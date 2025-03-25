
export interface Team {
  id: number;
  name: string;
  logoUrl: string;
  playerCount: number;
  league: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  teamId: number;
  teamName: string;
  rating: number;
  photoUrl?: string;
  nationality?: string;
  age?: number;
  stats?: {
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    minutesPlayed?: number;
  };
}

export interface Match {
  id: number;
  homeTeamId: number;
  homeTeamName: string;
  homeTeamLogo?: string;
  homeTeamScore?: number;
  awayTeamId: number;
  awayTeamName: string;
  awayTeamLogo?: string;
  awayTeamScore?: number;
  date: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
}

export const teams: Team[] = [
  {
    id: 1,
    name: 'Paris Saint-Germain',
    logoUrl: '',
    playerCount: 25,
    league: 'Ligue 1',
    wins: 12,
    draws: 3,
    losses: 2
  },
  {
    id: 2,
    name: 'Olympique de Marseille',
    logoUrl: '',
    playerCount: 23,
    league: 'Ligue 1',
    wins: 10,
    draws: 4,
    losses: 3
  },
  {
    id: 3,
    name: 'AS Monaco',
    logoUrl: '',
    playerCount: 22,
    league: 'Ligue 1',
    wins: 9,
    draws: 5,
    losses: 3
  },
  {
    id: 4,
    name: 'Olympique Lyonnais',
    logoUrl: '',
    playerCount: 24,
    league: 'Ligue 1',
    wins: 8,
    draws: 6,
    losses: 3
  },
  {
    id: 5,
    name: 'LOSC Lille',
    logoUrl: '',
    playerCount: 21,
    league: 'Ligue 1',
    wins: 8,
    draws: 3,
    losses: 6
  }
];

export const players: Player[] = [
  {
    id: 1,
    name: 'Kylian Mbappé',
    position: 'AT',
    number: 7,
    teamId: 1,
    teamName: 'Paris Saint-Germain',
    rating: 9.2,
    nationality: 'France',
    age: 25,
    stats: {
      goals: 22,
      assists: 8,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1840
    }
  },
  {
    id: 2,
    name: 'Ousmane Dembélé',
    position: 'MD',
    number: 10,
    teamId: 1,
    teamName: 'Paris Saint-Germain',
    rating: 8.5,
    nationality: 'France',
    age: 27,
    stats: {
      goals: 8,
      assists: 12,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 1720
    }
  },
  {
    id: 3,
    name: 'Marquinhos',
    position: 'DC',
    number: 5,
    teamId: 1,
    teamName: 'Paris Saint-Germain',
    rating: 8.7,
    nationality: 'Brésil',
    age: 30,
    stats: {
      goals: 2,
      assists: 1,
      yellowCards: 5,
      redCards: 0,
      minutesPlayed: 1980
    }
  },
  {
    id: 4,
    name: 'Pierre-Emerick Aubameyang',
    position: 'AT',
    number: 10,
    teamId: 2,
    teamName: 'Olympique de Marseille',
    rating: 8.3,
    nationality: 'Gabon',
    age: 34,
    stats: {
      goals: 18,
      assists: 6,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1750
    }
  },
  {
    id: 5,
    name: 'Wissam Ben Yedder',
    position: 'AT',
    number: 9,
    teamId: 3,
    teamName: 'AS Monaco',
    rating: 8.4,
    nationality: 'France',
    age: 33,
    stats: {
      goals: 17,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1700
    }
  },
  {
    id: 6,
    name: 'Alexandre Lacazette',
    position: 'AT',
    number: 10,
    teamId: 4,
    teamName: 'Olympique Lyonnais',
    rating: 8.2,
    nationality: 'France',
    age: 32,
    stats: {
      goals: 15,
      assists: 7,
      yellowCards: 4,
      redCards: 1,
      minutesPlayed: 1820
    }
  },
  {
    id: 7,
    name: 'Jonathan David',
    position: 'AT',
    number: 9,
    teamId: 5,
    teamName: 'LOSC Lille',
    rating: 8.0,
    nationality: 'Canada',
    age: 24,
    stats: {
      goals: 14,
      assists: 4,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1890
    }
  }
];

export const matches: Match[] = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamName: 'Paris Saint-Germain',
    homeTeamScore: 3,
    awayTeamId: 2,
    awayTeamName: 'Olympique de Marseille',
    awayTeamScore: 1,
    date: '2023-11-12T20:45:00',
    location: 'Parc des Princes',
    status: 'completed'
  },
  {
    id: 2,
    homeTeamId: 3,
    homeTeamName: 'AS Monaco',
    homeTeamScore: 2,
    awayTeamId: 4,
    awayTeamName: 'Olympique Lyonnais',
    awayTeamScore: 2,
    date: '2023-11-18T17:00:00',
    location: 'Stade Louis II',
    status: 'completed'
  },
  {
    id: 3,
    homeTeamId: 5,
    homeTeamName: 'LOSC Lille',
    homeTeamScore: 1,
    awayTeamId: 1,
    awayTeamName: 'Paris Saint-Germain',
    awayTeamScore: 2,
    date: '2023-11-26T20:45:00',
    location: 'Stade Pierre-Mauroy',
    status: 'completed'
  },
  {
    id: 4,
    homeTeamId: 2,
    homeTeamName: 'Olympique de Marseille',
    awayTeamId: 3,
    awayTeamName: 'AS Monaco',
    date: '2023-12-03T20:45:00',
    location: 'Orange Vélodrome',
    status: 'upcoming'
  },
  {
    id: 5,
    homeTeamId: 4,
    homeTeamName: 'Olympique Lyonnais',
    awayTeamId: 5,
    awayTeamName: 'LOSC Lille',
    date: '2023-12-10T17:00:00',
    location: 'Groupama Stadium',
    status: 'upcoming'
  }
];

export const fieldPlayers = [
  { id: 1, name: 'Mbappé', position: 'AT', number: 7, x: 50, y: 20 },
  { id: 2, name: 'Dembélé', position: 'MD', number: 10, x: 80, y: 40 },
  { id: 3, name: 'Vitinha', position: 'MC', number: 17, x: 50, y: 40 },
  { id: 4, name: 'Zaïre-Emery', position: 'MC', number: 6, x: 20, y: 40 },
  { id: 5, name: 'Hakimi', position: 'DD', number: 2, x: 90, y: 60 },
  { id: 6, name: 'Nuno Mendes', position: 'DG', number: 25, x: 10, y: 60 },
  { id: 7, name: 'Skriniar', position: 'DC', number: 37, x: 35, y: 75 },
  { id: 8, name: 'Marquinhos', position: 'DC', number: 5, x: 65, y: 75 },
  { id: 9, name: 'Ugarte', position: 'MDC', number: 4, x: 50, y: 60 },
  { id: 10, name: 'Barcola', position: 'AG', number: 29, x: 20, y: 20 },
  { id: 11, name: 'Donnarumma', position: 'GB', number: 1, x: 50, y: 90 }
];

export const stats = {
  matchesPlayed: 17,
  wins: 12,
  draws: 3,
  losses: 2,
  goalsScored: 42,
  goalsConceded: 15,
  cleanSheets: 7,
  yellowCards: 28,
  redCards: 2,
  
  topScorers: [
    { name: 'Mbappé', value: 22 },
    { name: 'Dembélé', value: 8 },
    { name: 'Barcola', value: 6 },
    { name: 'Asensio', value: 4 },
    { name: 'Hakimi', value: 2 }
  ],
  
  assistsBreakdown: [
    { name: 'Dembélé', value: 12 },
    { name: 'Mbappé', value: 8 },
    { name: 'Vitinha', value: 6 },
    { name: 'Hakimi', value: 5 },
    { name: 'Lee', value: 3 }
  ],
  
  formationUsage: [
    { name: '4-3-3', value: 10 },
    { name: '4-2-3-1', value: 5 },
    { name: '3-4-3', value: 2 }
  ],
  
  minutesPlayed: [
    { name: 'Donnarumma', value: 1530 },
    { name: 'Marquinhos', value: 1500 },
    { name: 'Mbappé', value: 1450 },
    { name: 'Hakimi', value: 1330 },
    { name: 'Vitinha', value: 1290 }
  ]
};
