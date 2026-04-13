import { McTabs, McTabsList, McTabsTrigger } from '../ui/mc-tabs';

export default function McTabsDemo() {
  return (
    <McTabs defaultValue="tab1">
      <McTabsList>
        <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
        <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
        <McTabsTrigger value="tab3">Tab 3</McTabsTrigger>
      </McTabsList>
    </McTabs>
  );
}
