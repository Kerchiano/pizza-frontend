import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import Products from "./pages/ProductCards/ProductCards";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import LoginPage from "./pages/Authorization/LoginPage";
import Cabinet from "./pages/PersonalCabinet/Cabinet";
import Modal from "react-modal";
import PersonalData from "./components/PersonalCabinet/PersonalData/PersonalData";
import { Orders } from "./components/PersonalCabinet/Orders/Orders";
import Checkout from "./pages/Checkout/Checkout";
import Layout from "./components/Layout/Layout";
import Whoops from "./components/common/Whoops/Whoops";
import InitialWrapper from "./components/wrappers/InitialWrapper";
import Restaurants from "./pages/RestaurantCards/RestaurantCards";

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
