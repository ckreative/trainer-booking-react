import { api } from './api';
import type { Booking, CreateBookingData } from '../types/booking';

export interface AvailableSlot {
  start: string;
  end: string;
}

export interface AvailableSlotsResponse {
  date: string;
  eventType: {
    id: string;
    title: string;
    duration: number;
  };
  timezone: string;
  slots: AvailableSlot[];
}

export const bookingService = {
  async create(handle: string, data: CreateBookingData): Promise<Booking> {
    return api.post<Booking>(`/public/trainers/${handle}/bookings`, data);
  },

  async getAvailableSlots(
    handle: string,
    eventTypeId: string,
    date: string
  ): Promise<AvailableSlotsResponse> {
    return api.get<AvailableSlotsResponse>(
      `/public/trainers/${handle}/event-types/${eventTypeId}/available-slots?date=${date}`
    );
  },
};
