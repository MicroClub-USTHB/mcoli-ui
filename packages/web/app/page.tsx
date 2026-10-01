import { Community } from '@/components/landing/Community';
import { ComponentShowcase } from '@/components/landing/ComponentShowcase';
import { Features } from '@/components/landing/Features';
import { FinalCta } from '@/components/landing/FinalCta';
import { ThemesAndFoundations } from '@/components/landing/Foundations';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { JsonLd } from '@/components/seo/JsonLd';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getGithubContributors, getGithubStars } from '@/lib/github';
import { getHomeJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';
import { ui } from '@/registry/registry-ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Canonical lives here, not in the root layout, so other routes never inherit "/".
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
};

export default async function Home() {
  const [stars, contributors] = await Promise.all([getGithubStars(), getGithubContributors()]);
  const componentCount = ui.length;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <JsonLd data={getHomeJsonLd()} />
      <SiteHeader stars={stars} />
      <main className="flex-1">
        <Hero componentCount={componentCount} />
        <HowItWorks />
        <ComponentShowcase componentCount={componentCount} />
        <ThemesAndFoundations />
        <Features />
        <Community contributors={contributors} />
        <FinalCta componentCount={componentCount} />
      </main>
      <SiteFooter />
    </div>
  );
}
