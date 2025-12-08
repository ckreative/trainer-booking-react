import { cn } from './utils';

interface DateChipProps {
  date: string;
  displayText: string;
  isSelected: boolean;
  onClick: () => void;
}

export function DateChip({ date, displayText, isSelected, onClick }: DateChipProps) {
  return (
    <button
      type="button"
      data-date={date}
      onClick={onClick}
      className={cn(
        'flex-shrink-0 p-3 rounded-lg text-sm font-bold transition duration-150',
        isSelected
          ? 'bg-electric-lime text-slate-900'
          : 'bg-slate-700 text-white hover:bg-slate-600'
      )}
    >
      {displayText}
    </button>
  );
}
