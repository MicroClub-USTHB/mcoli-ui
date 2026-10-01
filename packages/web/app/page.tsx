import { ComponentIndex } from '@/components/landing/ComponentIndex';
import { ComponentShowcase } from '@/components/landing/ComponentShowcase';
import { Faq } from '@/components/landing/Faq';
import { Features } from '@/components/landing/Features';
import { FinalCta } from '@/components/landing/FinalCta';
import { Foundations } from '@/components/landing/Foundations';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { Stats } from '@/components/landing/Stats';
import { ThemeGallery } from '@/components/landing/ThemeGallery';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getGithubStars } from '@/lib/github';
import { ui } from '@/registry/registry-ui';

export default async function Home() {
  const stars = await getGithubStars();
  const components = ui.map((item) => ({ name: item.name, title: item.title ?? item.name }));

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <SiteHeader stars={stars} />
      <main className="flex-1">
        <Hero componentCount={components.length} />
        <Stats componentCount={components.length} />
        <HowItWorks />
        <ThemeGallery />
        <ComponentShowcase />
        <ComponentIndex components={components} />
        <Foundations />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
