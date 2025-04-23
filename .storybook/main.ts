import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  refs: {
    'blocks-kit': {
      title: 'Blocks Kit',
      url: 'http://localhost:6006',
    },
    'block-kit': {
      title: 'Block Kit',
      url: 'http://localhost:6007',
    },
    'ui': {
      title: 'UI',
      url: 'http://localhost:6008',
    },
  },
};

export default config; 