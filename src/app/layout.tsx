import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { FloatingCTA } from '@/components/floating-cta';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="8aebdc26-3d06-42e3-bb7c-f1c035c7f99b"
        />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}