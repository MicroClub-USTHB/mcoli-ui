import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McProgress } from '@/registry/ui/mc-progress';

// Interface des contrôles pour le Playground Storybook
interface McProgressStoryArgs {
  value: number;
  max: number;
  size: 'sm' | 'md' | 'lg';
  variant: 'track' | 'segmented';
  segmentsCount: number;
  showFloatingLabel: boolean;
  showHeader: boolean;
}

const meta: Meta<McProgressStoryArgs> = {
  title: 'Components/McProgress',
  component: McProgress,
  tags: ['autodocs'],

  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valeur actuelle de la progression',
    },

    max: {
      control: { type: 'number', min: 10 },
      description: 'Valeur maximale (ex: 100)',
    },

    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Hauteur / Taille globale du composant',
    },

    variant: {
      control: 'radio',
      options: ['track', 'segmented'],
      description: 'Type de barre : Continue (Track) ou Segmentée (Segments)',
    },

    segmentsCount: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
      description: 'Nombre de segments (si la variante est "segmented")',
      if: { arg: 'variant', eq: 'segmented' },
    },

    showFloatingLabel: {
      control: 'boolean',
      description: 'Affiche le label dynamique au-dessus qui suit la valeur',
    },

    showHeader: {
      control: 'boolean',
      description: 'Affiche un en-tête statique avec titre et label fixe',
    },
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

// Playground Storybook pour le composant McProgress

export const Playground: Story = {
  // FIX TS7031: Typage explicite des arguments destructurés pour la fonction render
  render: (args: McProgressStoryArgs) => {
    const { value, max, size, variant, segmentsCount, showFloatingLabel, showHeader } = args;

    return (
      <McProgress value={value} max={max} size={size}>
        {showHeader && (
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-muted-foreground">Progression</span>
            <McProgress.Label />
            {/* <McProgress.FloatingLabel /> */}
          </div>
        )}

        {showFloatingLabel && <McProgress.FloatingLabel />}

        {variant === 'segmented' ? (
          <McProgress.Segments count={segmentsCount} />
        ) : (
          <McProgress.Track />
        )}
      </McProgress>
    );
  },
};
