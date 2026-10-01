import { Community } from '@/components/landing/Community';
import { ComponentShowcase } from '@/components/landing/ComponentShowcase';
import { Features } from '@/components/landing/Features';
import { FinalCta } from '@/components/landing/FinalCta';
import { ThemesAndFoundations } from '@/components/landing/Foundations';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { getGithubContributors, getGithubStars } from '@/lib/github';
import { ui } from '@/registry/registry-ui';

export default async function Home() {
  const [stars, contributors] = await Promise.all([getGithubStars(), getGithubContributors()]);
  const componentCount = ui.length;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
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
