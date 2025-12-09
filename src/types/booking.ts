export interface CreateBookingData {
  eventTypeId: string;
  startTime: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  notes?: string;
  timezone?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventTypeId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'unconfirmed' | 'recurring' | 'past' | 'cancelled';
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  timezone: string;
  isRecurring: boolean;
  recurrenceRule?: string;
  createdAt: string;
  updatedAt: string;
}
