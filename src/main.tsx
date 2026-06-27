import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "../example/src/app/App.tsx";
import "../example/src/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
