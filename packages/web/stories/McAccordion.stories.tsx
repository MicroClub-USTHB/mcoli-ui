import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/mc-accordion';

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

const meta: Meta<typeof Accordion> = {
  title: 'Components/McAccordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    defaultValue: ['product'],
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const AllCollapsed: Story = {
  args: {
    defaultValue: undefined,
  },
  render: (args) => (
    <Accordion {...args} className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
