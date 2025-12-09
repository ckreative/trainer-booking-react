export interface TimeSlot {
  start: string; // HH:MM format (24-hour)
  end: string;
}

export interface DaySchedule {
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  enabled: boolean;
  slots: TimeSlot[];
}

export interface Availability {
  timezone: string;
  schedule: DaySchedule[];
}

export interface EventType {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  location: string | null;
  availability: Availability | null;
}
