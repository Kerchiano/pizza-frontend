import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import MainPage from "./components/MainPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Restaurants from "./components/Restaurants";
import Products from "./components/Products";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import Cabinet from "./components/Cabinet";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRefreshTokenMutation } from "./authApi";
import { useEffect } from "react";
import { logout, selectIsAuthenticated, setAccessToken } from "./authSlice";
import { RootState } from "./store";
import PersonalData from "./components/PersonalData";
import { Orders } from "./components/Orders";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [refreshToken] = useRefreshTokenMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated)

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
  return (
    <Router>
      <>
        <NavBar />
        <Routes>
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
          <Route path="/registration" element={isAuthenticated ? <Navigate to="/profile/personal_data" /> : <RegistrationPage />}  />
          <Route path="/login"  element={isAuthenticated ? <Navigate to="/profile/personal_data" /> : <LoginPage />}  />
          <Route path="/profile" element={<Cabinet />}>
            <Route path="personal_data" element={<PersonalData />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
