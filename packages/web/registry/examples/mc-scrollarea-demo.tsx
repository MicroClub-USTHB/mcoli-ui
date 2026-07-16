import { McScrollArea } from '@/registry/ui/mc-scrollarea';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function McScrollAreaDemo() {
  return <McScrollArea className="h-72 w-48" title="Tags" desc={tags}></McScrollArea>;
}
