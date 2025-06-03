# TabBlock

A responsive, accessible tab/accordion block for organizing content.

## Usage

```tsx
import { TabBlock } from './TabBlock';

<TabBlock
  tabs={[
    { label: 'Tab 1', key: 'tab1', content: <div>Tab 1 content</div> },
    { label: 'Tab 2', key: 'tab2', content: <div>Tab 2 content</div> },
  ]}
  orientation="horizontal"
  responsiveBreakpoint={600}
/>
```