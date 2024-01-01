import { createRoot } from "react-dom/client";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";
import { store } from "./store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container);

initI18n().then(() => {
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
});
