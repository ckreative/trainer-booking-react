import { cn } from './utils';

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export function TimeSlot({ time, isSelected, isDisabled = false, onClick }: TimeSlotProps) {
  return (
    <button
      type="button"
      data-time={time}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'p-3 rounded-lg text-sm font-bold transition duration-150',
        isDisabled && 'opacity-50 cursor-not-allowed bg-slate-800 text-gray-500',
        !isDisabled && isSelected && 'bg-electric-lime text-slate-900',
        !isDisabled && !isSelected && 'bg-slate-700 text-white hover:bg-slate-600'
      )}
    >
      {time}
    </button>
  );
}
