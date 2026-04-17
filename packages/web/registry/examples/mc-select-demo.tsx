import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectIcons,
  McSelectItem,
  McSelectLabel,
  McSelectSeparator,
  McSelectTrigger,
  McSelectValue,
} from '../ui/mc-select';
import { GlobeIcon } from 'lucide-react';

export function McSelectDemo() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Default */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Default</span>
        <McSelect>
          <McSelectTrigger>
            <McSelectValue placeholder="Select a fruit..." />
          </McSelectTrigger>
          <McSelectContent>
            <McSelectGroup>
              <McSelectLabel>Fruits</McSelectLabel>
              <McSelectItem value="apple">Apple</McSelectItem>
              <McSelectItem value="banana">Banana</McSelectItem>
              <McSelectItem value="orange">Orange</McSelectItem>
            </McSelectGroup>
            <McSelectSeparator />
            <McSelectGroup>
              <McSelectLabel>Vegetables</McSelectLabel>
              <McSelectItem value="carrot">Carrot</McSelectItem>
              <McSelectItem value="potato">Potato</McSelectItem>
              <McSelectItem value="tomato">Tomato</McSelectItem>
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>

      {/* With Icon */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">With Icon</span>
        <McSelect>
          <McSelectTrigger>
            <McSelectIcons>
              <GlobeIcon />
            </McSelectIcons>
            <McSelectValue placeholder="Select a country..." />
          </McSelectTrigger>
          <McSelectContent>
            <McSelectGroup>
              <McSelectLabel>Europe</McSelectLabel>
              <McSelectItem value="france">France</McSelectItem>
              <McSelectItem value="germany">Germany</McSelectItem>
            </McSelectGroup>
            <McSelectSeparator />
            <McSelectGroup>
              <McSelectLabel>Africa</McSelectLabel>
              <McSelectItem value="algeria">Algeria</McSelectItem>
              <McSelectItem value="morocco">Morocco</McSelectItem>
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>

      {/* Small */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Small</span>
        <McSelect>
          <McSelectTrigger size="sm">
            <McSelectValue placeholder="Select..." />
          </McSelectTrigger>
          <McSelectContent>
            <McSelectGroup>
              <McSelectLabel>Options</McSelectLabel>
              <McSelectItem value="one">Option One</McSelectItem>
              <McSelectItem value="two">Option Two</McSelectItem>
              <McSelectItem value="three">Option Three</McSelectItem>
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Disabled</span>
        <McSelect disabled>
          <McSelectTrigger>
            <McSelectValue placeholder="Disabled..." />
          </McSelectTrigger>
          <McSelectContent>
            <McSelectGroup>
              <McSelectItem value="one">Option One</McSelectItem>
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    </div>
  );
}
