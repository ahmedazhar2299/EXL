import React from "react";
import ReactDOM from "react-dom/client";
import "tailwindcss/tailwind.css";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "rsuite/dist/rsuite.min.css";
import { store } from "./redux/store/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence mode="wait" initial={true}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AnimatePresence>
    </Provider>
  </React.StrictMode>
);
