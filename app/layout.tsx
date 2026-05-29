import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AP Systems — Web, AI & Luxury Services',
  description:
    'Sviluppo Web, Sistemi AI & Agenti, Social Media e Concierge Luxury. Soluzioni digitali avanzate by Alessandro Punzi.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
