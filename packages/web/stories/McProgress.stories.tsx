import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McProgress } from '@/registry/ui/mc-progress';

interface McProgressStoryArgs {
  value: number;
  max: number;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // Linear progress
  variant: 'track' | 'segmented';
  segmentsCount: number;
  showFloatingLabel: boolean;
  showHeader: boolean;

  // Circle progress
  showValue: boolean;
  strokeWidth: number;

  // Stepper progress
  stepperOrientation: 'horizontal' | 'vertical';
  stepsCount: number;
  currentStep: number;
  completedVariant: 'completedBackground' | 'completedBorder';
  completedDisplay: 'icon' | 'number';
}

const meta: Meta<McProgressStoryArgs> = {
  title: 'Components/McProgress',
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
      description: 'Current progress value',
    },

    max: {
      control: {
        type: 'number',
        min: 1,
      },
      description: 'Maximum progress value',
    },

    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Component size',
    },

    // ==========================================
    // LINEAR PROGRESS
    // ==========================================

    variant: {
      control: 'radio',
      options: ['track', 'segmented'],
      description: 'Bar type: continuous or segmented',
    },

    segmentsCount: {
      control: {
        type: 'number',
        min: 2,
        max: 10,
        step: 1,
      },
      description: 'Number of segments',
      if: {
        arg: 'variant',
        eq: 'segmented',
      },
    },

    showFloatingLabel: {
      control: 'boolean',
      description: 'Show floating label above the progress bar',
      if: {
        arg: 'variant',
        eq: 'track',
      },
    },

    showHeader: {
      control: 'boolean',
      description: 'Show a header with the progress label',
    },

    // ==========================================
    // CIRCLE PROGRESS
    // ==========================================

    showValue: {
      control: 'boolean',
      description: 'Show value in the center of the circle',
    },

    strokeWidth: {
      control: {
        type: 'range',
        min: 1,
        max: 28,
        step: 1,
      },
      description: 'Circle stroke width, capped based on selected size',
    },

    // ==========================================
    // STEPPER PROGRESS
    // ==========================================

    stepperOrientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },

    stepsCount: {
      control: {
        type: 'number',
        min: 2,
        max: 6,
        step: 1,
      },
      description: 'Total number of steps in the stepper',
    },

    currentStep: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
        step: 1,
      },
      description: 'Current active step',
    },

    completedVariant: {
      control: 'radio',
      options: ['completedBackground', 'completedBorder'],
      description: 'Visual style for completed steps',
    },

    completedDisplay: {
      control: 'radio',
      options: ['icon', 'number'],
      description: 'Content shown in completed steps (icon or number)',
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

    // Stepper progress
    stepperOrientation: 'horizontal',
    stepsCount: 4,
    currentStep: 2,
    completedVariant: 'completedBackground',
    completedDisplay: 'icon',
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
            <span className="font-medium text-muted-foreground">Progress</span>
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
      <div className="flex flex-col items-center gap-2">
        <McProgress value={value} max={max} size={size}>
          <McProgress.Circle showValue={showValue} strokeWidth={strokeWidth} />
        </McProgress>
      </div>
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

// ======================================================
// STEPPER PROGRESS PLAYGROUND
// ======================================================

export const StepperPlayground: Story = {
  render: (args: McProgressStoryArgs) => {
    const {
      stepperOrientation,
      stepsCount,
      currentStep,
      size,
      completedVariant,
      completedDisplay,
    } = args;
    const stepperSize = size === 'xs' || size === 'xl' ? 'md' : size;

    return (
      <McProgress.Stepper orientation={stepperOrientation} size={stepperSize}>
        {Array.from({ length: stepsCount }).map((_, index) => {
          const stepNumber = index + 1;
          let status: 'completedBackground' | 'completedBorder' | 'active' | 'inactive' =
            'inactive';

          if (stepNumber < currentStep) {
            status = completedVariant;
          } else if (stepNumber === currentStep) {
            status = 'active';
          }

          const isLast = stepNumber === stepsCount;

          return (
            <React.Fragment key={stepNumber}>
              <McProgress.Step
                status={status}
                size={stepperSize}
                step={stepNumber}
                completed={completedDisplay}
              />
              {!isLast && (
                <McProgress.StepLine
                  active={stepNumber < currentStep}
                  orientation={stepperOrientation}
                  size={stepperSize}
                />
              )}
            </React.Fragment>
          );
        })}
      </McProgress.Stepper>
    );
  },

  args: {
    stepperOrientation: 'horizontal',
    stepsCount: 4,
    currentStep: 2,
    size: 'lg',
    completedVariant: 'completedBackground',
    completedDisplay: 'icon',
  },
};
