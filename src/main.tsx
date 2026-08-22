import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthBootstrap } from "./components/layout/authBootstrap.tsx";
import { GlobalPendingOverlay } from "./components/layout/GlobalPendingOverlay.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthBootstrap>
          <App />
          <ToastContainer />
        </AuthBootstrap>
      </BrowserRouter>
      <GlobalPendingOverlay />
    </QueryClientProvider>
  </StrictMode>,
);
