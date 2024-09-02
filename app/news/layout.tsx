import { GeistSans } from 'geist/font/sans';
import { signOut } from '../auth';
import { CategoryPicker } from './_components/CategoryPicker';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <nav className="flex items-center justify-between bg-gray-800 px-4 py-3 text-white">
          <a className="text-xl font-bold tracking-tight" href="#">
            News Dashboard
          </a>
          <div className="flex-2 flex items-center">
            <CategoryPicker />
            <SignOut />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
