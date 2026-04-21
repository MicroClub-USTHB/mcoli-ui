import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/mc-dialog';
import { McButton } from '@/registry/ui/mc-button';

type McDialogStoryProps = {
  title: string;
  description: string;
  showCloseButton: boolean;
  showFooter: boolean;
};

function McDialogStory({ title, description, showCloseButton, showFooter }: McDialogStoryProps) {
  return (
    <div className="flex min-h-80 items-center justify-center">
      <Dialog>
        <DialogTrigger
          render={
            <McButton variant="primary" size="md">
              Open dialog
            </McButton>
          }
        />
        <DialogContent className="gap-6" showCloseButton={showCloseButton}>
          <DialogHeader className="gap-2.5">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-2.5">
              <label
                htmlFor="name"
                className="font-sans text-sm leading-5 font-medium tracking-normal text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="h-9 w-[375px] max-w-full rounded-md border border-blue-primary-200 bg-transparent px-3 py-1 font-sans text-sm leading-5 font-normal tracking-normal text-foreground opacity-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-2.5">
              <label
                htmlFor="username"
                className="font-sans text-sm leading-5 font-medium tracking-normal text-muted-foreground"
              >
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="h-9 w-[375px] max-w-full rounded-md border border-blue-primary-200 bg-transparent px-3 py-1 font-sans text-sm leading-5 font-normal tracking-normal text-foreground opacity-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
          </form>

          {showFooter && (
            <DialogFooter showCloseButton={false}>
              <DialogClose
                render={
                  <McButton variant="secondary" size="md">
                    Cancel
                  </McButton>
                }
              />
              <DialogClose
                render={
                  <McButton variant="primary" size="md">
                    Save changes
                  </McButton>
                }
              />
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const meta: Meta<McDialogStoryProps> = {
  title: 'Components/McDialog',
  component: McDialogStory,
  render: (args) => <McDialogStory {...args} />,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
  args: {
    title: 'Edit profile',
    description: "Make changes to your profile here. Click save when you're done.",
    showCloseButton: true,
    showFooter: true,
  },
};

export default meta;
type Story = StoryObj<McDialogStoryProps>;

export const Playground: Story = {};

export const WithoutTopCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
};

export const WithoutFooter: Story = {
  args: {
    showFooter: false,
  },
};
