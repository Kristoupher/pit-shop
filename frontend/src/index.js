import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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
import SignUpScreen from "./screens/SignUpScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import OrderScreen from "./screens/OrderScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderConfirmScreen from "./screens/OrderConfirmScreen";
import PrivateRoute from "./components/PrivateRoute";
import AccountEdit from "./screens/AccountEdit";
import AdminRoute from "./components/AdminRoute";
import AdminScreen from "./screens/admin/AdminScreen";
import UsersPanel from "./screens/admin/UsersPanel";
import OrdersPanel from "./screens/admin/OrdersPanel";
import ProductsPanel from "./screens/admin/ProductsPanel";
import CategoriesPanel from "./screens/admin/CategoriesPanel";
import OrderAdminScreen from "./screens/admin/OrderAdminScreen";
import UserEdit from "./screens/admin/UserEdit";
import ProductEdit from "./screens/admin/ProductEdit";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/products/category/:category" element={<ProductsListScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/login" element={<LogInScreen />} />
            <Route path="signup" element={<SignUpScreen />} />
            <Route path="/cart" element={<CartScreen />} />


            <Route path='' element={<PrivateRoute />}>
                <Route path="/account" element={<AccountScreen />} />
                <Route path="/account/order/:id" element={<OrderScreen />} />
                <Route path="/cart/shipping" element={<ShippingScreen />} />
                <Route path="/cart/payment" element={<PaymentScreen />} />
                <Route path="/cart/confirm" element={<OrderConfirmScreen />} />
                <Route path="account/edit" element={<AccountEdit />} />
            </Route>

            <Route path='' element={<AdminRoute />}>
                <Route path="/admin" element={<AdminScreen/>} />
                <Route path="admin/users" element={<UsersPanel />} />
                <Route path="admin/orders" element={<OrdersPanel />} />
                <Route path="admin/products" element={<ProductsPanel />} />
                <Route path="admin/categories" element={<CategoriesPanel />} />
                <Route path="admin/order/:id" element={<OrderAdminScreen />} />
                <Route path="admin/user/edit/:id" element={<UserEdit />} />
                <Route path="admin/product/edit/:id" element={<ProductEdit />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HelmetProvider>
          <Provider store={store}>
                <PayPalScriptProvider deferLoading={ true }>
                    <RouterProvider router={router} />
                </PayPalScriptProvider>
          </Provider>
      </HelmetProvider>
  </React.StrictMode>
);
