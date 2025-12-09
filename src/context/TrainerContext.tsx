import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainerService } from '../services/trainerService';
import type { TrainerConfig } from '../types/trainer';

interface TrainerContextType {
  trainer: TrainerConfig | null;
  isLoading: boolean;
  error: string | null;
}

const TrainerContext = createContext<TrainerContextType | undefined>(undefined);

interface TrainerProviderProps {
  children: ReactNode;
}

export function TrainerProvider({ children }: TrainerProviderProps) {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<TrainerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrainer() {
      if (!handle) {
        setError('No trainer handle provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await trainerService.getByHandle(handle);
        setTrainer(data);

        // Apply trainer's primary color as CSS variable
        if (data.primaryColor) {
          document.documentElement.style.setProperty('--color-primary', data.primaryColor);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trainer');
        // Could navigate to a 404 page here
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrainer();
  }, [handle, navigate]);

  return (
    <TrainerContext.Provider value={{ trainer, isLoading, error }}>
      {children}
    </TrainerContext.Provider>
  );
}

export function useTrainer() {
  const context = useContext(TrainerContext);
  if (context === undefined) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }
  return context;
}
