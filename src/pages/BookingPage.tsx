import { useState, useMemo, FormEvent } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { DateChip } from '../components/ui/DateChip';
import { TimeSlot } from '../components/ui/TimeSlot';

interface BookingFormData {
  name: string;
  email: string;
  goal: string;
}

const GOALS = [
  { value: 'strength', label: 'Maximum Strength Gain' },
  { value: 'fatloss', label: 'Rapid Fat Loss / Shredding' },
  { value: 'endurance', label: 'Endurance & Stamina Boost' },
  { value: 'rehab', label: 'Post-Injury Rehabilitation' },
];

const TIME_SLOTS = [
  '9:00 AM',
  '11:30 AM',
  '1:00 PM',
  '4:30 PM',
  '6:00 PM',
  '7:15 PM',
];

function generateDates(count: number): { date: string; display: string }[] {
  const dates: { date: string; display: string }[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = date.getDate();

    dates.push({
      date: `${dayName}, ${monthName} ${dayNum}`,
      display: `${dayName} ${dayNum}`,
    });
  }

  return dates;
}

export function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    goal: '',
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dates = useMemo(() => generateDates(5), []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setIsSubmitted(true);
  };

  const isFormValid = selectedDate && selectedTime && formData.name && formData.email && formData.goal;

  const buttonText = selectedDate && selectedTime
    ? `CONFIRM 15-MIN GOAL CALL: ${selectedTime} ON ${selectedDate} →`
    : 'SELECT TIME AND DATE TO CONFIRM →';

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <section className="flex-1 py-16 px-4 md:py-24">
        <div className="max-w-xl mx-auto">
          <h3 className="text-4xl font-extrabold text-center text-white mb-4 uppercase">
            <span className="text-electric-lime">SECURE</span> YOUR 15-MIN GOAL SESSION
          </h3>
          <p className="text-center text-gray-400 mb-10">
            Let's discuss your targets. Choose your time slot and secure your introductory call.
          </p>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 bg-slate-800 rounded-2xl shadow-2xl border-t-4 border-electric-lime"
          >
            {/* Confirmation Message */}
            {isSubmitted ? (
              <div className="p-6 text-center rounded-lg bg-green-900/50 text-electric-lime font-bold">
                <p className="text-xl font-extrabold mb-2">BOOKING CONFIRMED!</p>
                <p className="text-sm font-medium">Session: 15-Min Goal Call</p>
                <p className="text-sm font-medium">
                  Date/Time: {selectedDate} at {selectedTime}
                </p>
                <p className="text-xs mt-3 text-gray-300">
                  A confirmation email with the meeting link is on its way.
                </p>
              </div>
            ) : (
              <>
                <Input
                  id="name"
                  label="Full Name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  placeholder="elite@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Select
                  id="goal"
                  label="Primary Goal"
                  required
                  placeholder="Select your dominant objective"
                  options={GOALS}
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                />

                {/* Date Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                    1. Choose a Date
                  </label>
                  <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
                    {dates.map((dateObj) => (
                      <DateChip
                        key={dateObj.date}
                        date={dateObj.date}
                        displayText={dateObj.display}
                        isSelected={selectedDate === dateObj.date}
                        onClick={() => setSelectedDate(dateObj.date)}
                      />
                    ))}
                  </div>
                </div>

                {/* Time Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                    2. Choose a Time (15-Min Intro)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <TimeSlot
                        key={time}
                        time={time}
                        isSelected={selectedTime === time}
                        onClick={() => setSelectedTime(time)}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-4 mt-6 rounded-xl font-extrabold uppercase tracking-widest text-lg transition duration-300 shadow-xl bg-electric-lime text-slate-900 hover:bg-electric-lime-dark hover:shadow-electric-lime/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buttonText}
                </button>
              </>
            )}
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Initial 15-minute session is complimentary. Full training rates apply thereafter.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
