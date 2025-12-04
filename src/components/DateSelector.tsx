import { Calendar } from 'lucide-react';
import { AvailableDate } from '../types/trainer';

interface DateSelectorProps {
  dates: AvailableDate[];
  selectedDate: AvailableDate | null;
  onSelectDate: (date: AvailableDate) => void;
}

export function DateSelector({
  dates,
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Section Label */}
      <div
        className="flex items-center"
        style={{ gap: '0.5rem', marginBottom: '1rem' }}
      >
        <Calendar className="h-5 w-5" style={{ color: '#6b7280' }} />
        <span
          className="text-sm font-medium"
          style={{ color: '#374151' }}
        >
          Select a Date
        </span>
      </div>

      {/* Date Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
        }}
      >
        {dates.map((dateItem) => {
          const isSelected =
            selectedDate?.date.getTime() === dateItem.date.getTime();

          return (
            <button
              key={dateItem.date.toISOString()}
              onClick={() => onSelectDate(dateItem)}
              className="text-left transition-all"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                border: isSelected
                  ? '2px solid #2563eb'
                  : '1px solid #e5e7eb',
                backgroundColor: isSelected ? '#eff6ff' : 'white',
                cursor: 'pointer',
              }}
            >
              <div
                className="text-sm font-medium"
                style={{
                  color: isSelected ? '#2563eb' : '#374151',
                }}
              >
                {dateItem.dayName}, {dateItem.monthName} {dateItem.dayNumber}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
