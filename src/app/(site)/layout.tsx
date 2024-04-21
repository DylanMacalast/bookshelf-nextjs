import React from 'react';
import '../../styles/style.scss';
import { Header } from '../../components/organisms/Header';
import { Footer } from '../../components/organisms/Footer';
import { Metadata } from 'next';

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
