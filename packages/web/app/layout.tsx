import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { ColorThemeProvider } from '@/components/ColorThemeProvider';
import './globals.css';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const plusJakartaSansPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

const dmSansDmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mcoli-ui.microclub.info'),
  title: 'Mcoli UI – MicroClub UI Components Library',
  description:
    'Official React UI component library by MicroClub. Reusable, accessible, and customizable components for modern web apps. Built with Next.js and shadcn/ui. Documented and showcased using Fumadocs.',
  keywords: [
    'Mcoli UI',
    'MicroClub',
    'UI components',
    'React',
    'Next.js',
    'shadcn/ui',
    'Component Library',
    'Web Development',
    'Documentation',
    'Fumadocs',
  ],
  authors: [{ name: 'MicroClub' }],
  openGraph: {
    title: 'Mcoli UI – MicroClub UI Components Library',
    description:
      'Reusable, accessible, and customizable React components for modern web applications. Built with Next.js and shadcn/ui. Documented and showcased using Fumadocs.',
    url: 'https://github.com/MicroClub-USTHB/mcoli-ui',
    siteName: 'Mcoli UI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mcoli UI – MicroClub UI Components Library',
    description:
      'Reusable, accessible, and customizable React components for modern web applications.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(dmSansDmSans.variable, plusJakartaSansPlusJakartaSans.variable)}
    >
      <head>
        {/* SSR Flash Prevention Script */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('mcoli-ui-color-theme') || 'primary';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`antialiased`}>
        <ColorThemeProvider>
          <RootProvider>{children}</RootProvider>
        </ColorThemeProvider>
      </body>
    </html>
  );
}
