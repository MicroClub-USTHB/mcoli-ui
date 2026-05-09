'use client';

import { UserIcon } from 'lucide-react';

import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectGroupLabel,
  McSelectItem,
  McSelectLabel,
  McSelectTrigger,
  McSelectValue,
} from '@/registry/ui/mc-select';

export default function McSelectDemo() {
  return (
    <div className="w-fit">
      <McSelect defaultValue="designer">
        <McSelectLabel>Role</McSelectLabel>
        <McSelectTrigger>
          <McSelectValue placeholder="Select a role" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team roles</McSelectGroupLabel>
            <McSelectItem value="designer" supportingText="Design interfaces">
              <span className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Designer
              </span>
            </McSelectItem>
            <McSelectItem value="developer" supportingText="Build product features">
              Developer
            </McSelectItem>
            <McSelectItem value="product" supportingText="Define product strategy">
              Product
            </McSelectItem>
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  );
}
