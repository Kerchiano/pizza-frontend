import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import MainPage from "./components/MainPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Restaurants from "./components/Restaurants";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:citySlug" element={<MainPage />} />
          <Route path="/:citySlug/restaurants/:restaurantSlug" element={<RestaurantDetail />} />
          <Route path="/:citySlug/restaurants" element={<Restaurants />} />
          <Route path="/:citySlug/products/:productSlug" element={<Products />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
