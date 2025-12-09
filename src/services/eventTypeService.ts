import { api } from './api';
import type { EventType } from '../types/eventType';

export const eventTypeService = {
  async getByHandle(handle: string): Promise<EventType[]> {
    const response = await api.get<{ data: EventType[] }>(`/public/trainers/${handle}/event-types`);
    return response.data;
  },
};
