'use client';

import * as React from 'react';

import { McCalendar } from '../ui/mc-calendar';

export default function McCalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full max-w-fit rounded-2xl border border-border bg-background p-4">
      <McCalendar mode="single" captionLayout="dropdown" selected={date} onSelect={setDate} />
    </div>
  );
}
