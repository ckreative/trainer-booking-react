import { Clock } from 'lucide-react';
import { TimeSlot } from '../types/trainer';

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (time: string) => void;
}

export function TimeSlotSelector({
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotSelectorProps) {
  if (slots.length === 0) {
    return (
      <div
        style={{
          marginTop: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#6b7280',
        }}
      >
        <Clock
          className="h-8 w-8"
          style={{ margin: '0 auto 0.5rem', color: '#d1d5db' }}
        />
        <p className="text-sm">Select a date to view available time slots</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Section Label */}
      <div
        className="flex items-center"
        style={{ gap: '0.5rem', marginBottom: '1rem' }}
      >
        <Clock className="h-5 w-5" style={{ color: '#6b7280' }} />
        <span className="text-sm font-medium" style={{ color: '#374151' }}>
          Select a Time
        </span>
      </div>

      {/* Time Slots Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
        }}
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.time;
          const isDisabled = !slot.available;

          return (
            <button
              key={slot.time}
              onClick={() => !isDisabled && onSelectSlot(slot.time)}
              disabled={isDisabled}
              className="transition-all"
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: isSelected
                  ? '2px solid #2563eb'
                  : '1px solid #e5e7eb',
                backgroundColor: isDisabled
                  ? '#f3f4f6'
                  : isSelected
                  ? '#eff6ff'
                  : 'white',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <span
                className="text-sm font-medium"
                style={{
                  color: isDisabled
                    ? '#9ca3af'
                    : isSelected
                    ? '#2563eb'
                    : '#374151',
                }}
              >
                {slot.time}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
