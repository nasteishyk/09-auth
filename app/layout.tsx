import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub — сучасний застосунок для створення, збереження та організації ваших нотаток.',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub — сучасний застосунок для створення, збереження та організації ваших нотаток.',
    url: 'https://notehub.goit.global/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Open Graph Image',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanstackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>

            <Footer />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
