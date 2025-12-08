import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { HeroPage } from './pages/HeroPage';
import { BookingPage } from './pages/BookingPage';
import { VideosPage } from './pages/VideosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HeroPage />} />

        {/* Booking form */}
        <Route path="/book" element={<BookingPage />} />

        {/* Videos/Pricing */}
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
