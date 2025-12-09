import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { TrainerLayout } from './layouts/TrainerLayout';
import { HeroPage } from './pages/HeroPage';
import { BookingPage } from './pages/BookingPage';
import { VideosPage } from './pages/VideosPage';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page for root URL */}
        <Route path="/" element={<LandingPage />} />

        {/* Trainer routes - path-based multi-tenant */}
        <Route path="/:handle" element={<TrainerLayout />}>
          <Route index element={<HeroPage />} />
          <Route path="book" element={<BookingPage />} />
          <Route path="videos" element={<VideosPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
