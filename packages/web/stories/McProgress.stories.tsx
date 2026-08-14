import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McProgress } from '@/registry/ui/test';

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
    // FIX TS7006: Typage explicite du composant Story passé au decorator
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

// ----------------------------------------------------------------------
// 1. PLAYGROUND INTERACTIF
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// 2. EXEMPLES D'UTILISATION
// ----------------------------------------------------------------------

// export const WithFloatingLabel: Story = {
//   render: () => (
//     <McProgress value={65}>
//       <McProgress.FloatingLabel />
//       <McProgress.Track />
//     </McProgress>
//   ),
// };

// export const SegmentedWithHeader: Story = {
//   render: () => (
//     <McProgress value={50}>
//       <div className="flex justify-between items-center">
//         <span className="text-xs font-medium">Étape 2 sur 4</span>
//         <McProgress.Label formatter={(val) => `${val}% complété`} />
//       </div>
//       <McProgress.Segments count={4} />
//     </McProgress>
//   ),
// };

// export const HorizontalInline: Story = {
//   render: () => (
//     <McProgress value={80} className="flex-row items-center gap-3">
//       <McProgress.Track className="flex-1" />
//       <McProgress.Label className="font-bold text-primary text-sm" />
//     </McProgress>
//   ),
// };

// export const CustomFormatter: Story = {
//   render: () => (
//     <McProgress value={750} max={1000}>
//       <div className="flex justify-between text-xs mb-1">
//         <span>Objectif de collecte</span>
//         <McProgress.Label formatter={(v) => `${v}% atteint`} />
//       </div>
//       <McProgress.FloatingLabel formatter={(v) => `$${v * 10} / $1000`} />
//       <McProgress.Track barClassName="bg-emerald-500" />
//     </McProgress>
//   ),
// };
