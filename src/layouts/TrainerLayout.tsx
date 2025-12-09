import { Outlet } from 'react-router-dom';
import { TrainerProvider, useTrainer } from '../context/TrainerContext';

function TrainerContent() {
  const { isLoading, error } = useTrainer();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-electric-lime border-t-transparent mx-auto mb-4" />
          <p className="text-gray-400">Loading trainer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center p-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">Trainer Not Found</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-sm text-gray-500">
            The trainer you're looking for doesn't exist or may have moved.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export function TrainerLayout() {
  return (
    <TrainerProvider>
      <TrainerContent />
    </TrainerProvider>
  );
}
