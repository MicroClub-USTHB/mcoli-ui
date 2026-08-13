import type { Meta, StoryObj } from '@storybook/nextjs';
import { McProgress } from '@/registry/ui/mc-progress';

interface McProgressStoryArgs {
  value: number;
  size: 'sm' | 'md' | 'lg';
  showLabel: boolean;
  segmented: boolean;
  segmentsCount: number;
}

const meta: Meta<McProgressStoryArgs> = {
  title: 'Components/McProgress',

  component: McProgress,

  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
      description: 'Valeur de progression entre 0 et 100',
    },

    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la barre de progression',
    },

    showLabel: {
      control: 'boolean',
      description: 'Affiche le pourcentage au-dessus',
    },

    segmented: {
      control: 'boolean',
      description: 'Active le mode progression segmentée',
    },

    segmentsCount: {
      control: {
        type: 'number',
        min: 2,
        max: 10,
        step: 1,
      },
      description: 'Nombre de segments en mode segmented',
    },
  },

  args: {
    value: 60,
    size: 'md',
    showLabel: true,
    segmented: false,
    segmentsCount: 4,
  },

  decorators: [
    (Story) => (
      <div className="p-12 w-full flex items-center justify-center">
        <div className="w-100">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<McProgressStoryArgs>;

export const Playground: Story = {
  render: (args) => (
    <McProgress
      value={args.value}
      size={args.size}
      showLabel={args.showLabel}
      segmented={args.segmented}
      segmentsCount={args.segmentsCount}
    />
  ),
};
