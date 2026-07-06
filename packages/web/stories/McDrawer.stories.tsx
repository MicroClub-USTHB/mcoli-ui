import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McDrawer,
  McDrawerClose,
  McDrawerContent,
  McDrawerDescription,
  McDrawerHeader,
  McDrawerTitle,
  McDrawerTrigger,
} from '@/registry/ui/mc-drawer';

function DrawerDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <McDrawer direction="right">
        <McDrawerTrigger className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Open drawer
        </McDrawerTrigger>
        <McDrawerContent>
          <McDrawerHeader>
            <McDrawerTitle>Settings</McDrawerTitle>
            <McDrawerDescription>Update your workspace preferences.</McDrawerDescription>
          </McDrawerHeader>
          <McDrawerClose className="w-full rounded-lg bg-primary py-4 text-sm font-medium text-primary-foreground">
            Save
          </McDrawerClose>
        </McDrawerContent>
      </McDrawer>
    </div>
  );
}

const meta: Meta<typeof DrawerDemo> = {
  title: 'Components/McDrawer',
  component: DrawerDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DrawerDemo>;

export const Default: Story = {};
