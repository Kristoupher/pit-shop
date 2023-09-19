import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './assets/styles/normalize.css';
import './assets/styles/scss/main.scss';
import store from "./store";
import {HelmetProvider} from "react-helmet-async";
import {Provider} from "react-redux";
import App from './App';
import HomeScreen from "./screens/HomeScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import ProductScreen from "./screens/ProductScreen";
import ContactScreen from "./screens/ContactScreen";
import LogInScreen from "./screens/LogInScreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/products/category/:category" element={<ProductsListScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/login" element={<LogInScreen />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HelmetProvider>
          <Provider store={store}>
              <RouterProvider router={router} />
          </Provider>
      </HelmetProvider>
  </React.StrictMode>
);
