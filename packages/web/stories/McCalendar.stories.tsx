import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { McCalendar, McDatePicker } from '@/registry/ui/mc-calendar';

const meta = {
  title: 'Components/McCalendar',
  component: McCalendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'The selection mode of the calendar.',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the month/year caption is displayed.',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from adjacent months.',
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'Show week numbers.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all interaction with the calendar.',
    },
    buttonVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link'],
      description: 'Variant for the navigation buttons.',
    },
  },
  args: {
    mode: 'single',
    captionLayout: 'dropdown',
    showOutsideDays: true,
    showWeekNumber: false,
    buttonVariant: 'ghost',
  },
} satisfies Meta<typeof McCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return <McCalendar {...args} mode="single" selected={date} onSelect={setDate} />;
  },
};

export const WithDatePicker: Story = {
  name: 'With Date Picker',
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <div className="w-full max-w-2xl">
        <McDatePicker {...args} label="Submission date" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

export const WithoutOutsideDays: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <McCalendar
        {...args}
        mode="single"
        showOutsideDays={false}
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return <McCalendar {...args} mode="single" disabled selected={date} onSelect={setDate} />;
  },
};
