import { McSlider } from '@/registry/ui/mc-slider';

export default function SliderDemo() {
  return <McSlider defaultValue={[75]} max={100} step={1} className="mx-auto w-full max-w-xs" />;
}
