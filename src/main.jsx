import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import HomeContextProvider from './contexts/HomeContext';
import TextEditorContextProvider from './contexts/TextEditorContext';
import DocumentsContextProvider from './contexts/DocumentsContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DocumentsContextProvider>
      <HomeContextProvider>
        <TextEditorContextProvider>
          <App />
        </TextEditorContextProvider>
      </HomeContextProvider>
    </DocumentsContextProvider>
  </React.StrictMode>
);
