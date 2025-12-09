import { api } from './api';
import type { Booking, CreateBookingData } from '../types/booking';

export const bookingService = {
  async create(handle: string, data: CreateBookingData): Promise<Booking> {
    return api.post<Booking>(`/public/trainers/${handle}/bookings`, data);
  },
};
