
import { z } from 'zod';

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
}

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

export const matchFormSchema = z.object({
  homeTeamId: z.string().min(1, { message: "L'équipe à domicile est requise" }),
  awayTeamId: z.string().min(1, { message: "L'équipe à l'extérieur est requise" })
    .refine((awayId) => awayId, { message: "L'équipe à l'extérieur est requise" }),
  date: z.string().min(1, { message: "La date est requise" }),
  time: z.string().min(1, { message: "L'heure est requise" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  homeTeamScore: z.coerce.number().optional(),
  awayTeamScore: z.coerce.number().optional(),
  status: z.enum(['upcoming', 'live', 'completed']),
});

export type MatchFormValues = z.infer<typeof matchFormSchema>;

export interface MatchFormProps {
  initialData?: Match;
  onSubmit: (data: MatchFormValues) => void;
  onCancel: () => void;
}
