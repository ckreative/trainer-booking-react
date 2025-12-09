export interface Trainer {
  id: string;
  slug: string;
  name: string;
  profileImage: string;
  rating: number;
  specialty: string;
  bio: string;
  sessionRate: number;
}

/**
 * Trainer configuration returned from the public API
 */
export interface TrainerConfig {
  id: string;
  handle: string;
  brandName: string;
  primaryColor: string;
  heroImageUrl: string | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailableDate {
  date: Date;
  dayName: string;
  dayNumber: number;
  monthName: string;
  slots: TimeSlot[];
}
