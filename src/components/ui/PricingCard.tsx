import { cn } from './utils';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  buttonText: string;
  onButtonClick?: () => void;
  isFeatured?: boolean;
  badge?: string;
}

export function PricingCard({
  title,
  subtitle,
  price,
  priceSubtext,
  features,
  buttonText,
  onButtonClick,
  isFeatured = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'p-8 rounded-2xl shadow-xl text-center relative',
        isFeatured
          ? 'bg-slate-700 border-b-8 border-electric-lime transform scale-100 lg:scale-[1.05]'
          : 'bg-slate-800 border-b-8 border-slate-700'
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-electric-lime text-slate-900 font-extrabold text-xs rounded-full uppercase tracking-wider">
          {badge}
        </div>
      )}

      <h4
        className={cn(
          'text-2xl font-extrabold uppercase mb-2',
          isFeatured ? 'text-electric-lime text-3xl mt-4' : 'text-white'
        )}
      >
        {title}
      </h4>
      <p className={cn('mb-4', isFeatured ? 'text-gray-300' : 'text-gray-400')}>
        {subtitle}
      </p>

      <p
        className={cn(
          'font-extrabold mb-2',
          isFeatured ? 'text-6xl text-electric-lime' : 'text-5xl text-white'
        )}
      >
        {price}
      </p>
      {priceSubtext && (
        <p className="text-sm font-medium text-gray-300 mb-6">{priceSubtext}</p>
      )}

      <ul className={cn('text-left space-y-3 mb-8', isFeatured ? 'text-white' : 'text-gray-300')}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-electric-lime mr-3">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onButtonClick}
        className={cn(
          'w-full py-4 rounded-xl font-extrabold uppercase tracking-widest text-lg transition duration-300 shadow-xl',
          isFeatured
            ? 'bg-electric-lime text-slate-900 hover:bg-electric-lime-dark hover:shadow-electric-lime/50'
            : 'bg-slate-700 text-white hover:bg-slate-600'
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
