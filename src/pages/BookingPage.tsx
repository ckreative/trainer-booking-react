import { useState, useMemo, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { DateChip } from '../components/ui/DateChip';
import { TimeSlot } from '../components/ui/TimeSlot';
import { bookingService } from '../services/bookingService';
import { eventTypeService } from '../services/eventTypeService';
import type { Booking } from '../types/booking';
import type { EventType, DaySchedule } from '../types/eventType';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface BookingFormData {
  name: string;
  email: string;
  eventTypeId: string;
  notes: string;
}

interface DateInfo {
  date: string;
  display: string;
  isoDate: string;
  dayOfWeek: string;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Generate dates filtered by availability schedule
function generateAvailableDates(count: number, schedule?: DaySchedule[]): DateInfo[] {
  const dates: DateInfo[] = [];
  const today = new Date();
  let daysChecked = 0;
  let i = 1;

  // Get enabled days from schedule
  const enabledDays = schedule
    ? schedule.filter(d => d.enabled).map(d => d.day)
    : DAY_NAMES; // All days if no schedule

  while (dates.length < count && daysChecked < 30) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = DAY_NAMES[date.getDay()];

    // Only include if day is enabled in schedule
    if (enabledDays.includes(dayOfWeek)) {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = date.getDate();

      dates.push({
        date: `${dayName}, ${monthName} ${dayNum}`,
        display: `${dayName} ${dayNum}`,
        isoDate: date.toISOString().split('T')[0],
        dayOfWeek,
      });
    }

    i++;
    daysChecked++;
  }

  return dates;
}

// Generate time slots from availability schedule
function generateTimeSlots(dayOfWeek: string, schedule?: DaySchedule[], duration: number = 15): string[] {
  if (!schedule) {
    // Default slots if no schedule
    return ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  }

  const daySchedule = schedule.find(d => d.day === dayOfWeek);
  if (!daySchedule || !daySchedule.enabled || daySchedule.slots.length === 0) {
    return [];
  }

  const slots: string[] = [];

  for (const slot of daySchedule.slots) {
    // Parse start and end times
    const [startHour, startMin] = slot.start.split(':').map(Number);
    const [endHour, endMin] = slot.end.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    // Generate slots at interval of event duration
    for (let time = startMinutes; time + duration <= endMinutes; time += duration) {
      const hour = Math.floor(time / 60);
      const min = time % 60;

      // Convert to 12-hour format
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const timeStr = `${hour12}:${String(min).padStart(2, '0')} ${period}`;

      slots.push(timeStr);
    }
  }

  return slots;
}

function parseTimeSlot(time: string, dateStr: string): string {
  const [timePart, period] = time.split(' ');
  const [hours, minutes] = timePart.split(':').map(Number);

  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;

  const dateTime = new Date(`${dateStr}T${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
  return dateTime.toISOString();
}

export function BookingPage() {
  const { handle } = useParams<{ handle: string }>();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    eventTypeId: '',
    notes: '',
  });
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [isLoadingEventTypes, setIsLoadingEventTypes] = useState(true);
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const selectedEventType = eventTypes.find((et) => et.id === formData.eventTypeId);

  // Generate available dates based on selected event type's availability
  const dates = useMemo(() => {
    return generateAvailableDates(5, selectedEventType?.availability?.schedule);
  }, [selectedEventType]);

  // Generate time slots based on selected date and event type
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(
      selectedDate.dayOfWeek,
      selectedEventType?.availability?.schedule,
      selectedEventType?.duration || 15
    );
  }, [selectedDate, selectedEventType]);

  // Reset date/time when event type changes
  const handleEventTypeChange = (eventTypeId: string) => {
    setFormData({ ...formData, eventTypeId });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Reset time when date changes
  const handleDateChange = (date: DateInfo) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // Fetch event types on mount
  useEffect(() => {
    async function fetchEventTypes() {
      if (!handle) return;

      try {
        setIsLoadingEventTypes(true);
        const types = await eventTypeService.getByHandle(handle);
        setEventTypes(types);

        // Auto-select first event type if only one
        if (types.length === 1) {
          setFormData((prev) => ({ ...prev, eventTypeId: types[0].id }));
        }
      } catch (err) {
        setError('Failed to load session types');
      } finally {
        setIsLoadingEventTypes(false);
      }
    }

    fetchEventTypes();
  }, [handle]);

  // Validate email on blur
  const handleEmailBlur = () => {
    if (formData.email && !EMAIL_REGEX.test(formData.email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
  };

  // Show confirmation modal instead of submitting directly
  const handleSubmitClick = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !handle || !formData.eventTypeId) return;

    // Validate email before showing modal
    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setShowConfirmModal(true);
  };

  // Actually submit the booking after confirmation
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !handle || !formData.eventTypeId) return;

    setIsSubmitting(true);
    setError(null);
    setShowConfirmModal(false);

    try {
      const startTime = parseTimeSlot(selectedTime, selectedDate.isoDate);

      const result = await bookingService.create(handle, {
        eventTypeId: formData.eventTypeId,
        startTime,
        attendeeName: formData.name,
        attendeeEmail: formData.email,
        notes: formData.notes || undefined,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      setBooking(result);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    formData.name &&
    formData.email &&
    !emailError &&
    formData.eventTypeId &&
    !isSubmitting;

  const sessionDuration = selectedEventType?.duration || 15;
  const buttonText = isSubmitting
    ? 'BOOKING...'
    : selectedDate && selectedTime
      ? `CONFIRM ${sessionDuration}-MIN SESSION: ${selectedTime} ON ${selectedDate.date} →`
      : 'SELECT TIME AND DATE TO CONFIRM →';

  const eventTypeOptions = eventTypes.map((et) => ({
    value: et.id,
    label: `${et.title} (${et.duration} min)`,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <section className="flex-1 py-16 px-4 md:py-24">
        <div className="max-w-xl mx-auto">
          <h3 className="text-4xl font-extrabold text-center text-white mb-4 uppercase">
            <span className="text-electric-lime">SECURE</span> YOUR SESSION
          </h3>
          <p className="text-center text-gray-400 mb-10">
            Choose your session type, pick a time slot, and let's get started.
          </p>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmitClick}
            className="space-y-6 p-6 bg-slate-800 rounded-2xl shadow-2xl border-t-4 border-electric-lime"
          >
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-900/50 text-red-300 font-medium mb-4">
                <p>{error}</p>
              </div>
            )}

            {/* Confirmation Message */}
            {isSubmitted && booking ? (
              <div className="p-6 text-center rounded-lg bg-green-900/50 text-electric-lime font-bold">
                <p className="text-xl font-extrabold mb-2">BOOKING CONFIRMED!</p>
                <p className="text-sm font-medium">Session: {booking.title}</p>
                <p className="text-sm font-medium">
                  Date/Time: {selectedDate?.date} at {selectedTime}
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (emailError) setEmailError(null);
                  }}
                  onBlur={handleEmailBlur}
                  error={emailError || undefined}
                />

                {/* Session Type Selector */}
                {isLoadingEventTypes ? (
                  <div className="py-4 text-center text-gray-400">
                    Loading session types...
                  </div>
                ) : eventTypes.length === 0 ? (
                  <div className="py-4 text-center text-red-400">
                    No session types available. Please contact the trainer.
                  </div>
                ) : eventTypes.length === 1 ? (
                  <div className="py-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      Session Type
                    </label>
                    <div className="p-3 bg-slate-700 rounded-lg text-white">
                      {eventTypes[0].title} ({eventTypes[0].duration} min)
                      {eventTypes[0].description && (
                        <p className="text-sm text-gray-400 mt-1">{eventTypes[0].description}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Select
                    id="eventType"
                    label="Session Type"
                    required
                    placeholder="Select a session type"
                    options={eventTypeOptions}
                    value={formData.eventTypeId}
                    onChange={(e) => handleEventTypeChange(e.target.value)}
                  />
                )}

                {/* Date Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                    1. Choose a Date
                  </label>
                  {!formData.eventTypeId ? (
                    <p className="text-gray-500 text-sm">Select a session type first</p>
                  ) : dates.length === 0 ? (
                    <p className="text-gray-500 text-sm">No available dates for this session type</p>
                  ) : (
                    <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
                      {dates.map((dateObj) => (
                        <DateChip
                          key={dateObj.date}
                          date={dateObj.date}
                          displayText={dateObj.display}
                          isSelected={selectedDate?.date === dateObj.date}
                          onClick={() => handleDateChange(dateObj)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Time Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                    2. Choose a Time
                  </label>
                  {!selectedDate ? (
                    <p className="text-gray-500 text-sm">Select a date first to see available times</p>
                  ) : timeSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No available times for this date</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <TimeSlot
                          key={time}
                          time={time}
                          isSelected={selectedTime === time}
                          onClick={() => setSelectedTime(time)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Optional Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider"
                  >
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Any goals or topics you'd like to discuss..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-lime focus:border-transparent"
                  />
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
            Session availability subject to trainer's schedule.
          </p>
        </div>
      </section>

      <Footer />

      {/* Confirmation Modal */}
      <Dialog.Root open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-800 p-6 shadow-2xl border-t-4 border-electric-lime focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <Dialog.Title className="text-xl font-extrabold text-white mb-4 uppercase">
              Confirm Your Booking
            </Dialog.Title>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Session Type</p>
                <p className="text-white font-semibold">
                  {selectedEventType?.title} ({selectedEventType?.duration} min)
                </p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date & Time</p>
                <p className="text-white font-semibold">
                  {selectedDate?.date} at {selectedTime}
                </p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Your Details</p>
                <p className="text-white font-semibold">{formData.name}</p>
                <p className="text-gray-300 text-sm">{formData.email}</p>
              </div>

              {formData.notes && (
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-gray-300 text-sm">{formData.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-lg font-bold uppercase tracking-wider text-gray-300 bg-slate-700 hover:bg-slate-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-lg font-bold uppercase tracking-wider text-slate-900 bg-electric-lime hover:bg-electric-lime-dark transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Booking...' : 'Confirm'}
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-white hover:bg-slate-700 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
