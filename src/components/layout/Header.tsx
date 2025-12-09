import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTrainer } from '../../context/TrainerContext';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handle } = useParams<{ handle: string }>();
  const { trainer } = useTrainer();

  // Check if we're on the trainer's home page (e.g., /johndoe)
  const isHome = location.pathname === `/${handle}`;

  const brandName = trainer?.brandName || 'TRAINER';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm shadow-xl p-4 flex justify-between items-center border-b border-electric-lime/20">
      <h1 className="text-xl font-extrabold text-electric-lime uppercase tracking-widest">
        {brandName}
      </h1>
      {!isHome && (
        <button
          onClick={() => navigate(`/${handle}`)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-electric-lime transition duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Choices
        </button>
      )}
    </header>
  );
}
