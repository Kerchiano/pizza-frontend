import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Restaurants from "./components/Restaurants";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import Cabinet from "./components/Cabinet";
import Modal from "react-modal";
import PersonalData from "./components/PersonalData";
import { Orders } from "./components/Orders";
import Checkout from "./components/Checkout";
import Layout from "./components/Layout";
import Whoops from "./components/Whoops";
import InitialWrapper from "./components/InitialWrapper";

Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <InitialWrapper>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/:citySlug" element={<MainPage />} />
            <Route
              path="/:citySlug/restaurants/:restaurantSlug"
              element={<RestaurantDetail />}
            />
            <Route path="/:citySlug/restaurants" element={<Restaurants />} />
            <Route
              path="/:citySlug/products/:categorySlug"
              element={<Products />}
            />
            <Route
              path="/:citySlug/product/:productSlug"
              element={<ProductDetail />}
            />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Cabinet />}>
              <Route path="personal_data" element={<PersonalData />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<Whoops />} />
        </Routes>
      </InitialWrapper>
    </Router>
  );
}

export default App;
