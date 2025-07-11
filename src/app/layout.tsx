import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/components/react-query-provider';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} antialiased`}>
        <ReactQueryClientProvider>
          <Toaster />
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
