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
