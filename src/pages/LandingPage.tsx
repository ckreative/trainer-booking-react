export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-extrabold text-white uppercase tracking-widest">
            Trainer <span className="text-electric-lime">Booking</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Icon */}
          <div className="text-6xl mb-6">
            <span role="img" aria-label="fitness">💪</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white uppercase leading-tight mb-4">
            Book Your <span className="text-electric-lime">Elite</span> Training
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-8">
            This platform connects you with professional trainers for personalized 1-on-1 coaching sessions.
          </p>

          {/* Info Box */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <p className="text-gray-300 mb-4">
              To book a session, you'll need a trainer's unique booking link.
            </p>
            <p className="text-sm text-gray-500">
              Example: <code className="text-electric-lime bg-slate-800 px-2 py-1 rounded">yourdomain.com/trainer-handle</code>
            </p>
          </div>

          {/* Contact hint */}
          <p className="mt-8 text-sm text-gray-500">
            Don't have a link? Contact your trainer directly or check their social media.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-sm text-gray-600">
          Powered by Trainer Booking Platform
        </p>
      </footer>
    </div>
  );
}
