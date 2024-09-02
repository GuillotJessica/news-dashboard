import './globals.css';
import { GeistSans } from 'geist/font/sans';

export const metadata = {
  title: 'NewsDashboards - Welcome',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
