import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import {
  Combobox,
  ComboboxTrigger,
  ComboboxSearch,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from '@/registry/ui/mc-combobox';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const;

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;

function ComboboxDemo() {
  const [value, setValue] = React.useState('select a framework');

  return (
    <Combobox items={frameworks} value={value} onValueChange={(val) => setValue(val as string)}>
      <ComboboxTrigger className="shadow-sm border-slate-200" />
      <ComboboxContent>
        <ComboboxSearch placeholder="Search framework..." />
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Default: Story = {
  render: () => <ComboboxDemo />,
};
