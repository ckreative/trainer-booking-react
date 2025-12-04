import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TrainerHeader } from '../components/TrainerHeader';
import { DateSelector } from '../components/DateSelector';
import { TimeSlotSelector } from '../components/TimeSlotSelector';
import { Trainer, AvailableDate, TimeSlot } from '../types/trainer';

// Generate available dates for the next 14 days
function generateAvailableDates(): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Generate time slots for this date
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      // Random availability for demo
      const available = Math.random() > 0.3;
      slots.push({
        time: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
        available,
      });
      slots.push({
        time: `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`,
        available: Math.random() > 0.3,
      });
    }

    dates.push({
      date,
      dayName: dayNames[date.getDay()],
      dayNumber: date.getDate(),
      monthName: monthNames[date.getMonth()],
      slots,
    });
  }

  return dates;
}

// Mock trainer data
const mockTrainer: Trainer = {
  id: '1',
  slug: 'sarah-johnson',
  name: 'Sarah Johnson',
  profileImage:
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
  rating: 4.9,
  specialty: 'HIIT & Strength Training',
  bio: 'Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals through customized training programs.',
  sessionRate: 75,
};

export function BookingPage() {
  const { trainerSlug } = useParams<{ trainerSlug: string }>();
  const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // In a real app, this would fetch based on trainerSlug
  const trainer = mockTrainer;

  const availableDates = useMemo(() => generateAvailableDates(), []);

  const handleSelectDate = (date: AvailableDate) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  const handleSelectSlot = (time: string) => {
    setSelectedSlot(time);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
      }}
    >
      {/* Trainer Header */}
      <TrainerHeader trainer={trainer} />

      {/* Booking Section */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2
            className="text-xl font-semibold"
            style={{ color: '#111827', marginBottom: '0.5rem' }}
          >
            Book Your Session
          </h2>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            Select a date and time that works for you
          </p>
        </div>

        {/* White Card Container */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Date Selector */}
          <DateSelector
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />

          {/* Time Slot Selector */}
          <TimeSlotSelector
            slots={selectedDate?.slots || []}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />

          {/* Continue Button */}
          {selectedSlot && selectedDate && (
            <div style={{ marginTop: '2rem' }}>
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '0.75rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Continue to Checkout
              </button>
              <p
                className="text-sm"
                style={{
                  textAlign: 'center',
                  color: '#6b7280',
                  marginTop: '0.75rem',
                }}
              >
                {selectedDate.dayName}, {selectedDate.monthName}{' '}
                {selectedDate.dayNumber} at {selectedSlot}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
