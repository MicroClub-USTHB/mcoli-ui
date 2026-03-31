import Link from "next/link";
import MCLogo from "@/components/MCLogo";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Get Started", href: "/docs/introduction" },
      { label: "Themes", href: "/docs/theming" },
      { label: "Components", href: "/docs/components" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      {
        label: "Changelog",
        href: "https://github.com/MicroClub-USTHB/mcoli-ui/blob/main/CHANGELOG.md",
      },
      {
        label: "Contributing",
        href: "https://github.com/MicroClub-USTHB/mcoli-ui/blob/main/CONTRIBUTING.md",
      },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      {
        label: "License",
        href: "https://github.com/MicroClub-USTHB/mcoli-ui/blob/main/LICENSE",
      },
    ],
  },
};

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http") || href.endsWith(".md") || href === "/LICENSE";

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
      {label}
    </Link>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/50 bg-card/50 w-full border-t backdrop-blur-xl">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <MCLogo size={40} />
            </Link>
            <p className="text-muted-foreground text-sm">
              Stop building from scratch. Elevate your UI with MicroClub DNA
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="flex flex-col gap-3">
              <h3 className="text-foreground text-sm font-semibold">{section.title}</h3>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-border/50 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">© {currentYear} Mcoli UI. All rights reserved.</p>
          <p className="text-muted-foreground text-sm">
            Built by{" "}
            <a
              href="https://microclub.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              the Dev Department of MicroClub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
