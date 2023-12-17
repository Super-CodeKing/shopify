import { createRoot } from 'react-dom/client';

import App from "./App";
import { initI18n } from "./utils/i18nUtils";

const container = document.getElementById('app');
const root = createRoot(container);

initI18n().then(() => {
  root.render(<App />);
});
