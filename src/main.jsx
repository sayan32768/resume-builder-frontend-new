import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { UserProvider } from "./contexts/UserContext";
import { Buffer } from "buffer";

window.Buffer = Buffer;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </BrowserRouter>,
);
