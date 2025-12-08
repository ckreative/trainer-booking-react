interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center p-6 bg-slate-800 rounded-2xl shadow-lg border-t-4 border-electric-lime transform hover:scale-[1.02] transition duration-300">
      <span className="text-4xl text-electric-lime mb-3 block">{icon}</span>
      <p className="text-xl font-bold text-white mb-2">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
