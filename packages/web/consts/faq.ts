/** Landing page FAQ, shared by the accordion and the FAQPage JSON-LD so the two never drift. */
export const FAQ = [
  {
    q: 'Why copy components instead of installing a package?',
    a: 'Because you will want to change them. Copied source means no wrapper APIs, no version pinning and no waiting on a release to fix a padding. mcoli-ui is a registry, the same model shadcn/ui made popular.',
  },
  {
    q: 'Do I need shadcn/ui first?',
    a: 'Yes. The CLI checks for a components.json and stops if it is missing. Run npx shadcn@latest init once, then npx mcoli-ui init.',
  },
  {
    q: 'Can I use it in any project?',
    a: "Yes. It is MIT licensed and works in any React project. The themes carry Micro Club's identity, but the tokens are plain CSS variables you can retune.",
  },
  {
    q: 'Can I switch themes later?',
    a: 'Run npx mcoli-ui init with another theme name. Since every component reads the same variables, the new palette, radii and fonts apply everywhere at once.',
  },
];
