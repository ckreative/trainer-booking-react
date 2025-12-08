interface FooterProps {
  brandName?: string;
}

export function Footer({ brandName = '[Trainer Name/Brand]' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 text-center text-xs text-gray-500 bg-slate-900 border-t border-slate-800">
      <p>&copy; {currentYear} {brandName}. All Rights Reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-electric-lime transition duration-200">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-electric-lime transition duration-200">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
