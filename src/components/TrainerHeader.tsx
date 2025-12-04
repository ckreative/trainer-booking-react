import { Star, Trophy } from 'lucide-react';
import { Trainer } from '../types/trainer';

interface TrainerHeaderProps {
  trainer: Trainer;
}

export function TrainerHeader({ trainer }: TrainerHeaderProps) {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: '#2563eb',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        className="flex items-start"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          gap: '2rem',
        }}
      >
        {/* Profile Image */}
        <div
          className="flex-shrink-0 rounded-full overflow-hidden"
          style={{
            width: '180px',
            height: '180px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <img
            src={trainer.profileImage}
            alt={trainer.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Trainer Info */}
        <div className="flex flex-col text-white" style={{ gap: '0.5rem' }}>
          {/* Rating */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            <Star
              className="h-5 w-5"
              style={{ fill: '#facc15', color: '#facc15' }}
            />
            <span className="text-sm" style={{ color: '#facc15' }}>
              {trainer.rating} Rating
            </span>
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold" style={{ color: 'white' }}>
            {trainer.name}
          </h1>

          {/* Specialty */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            <Trophy className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {trainer.specialty}
            </span>
          </div>

          {/* Bio */}
          <p
            className="text-sm"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: '0.5rem',
              maxWidth: '500px',
              lineHeight: '1.5',
            }}
          >
            {trainer.bio}
          </p>

          {/* Session Rate Badge */}
          <div
            className="inline-flex items-center rounded-full"
            style={{
              marginTop: '0.75rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="text-sm" style={{ color: 'white' }}>
              Session Rate: <strong>${trainer.sessionRate}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
