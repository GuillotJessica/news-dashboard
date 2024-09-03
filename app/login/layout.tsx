import { GeistSans } from 'geist/font/sans';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <nav className="flex items-center justify-between bg-gray-800 px-4 py-3 text-white">
          <a className="text-xl font-bold tracking-tight" href="/">
            News Dashboard
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
