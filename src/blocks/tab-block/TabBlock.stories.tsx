import React from 'react';
import { action } from '@storybook/addon-actions';
import { TabBlock } from './TabBlock';
import { FaHome, FaUser, FaCog, FaInfoCircle, FaList, FaStar } from 'react-icons/fa';

export default {
  title: 'Blocks/TabBlock',
  component: TabBlock,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};

const tabs: TabBlockProps['tabs'] = [
  {
    label: 'Home',
    id: 'home',
    icon: <FaHome />,
    content: <div>Welcome to the Home tab!</div>,
  },
  {
    label: 'Profile',
    id: 'profile',
    icon: <FaUser />,
    content: <div>This is your profile.</div>,
  },
  {
    label: 'Settings',
    id: 'settings',
    icon: <FaCog />,
    content: <div>Adjust your settings here.</div>,
    disabled: false,
  },
];

export const Default = (args: TabBlockProps) => (
  <TabBlock {...args} />
);

Default.args = {
  tabs,
  orientation: 'horizontal',
  responsiveBreakpoint: 600,
  defaultActiveId: 'home',
};

// Story: Tabs con imágenes de avatar
const pictureTabs: TabBlockProps['tabs'] = [
  {
    label: 'Alice',
    id: 'alice',
    icon: <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Alice" style={{ width: 24, borderRadius: '50%' }} />,
    content: <div>This is Alice's tab.</div>,
  },
  {
    label: 'Bob',
    id: 'bob',
    icon: <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Bob" style={{ width: 24, borderRadius: '50%' }} />,
    content: <div>This is Bob's tab.</div>,
  },
  {
    label: 'Charlie',
    id: 'charlie',
    icon: <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="Charlie" style={{ width: 24, borderRadius: '50%' }} />,
    content: <div>This is Charlie's tab.</div>,
  },
];

export const WithPictures = (args: TabBlockProps) => (
  <TabBlock {...args} tabs={pictureTabs} />
);

WithPictures.args = {
  orientation: 'horizontal',
  responsiveBreakpoint: 600,
  defaultActiveId: 'alice',
};

// Product Info Tabs

export const ProductInfoTabs = () => (
  <TabBlock
    id="product-info-tabs"
    defaultActiveId="specs"
    orientation="horizontal"
    responsiveBreakpoint={600}
    tabs={[
      {
        id: "overview",
        label: "Overview",
        icon: <FaInfoCircle />,
        content: <div>Overview content here</div>
      },
      {
        id: "specs",
        label: "Specifications",
        icon: <FaList />,
        content: <div>Specs content here</div>
      },
      {
        id: "reviews",
        label: "Reviews",
        icon: <FaStar />,
        content: <div>Reviews content here</div>
      }
    ]}
    onChange={(id, data) => console.log(id, data)}
    // syncWithUrl={true} // Si tu componente soporta esta prop
  />
);

// Nueva historia: Navegación vertical con teclado
export const VerticalKeyboardNavigation = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
  ]}
  defaultTab="tab1"
  layout="vertical"
  responsiveBreakpoint={400}
  onChange={action('Tab changed')}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
          { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
          { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
        ]}
        defaultTab="tab1"
        layout="vertical"
        responsiveBreakpoint={400}
        onChange={action('Tab changed')}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const VerticalWithDisabledTab = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'tab1', label: 'Tab 1', icon: <FaHome />, content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', icon: <FaUser />, content: <div>Content 2</div>, disabled: true },
    { id: 'tab3', label: 'Tab 3', icon: <FaCog />, content: <div>Content 3</div> },
  ]}
  defaultTab="tab1"
  layout="vertical"
  responsiveBreakpoint={400}
  onChange={action('Tab changed')}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'tab1', label: 'Tab 1', icon: <FaHome />, content: <div>Content 1</div> },
          { id: 'tab2', label: 'Tab 2', icon: <FaUser />, content: <div>Content 2</div>, disabled: true },
          { id: 'tab3', label: 'Tab 3', icon: <FaCog />, content: <div>Content 3</div> },
        ]}
        defaultTab="tab1"
        layout="vertical"
        responsiveBreakpoint={400}
        onChange={action('Tab changed')}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const VerticalWithIcons = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'tab1', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
    { id: 'tab2', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
    { id: 'tab3', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
  ]}
  defaultTab="tab1"
  layout="vertical"
  responsiveBreakpoint={400}
  onChange={action('Tab changed')}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'tab1', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
          { id: 'tab2', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
          { id: 'tab3', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
        ]}
        defaultTab="tab1"
        layout="vertical"
        responsiveBreakpoint={400}
        onChange={action('Tab changed')}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 1. Basic with onChange
export const WithOnChange = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
    { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
    { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
  ]}
  defaultTab="home"
  layout="horizontal"
  onChange={action('Tab changed')}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
          { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
          { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
        ]}
        defaultTab="home"
        layout="horizontal"
        onChange={action('Tab changed')}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 2. With syncWithUrl
export const WithSyncWithUrl = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
    { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
    { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
  ]}
  defaultTab="home"
  layout="horizontal"
  syncWithUrl={true}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
          { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
          { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
        ]}
        defaultTab="home"
        layout="horizontal"
        syncWithUrl={true}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 3. Both onChange and syncWithUrl
export const WithOnChangeAndSync = () => {
  const code = `
<TabBlock
  tabs={[
    { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
    { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
    { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
  ]}
  defaultTab="home"
  layout="horizontal"
  onChange={action('Tab changed')}
  syncWithUrl={true}
/>
  `.trim();

  return (
    <div>
      <TabBlock
        tabs={[
          { id: 'home', label: 'Home', icon: <FaHome />, content: <div>Home content</div> },
          { id: 'profile', label: 'Profile', icon: <FaUser />, content: <div>Profile content</div> },
          { id: 'settings', label: 'Settings', icon: <FaCog />, content: <div>Settings content</div> },
        ]}
        defaultTab="home"
        layout="horizontal"
        onChange={action('Tab changed')}
        syncWithUrl={true}
      />
      <h4>Uso:</h4>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};