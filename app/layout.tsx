import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AP Systems — Web, IA & Luxury Services',
  description:
    'Sviluppo Web, Sistemi IA & Agenti, Social Media e Concierge Luxury. Soluzioni digitali avanzate by Alessandro Punzi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
