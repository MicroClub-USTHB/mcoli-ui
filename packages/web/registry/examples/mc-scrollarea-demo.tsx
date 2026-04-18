import * as React from 'react';
import Image from 'next/image';

import { ScrollArea, ScrollBar } from '@/registry/ui/mc-scrollarea';
import { Separator } from '@base-ui/react/separator';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function ScrollAreaDemo() {
  return <ScrollArea className="h-72 w-48" title="Tags" desc={tags}></ScrollArea>;
}
