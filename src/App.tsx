import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { InvoiceProvider } from "./contexts/InvoiceContext";
import { LoaderProvider } from "./contexts/LoaderContext";

/**
 * Main application component that sets up the router and context providers.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App(): JSX.Element {
  return (
    <Router>
      <LoaderProvider>
        <AuthProvider>
          <InvoiceProvider>
            <Layout />
          </InvoiceProvider>
        </AuthProvider>
      </LoaderProvider>
    </Router>
  );
}

export default App;
