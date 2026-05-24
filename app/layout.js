import './globals.css';

export const metadata = {
  metadataBase: new URL('https://popupco.com'),
  title: {
    default: 'Pop Up Co. | Bay Area Pop-Up Markets & Retail Spaces',
    template: '%s | Pop Up Co.',
  },
  description: 'Pop Up Co. helps small brands, vendors, creators, nonprofits, and local businesses apply for curated pop-up events and short-term retail opportunities in the Bay Area.',
  keywords: ['pop up market', 'bay area vendors', 'pop up events', 'local brands', 'vendor application', 'retail pop up'],
  openGraph: {
    title: 'Pop Up Co. | Bay Area Pop-Up Markets & Retail Spaces',
    description: 'Launch your brand in person. Pop Up Co. helps vendors access curated pop-up events across the Bay Area.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
