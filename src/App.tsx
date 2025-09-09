import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import AppRoutes from "./routes";
import { store } from "./store";
import "./styles/globals.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="App">
              <AppRoutes />
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
