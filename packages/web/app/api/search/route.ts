import { createFromSource } from 'fumadocs-core/search/server';

import { source } from '@/lib/source';

// Backs the default Fumadocs search dialog, which queries /api/search.
export const { GET } = createFromSource(source, {
  language: 'english',
});
