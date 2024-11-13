import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Restaurants from "./components/Restaurants";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import Cabinet from "./components/Cabinet";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRefreshTokenMutation } from "./authApi";
import { useEffect } from "react";
import { logout, setAccessToken } from "./authSlice";
import { RootState } from "./store";
import PersonalData from "./components/PersonalData";
import { Orders } from "./components/Orders";
import Checkout from "./components/Checkout";
import { selectCartQuantity } from "./cartSlice";
import Layout from "./components/Layout";
import Whoops from "./components/Whoops";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [refreshToken] = useRefreshTokenMutation();
  const cartQuantity = useSelector(selectCartQuantity);
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  
  useEffect(() => {
    const fetchNewToken = async () => {
      const refresh = localStorage.getItem("refresh");
      if (!accessToken && refresh) {
        try {
          const result = await refreshToken();
          if (result.data) {
            dispatch(setAccessToken(result.data.access));
            localStorage.setItem("refresh", result.data.refresh);
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          dispatch(logout());
        }
      }
    };

    fetchNewToken();
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (window.location.pathname === "/" && !citySlug) {
      window.location.replace("/kiyiv");
    } else if (window.location.pathname === "/" && citySlug) {
      window.location.replace(`/${citySlug}`);
    }
  }, []);
  return (
    <Router>
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
          <Route
            path="/checkout"
            element={
              cartQuantity > 0 ? <Checkout /> : <Navigate to={`/${citySlug}`} />
            }
          />
        </Route>

        <Route path="*" element={<Whoops />} />
      </Routes>
    </Router>
  );
}

export default App;
