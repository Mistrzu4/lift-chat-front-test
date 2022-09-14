import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postsReducer from './features/postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <App />
    </Provider>
  </React.StrictMode>
);