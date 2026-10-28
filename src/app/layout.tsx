import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import './globals.css';
import { ToastifyContainer } from '@/Toastify';

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Este é um blog com Next.js',
    template: '%s | The Blog',
  },
  description: 'Aplicativo para gerenciamento de posts. ',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR' className=''>
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
