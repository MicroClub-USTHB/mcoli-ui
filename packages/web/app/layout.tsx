import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { ColorThemeProvider } from '@/components/ColorThemeProvider';
import './globals.css';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { site } from '@/lib/site';
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
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.organization.name, url: site.organization.url }],
  creator: site.organization.name,
  publisher: site.organization.name,
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
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
          <RootProvider search={{ preload: false }}>{children}</RootProvider>
        </ColorThemeProvider>
      </body>
    </html>
  );
}
