import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import Logout from "./Logout";
import { selectIsAuthenticated } from "../authSlice";

const Cabinet = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <main className="pl-20 mt-25 lg:mt-20 flex w-full flex-col flex-1 bg-gray-100">
      <section className="px-[20px] py-[40px] lg:p-[60px] lg:pt-[0] min-h-[654px]">
        <div className="profile-container">
          <h1>Особистий кабінет</h1>
          <div className="profile-tabs">
            <Link className="tab" to="personal_data">
              Особисті дані
            </Link>
            <Link className="tab" to="orders">
              Історія замовлень
            </Link>
            <Logout />
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Cabinet;
