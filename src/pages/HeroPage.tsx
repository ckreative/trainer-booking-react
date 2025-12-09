import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ValueCard } from '../components/ui/ValueCard';
import { useTrainer } from '../context/TrainerContext';

export function HeroPage() {
  const navigate = useNavigate();
  const { handle } = useParams<{ handle: string }>();
  const { trainer } = useTrainer();

  // Use trainer's hero image if available, otherwise use default
  const heroImageUrl = trainer?.heroImageUrl || '/images/hero-basketball.jpg';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col justify-end pb-8 md:pb-16 overflow-hidden min-h-[80vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImageUrl}
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Cinematic Overlay */}
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-lg mx-auto p-4 sm:p-6 lg:p-8">
          {/* Trainer Intro Block */}
          <div className="text-center mb-10">
            <p className="text-base font-semibold text-electric-lime uppercase tracking-widest mb-1">
              YOUR NEXT LEVEL
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase leading-none mb-3">
              <span className="text-electric-lime">DOMINATE</span> NOW
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-gray-300">
              Elite 1-on-1 coaching &amp; workout programs built for results.
            </h2>
          </div>

          {/* CTA Button Group */}
          <div className="space-y-4">
            {/* Primary CTA: Book a Session */}
            <button
              onClick={() => navigate(`/${handle}/book`)}
              className="w-full py-4 px-6 rounded-xl font-extrabold uppercase tracking-widest text-lg transition duration-300 shadow-xl bg-electric-lime text-slate-900 hover:bg-electric-lime-dark hover:shadow-electric-lime/50 focus:outline-none focus:ring-4 focus:ring-electric-lime/70"
            >
              BOOK MY FREE 15-MIN INTRO
            </button>

            {/* Secondary CTA: Access Videos */}
            <button
              onClick={() => navigate(`/${handle}/videos`)}
              className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-lg transition duration-300 bg-slate-800 text-white border-2 border-electric-lime hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-600"
            >
              ACCESS TRAINING VIDEOS <span className="ml-2">▶️</span>
            </button>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-8 text-center">
            <p className="text-sm font-light italic text-gray-400">
              "This isn't just training, it's a lifestyle upgrade." - Alex T.
            </p>
            <div className="flex justify-center items-center mt-2">
              <span className="text-yellow-400 text-xl tracking-tighter">★★★★★</span>
              <span className="ml-2 text-sm text-gray-400">(450+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clarity/Value Props Section */}
      <section className="py-16 px-4 md:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-extrabold text-center text-white mb-10 uppercase">
            Why Choose: The Elite Edge
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ValueCard
              icon="⚡️"
              title="CUSTOMIZED BLUEPRINT"
              description="Every session is optimized for your body's unique potential, designed to break plateaus."
            />
            <ValueCard
              icon="🏆"
              title="GUARANTEED RESULTS"
              description="Commit for 90 days and see undeniable progress or your next program is on us. No excuses."
            />
            <ValueCard
              icon="📲"
              title="24/7 ELITE SUPPORT"
              description="Direct access to your coach for nutrition and motivation, whenever you need to stay on track."
            />
          </div>

          {/* Re-iterate CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-electric-lime font-bold uppercase tracking-wider hover:text-white transition duration-200"
            >
              Ready to crush your goals? Tap here to decide. →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
