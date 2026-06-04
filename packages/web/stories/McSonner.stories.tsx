import type { Meta, StoryObj } from '@storybook/react';
import McSonner, { toast } from '@/registry/ui/mc-sonner';

interface ToastStoryArgs {
  variant: 'simple' | 'success' | 'warning' | 'error';
  text: string;
  supportText: string;
  hasAction: boolean;
}

const meta: Meta<ToastStoryArgs> = {
  title: 'Components/McSonner',
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'success', 'warning', 'error'],
      description: "Le type de toast à afficher (ajoute l'icône)",
    },
    text: {
      control: 'text',
      description: 'Le titre principal du toast',
    },
    supportText: {
      control: 'text',
      description: 'La description ou sous-texte du toast',
    },
    hasAction: {
      control: 'boolean',
      description: 'Affiche ou masque le bouton "undo"',
    },
  },
  args: {
    variant: 'simple',
    text: 'Event has been created',
    supportText: 'Sunday, December 03, 2023 at 9:00 AM',
    hasAction: true,
  },
  decorators: [
    (Story) => (
      <div className="p-12 flex flex-col items-center justify-center h-screen w-screen">
        <Story />
        <McSonner />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const triggerToast = () => {
      const toastOptions = {
        description: args.supportText,
        action: args.hasAction
          ? { label: 'undo', onClick: () => console.log('Undo clicked') }
          : undefined,
      };

      switch (args.variant) {
        case 'success':
          toast.success(args.text, toastOptions);
          break;
        case 'warning':
          toast.warning(args.text, toastOptions);
          break;
        case 'error':
          toast.error(args.text, toastOptions);
          break;
        default:
          toast(args.text, toastOptions);
          break;
      }
    };

    return (
      <button
        onClick={triggerToast}
        className="px-10 py-3.5 text-lg bg-primary hover:bg-primary/90 text-background rounded-lg  font-medium transition-all shadow-sm"
      >
        click
      </button>
    );
  },
};
