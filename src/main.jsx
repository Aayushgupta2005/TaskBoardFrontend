import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
const ReactBeautifulDndCrashFixContext = React.createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactBeautifulDndCrashFixContext.Provider value={null}>
    <App />
  </ReactBeautifulDndCrashFixContext.Provider>
);