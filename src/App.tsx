import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { TrainerLayout } from './layouts/TrainerLayout';
import { HeroPage } from './pages/HeroPage';
import { BookingPage } from './pages/BookingPage';
import { VideosPage } from './pages/VideosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a default trainer or show a landing page */}
        <Route path="/" element={<Navigate to="/demo" replace />} />

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
