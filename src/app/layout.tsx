
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { I18nProvider } from '@/contexts/i18n-context';
import { Toaster } from '@/components/ui/toaster';
import { NotificationProvider } from '@/contexts/notification-context';

export const metadata: Metadata = {
  title: 'QuoteFlow',
  description: 'Internal Inquiry & Quotation Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <I18nProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
            <Toaster />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}