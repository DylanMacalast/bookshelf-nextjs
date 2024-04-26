import React from 'react';
import '../styles/style.scss';
import { Metadata } from 'next';
import { Header } from '../components/organisms/Header';
import { Footer } from '../components/organisms/Footer';

export const metadata: Metadata = {
  title: 'Bookshelf App',
  description: 'Your AI bookshelf'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <Header />
        <main className="container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
