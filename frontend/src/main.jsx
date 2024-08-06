import React from "react";
import "./globals.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { useState } from "react";
import { SubmitDataContext } from "./context/SubmitDataContext";
import { LanguageDataContext } from "./context/LanguageDataContext";

const Main = () => {
  const [dataContext, setDataContext] = useState([]);
  const [languageData, setLanguageData] = useState("en");

  return (
    <React.StrictMode>
      <Provider store={store}>
        <LanguageDataContext.Provider value={{ languageData, setLanguageData }}>
          <SubmitDataContext.Provider value={{ dataContext, setDataContext }}>
            <App />
          </SubmitDataContext.Provider>
        </LanguageDataContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
