import { LinearProgress } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./components/Root";
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("app")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <StylesProvider>
        <Suspense fallback={<LinearProgress />}>
          <Root />
        </Suspense>
      </StylesProvider>
    </QueryClientProvider>
  </Router>
);
