'use client';

import React from 'react';
import { McAlert } from '@/registry/ui/mc-alert';

export default function McAlertDemo() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">McAlert Component Demo</h1>

      <McAlert
        variant="success"
        title="Success! Your changes have been saved"
        description="This is an alert with icon, title and description."
      />

      <McAlert variant="default" title="This alert has a title and an icon. No description." />

      <McAlert
        variant="destructive"
        title="Unable to process your payment."
        description="Please verify your billing information and try again."
        items={['Check your card details', 'Ensure sufficient funds', 'Verify billing address']}
      />

      <McAlert
        variant="success"
        title="Long content example to demonstrate responsive width"
        description="This is a very long description that should cause the alert width to expand up to the maximum of 719px before the height increases. The component will grow with the content length."
      />
    </div>
  );
}
