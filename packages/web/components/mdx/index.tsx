import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Card } from 'fumadocs-ui/components/card';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

import { ComponentPreview } from './component-preview';
import { ComponentSource } from './component-source';

const TerminalTab = ({ className, ...props }: React.ComponentProps<typeof Tab>) => {
  return <Tab className={cn('font-mono text-sm', className)} {...props} />;
};

/** Landing-style tile: lifts and picks up the primary tint on hover. */
const DocsCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
  return (
    <Card
      className={cn(
        'shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg',
        className
      )}
      {...props}
    />
  );
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: (props) => (
      <CodeBlock {...props} className={cn('shadow-xs', props.className)}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Card: DocsCard,
    ComponentPreview,
    ComponentSource,
    Tabs,
    Tab: TerminalTab,
    Steps,
    Step,
    ...components,
  };
}
