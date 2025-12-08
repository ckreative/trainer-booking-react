import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  trainerName?: string;
}

export function Header({ trainerName = 'TRAINER X' }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm shadow-xl p-4 flex justify-between items-center border-b border-electric-lime/20">
      <h1 className="text-xl font-extrabold text-electric-lime uppercase tracking-widest">
        {trainerName}
      </h1>
      {!isHome && (
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-electric-lime transition duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Choices
        </button>
      )}
    </header>
  );
}
