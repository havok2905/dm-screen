import type { Preview } from "@storybook/react";

import '../src/designSystem/styles/reset.css';
import '../src/designSystem/styles/variables.css';
import '../src/designSystem/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
