'use client';

import * as React from 'react';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxSearch,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from '@/registry/ui/mc-combobox';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix'] as const;

export default function ComboboxDemo() {
  const [selectedValue, setSelectedValue] = React.useState('select a framework');
  return (
    <div className="flex items-start justify-start mb-50">
      <Combobox
        items={frameworks}
        value={selectedValue}
        onValueChange={(val) => setSelectedValue(val as string)}
      >
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
    </div>
  );
}
