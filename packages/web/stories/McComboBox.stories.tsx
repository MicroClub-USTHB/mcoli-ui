import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import {
  McCombobox,
  McComboboxTrigger,
  McComboboxSearch,
  McComboboxContent,
  McComboboxList,
  McComboboxItem,
} from '@/registry/ui/mc-combobox';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const;

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof McCombobox> = {
  title: 'Components/McCombobox',
  component: McCombobox,
  tags: ['autodocs'],
};

export default meta;

function McComboboxDemo() {
  const [value, setValue] = React.useState('select a framework');

  return (
    <McCombobox items={frameworks} value={value} onValueChange={(val) => setValue(val as string)}>
      <McComboboxTrigger className="shadow-sm border-slate-200" />
      <McComboboxContent>
        <McComboboxSearch placeholder="Search framework..." />
        <McComboboxList>
          {(item: string) => (
            <McComboboxItem key={item} value={item}>
              {item}
            </McComboboxItem>
          )}
        </McComboboxList>
      </McComboboxContent>
    </McCombobox>
  );
}

export const Default: Story = {
  render: () => <McComboboxDemo />,
};
