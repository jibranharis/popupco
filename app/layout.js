import './globals.css';

export const metadata = {
  metadataBase: new URL('https://popupco.com'),
  title: {
    default: 'Pop Up Co. | Find space for your next pop-up',
    template: '%s | Pop Up Co.',
  },
  description: 'Launch your brand in person. Pop Up Co. helps vendors access curated pop-up events and short-term retail spaces across the Bay Area.',
  keywords: ['pop up market', 'retail space', 'short term rental', 'bay area vendors', 'pop up events', 'local brands'],
  openGraph: {
    title: 'Pop Up Co. | Find space for your next pop-up',
    description: 'Launch your brand in person. Browse curated retail spaces and markets.',
    type: 'website',
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
      </body>
    </html>
  );
}
