import { McTabs, McTabsList, McTabsPanel, McTabsTrigger } from '../ui/mc-tabs';

export default function McTabsDemo() {
  return (
    <McTabs defaultValue="tab1">
      <McTabsList>
        <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
        <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
        <McTabsTrigger value="tab3">Tab 3</McTabsTrigger>
      </McTabsList>
      <McTabsPanel value="tab1">Content for the first tab.</McTabsPanel>
      <McTabsPanel value="tab2">Content for the second tab.</McTabsPanel>
      <McTabsPanel value="tab3">Content for the third tab.</McTabsPanel>
    </McTabs>
  );
}
