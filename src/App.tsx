import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { BookingPage } from './pages/BookingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a default trainer for demo */}
        <Route path="/" element={<Navigate to="/book/sarah-johnson" replace />} />

        {/* Main booking route */}
        <Route path="/book/:trainerSlug" element={<BookingPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
