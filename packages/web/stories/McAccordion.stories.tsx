import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McAccordion,
  McAccordionContent,
  McAccordionItem,
  McAccordionTrigger,
} from '@/registry/ui/mc-accordion';
import { AccordionRoot } from '@base-ui/react';
import { JSX } from 'react/jsx-runtime';

const items = [
  {
    value: 'product',
    title: 'Product Information',
    content: [
      'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.',
      'Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.',
    ],
  },
  {
    value: 'shipping',
    title: 'Shipping Details',
    content: [
      'We offer standard (5-7 days), express (2-3 days), and overnight shipping.',
      'Free shipping on international orders is available once the minimum order amount is reached.',
    ],
  },
  {
    value: 'returns',
    title: 'Return Policy',
    content: [
      'Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days.',
    ],
  },
];

const meta: Meta<typeof McAccordion> = {
  title: 'Components/McAccordion',
  component: McAccordion,
  tags: ['autodocs'],
  args: {
    defaultValue: ['product'],
  },
};

export default meta;

type Story = StoryObj<typeof McAccordion>;

export const Playground: Story = {
  render: (args: JSX.IntrinsicAttributes & AccordionRoot.Props<any>) => (
    <McAccordion {...args} className="max-w-lg">
      {items.map((item) => (
        <McAccordionItem key={item.value} value={item.value}>
          <McAccordionTrigger>{item.title}</McAccordionTrigger>
          <McAccordionContent>
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </McAccordionContent>
        </McAccordionItem>
      ))}
    </McAccordion>
  ),
};

export const AllCollapsed: Story = {
  args: {
    defaultValue: undefined,
  },
  render: (args: JSX.IntrinsicAttributes & AccordionRoot.Props<any>) => (
    <McAccordion {...args} className="max-w-lg">
      {items.map((item) => (
        <McAccordionItem key={item.value} value={item.value}>
          <McAccordionTrigger>{item.title}</McAccordionTrigger>
          <McAccordionContent>
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </McAccordionContent>
        </McAccordionItem>
      ))}
    </McAccordion>
  ),
};
