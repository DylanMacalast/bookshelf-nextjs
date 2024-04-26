import React from 'react';
import '../styles/style.scss';
import { Metadata } from 'next';
import { Header } from '../components/organisms/Header';
import { Footer } from '../components/organisms/Footer';
import { verifySession } from './lib/dal';

export const metadata: Metadata = {
  title: 'Bookshelf App',
  description: 'Your AI bookshelf'
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await verifySession();

  return (
    <html>
      <body>
        <Header isAuth={session?.isAuth} />
        <main className="container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
