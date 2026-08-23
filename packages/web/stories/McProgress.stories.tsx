import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McProgress } from '@/registry/ui/mc-progress';

interface McProgressStoryArgs {
  value: number;
  max: number;
  size: 'sm' | 'md' | 'lg';

  // Linear progress
  variant: 'track' | 'segmented';
  segmentsCount: number;
  showFloatingLabel: boolean;
  showHeader: boolean;

  // Circle progress
  showValue: boolean;
  strokeWidth: number;
}

const meta: Meta<McProgressStoryArgs> = {
  title: 'Components/McProgress',
  component: McProgress,
  tags: ['autodocs'],

  argTypes: {
    // ==========================================
    // COMMON
    // ==========================================

    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
      description: 'Valeur actuelle de la progression',
    },

    max: {
      control: {
        type: 'number',
        min: 1,
      },
      description: 'Valeur maximale de la progression',
    },

    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },

    // ==========================================
    // LINEAR PROGRESS
    // ==========================================

    variant: {
      control: 'radio',
      options: ['track', 'segmented'],
      description: 'Type de barre : continue ou segmentée',
    },

    segmentsCount: {
      control: {
        type: 'number',
        min: 2,
        max: 10,
        step: 1,
      },
      description: 'Nombre de segments',
      if: {
        arg: 'variant',
        eq: 'segmented',
      },
    },

    showFloatingLabel: {
      control: 'boolean',
      description: 'Affiche le label dynamique au-dessus de la progression',
      if: {
        arg: 'variant',
        eq: 'track',
      },
    },

    showHeader: {
      control: 'boolean',
      description: 'Affiche un en-tête avec le label de progression',
    },

    // ==========================================
    // CIRCLE PROGRESS
    // ==========================================

    showValue: {
      control: 'boolean',
      description: 'Affiche la valeur au centre du cercle',
    },

    strokeWidth: {
      control: {
        type: 'range',
        min: 1,
        max: 20,
        step: 1,
      },
      description: 'Épaisseur du contour du cercle',
    },
  },

  args: {
    value: 60,
    max: 100,
    size: 'md',

    // Linear progress
    variant: 'track',
    segmentsCount: 4,
    showFloatingLabel: true,
    showHeader: false,

    // Circle progress
    showValue: true,
    strokeWidth: 6,
  },

  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-12 w-full flex items-center justify-center">
        <div className="w-96 max-w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<McProgressStoryArgs>;

// ======================================================
// LINEAR PROGRESS PLAYGROUND
// ======================================================

export const Playground: Story = {
  render: (args: McProgressStoryArgs) => {
    const { value, max, size, variant, segmentsCount, showFloatingLabel, showHeader } = args;

    return (
      <McProgress value={value} max={max} size={size}>
        {showHeader && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Progression</span>

            <McProgress.Label />
          </div>
        )}

        {showFloatingLabel && variant === 'track' && <McProgress.FloatingLabel />}

        {variant === 'segmented' ? (
          <McProgress.Segments count={segmentsCount} />
        ) : (
          <McProgress.Track />
        )}
      </McProgress>
    );
  },

  args: {
    value: 60,
    max: 100,
    size: 'md',

    variant: 'track',
    segmentsCount: 4,

    showFloatingLabel: true,
    showHeader: false,
  },
};

// ======================================================
// CIRCLE PROGRESS PLAYGROUND
// ======================================================

export const CirclePlayground: Story = {
  render: (args: McProgressStoryArgs) => {
    const { value, max, size, showValue, strokeWidth } = args;

    return (
      <McProgress value={value} max={max} size={size}>
        <McProgress.Circle showValue={showValue} strokeWidth={strokeWidth} />
      </McProgress>
    );
  },

  args: {
    value: 60,
    max: 100,
    size: 'md',

    showValue: true,
    strokeWidth: 6,
  },

  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-12 w-full flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};
