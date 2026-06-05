'use client';

import * as React from 'react';
import {
  McCombobox,
  McComboboxTrigger,
  McComboboxSearch,
  McComboboxContent,
  McComboboxList,
  McComboboxItem,
} from '@/registry/ui/mc-combobox';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix'] as const;

export default function McComboboxDemo() {
  const [selectedValue, setSelectedValue] = React.useState('select a framework');
  return (
    <div className="flex items-start justify-start mb-50">
      <McCombobox
        items={frameworks}
        value={selectedValue}
        onValueChange={(val) => setSelectedValue(val as string)}
      >
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
    </div>
  );
}
