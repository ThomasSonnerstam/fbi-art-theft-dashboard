import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { queryClient } from "./queries/queryClient";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";

const theme = createTheme({
  components: {
    Modal: {
      defaultProps: {
        overlayProps: {
          blur: 10,
          backgroundOpacity: 0.55,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
