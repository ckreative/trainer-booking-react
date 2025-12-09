import { api } from './api';
import type { TrainerConfig } from '../types/trainer';

export const trainerService = {
  async getByHandle(handle: string): Promise<TrainerConfig> {
    return api.get<TrainerConfig>(`/public/trainers/${handle}`);
  },
};
