import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://popupco.vercel.app'),
  title: {
    default: 'PopUpCo | Find your next pop-up opportunity',
    template: '%s | PopUpCo',
  },
  description: 'PopUpCo connects vendors, hosts, and venues so local markets, pop-ups, and community events can come to life.',
  keywords: ['pop up market', 'vendor marketplace', 'retail space', 'bay area vendors', 'pop up events', 'local brands'],
  openGraph: {
    title: 'PopUpCo | Find your next pop-up opportunity',
    description: 'Find vendor markets, booth opportunities, retail spaces, and local pop-up events.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PopUpCo | Find your next pop-up opportunity',
    description: 'Find vendor markets, booth opportunities, retail spaces, and local pop-up events.',
  },
};

import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
