import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PricingCard } from '../components/ui/PricingCard';

export function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <section className="flex-1 py-16 px-4 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-extrabold text-center text-white mb-4 uppercase">
            <span className="text-electric-lime">PREVIEW</span> THE ELITE CONTENT
          </h3>
          <p className="text-center text-gray-400 mb-12">
            See the quality. Feel the intensity. This is what you're paying for.
          </p>

          {/* Video Preview */}
          <div className="mb-16">
            <h4 className="text-xl font-bold text-white mb-4 text-center uppercase tracking-widest">
              FREE DEMO WORKOUT: 10 MIN SHRED
            </h4>
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl border-4 border-electric-lime/50 transition duration-300 hover:border-electric-lime">
              {/* Mock Video Player */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4">
                <span className="text-electric-lime text-7xl mb-4 opacity-80">▶️</span>
                <p className="text-2xl font-bold text-white uppercase">WATCH SAMPLE NOW</p>
                <p className="text-sm text-gray-400 mt-2">
                  Professional production, high-intensity training, instant results.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-extrabold text-center text-white mb-10 uppercase">
            <span className="text-electric-lime">DOMINATE</span> YOUR PROGRAM
          </h3>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-2xl mx-auto">
            {/* Monthly Plan */}
            <PricingCard
              title="FLEX MONTHLY"
              subtitle="Commitment-free access"
              price="$39"
              priceSubtext="/mo"
              features={[
                'Full Library Access (All Workouts)',
                'Weekly New Videos & Programs',
                'Custom Workout Builder Tool',
                'Monthly Live Q&A Sessions',
              ]}
              buttonText="START MONTHLY →"
              onButtonClick={() => console.log('Monthly selected')}
            />

            {/* Annual Plan - Featured */}
            <PricingCard
              title="ANNUAL ELITE"
              subtitle="Save over $90 per year"
              price="$375"
              priceSubtext="/year (billed annually)"
              features={[
                '**Everything in Monthly**',
                'Dedicated Email Support',
                'Yearly Training Planner',
                'Priority Access to Beta Features',
              ]}
              buttonText="SUBSCRIBE ANNUALLY →"
              onButtonClick={() => console.log('Annual selected')}
              isFeatured
              badge="20% DISCOUNT | BEST VALUE"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
