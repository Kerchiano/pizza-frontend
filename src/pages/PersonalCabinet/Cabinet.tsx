import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import Logout from "../../components/PersonalCabinet/Logout";
import { selectIsAuthenticated } from "../../authSlice";

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
    <>
      <main className="pl-20 mt-30 lg:mt-20 flex w-full flex-col flex-1 bg-gray-100">
        <section className="p-[10px] mt-[20px] mb-[35px] lg:p-[60px] lg:pt-[0]">
          <div className="py-[42px]">
            <div
              className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
              role="status"
            ></div>
          </div>
        </section>
      </main>
      <Navigate to={"/login"} />
    </>
  );
};

export default Cabinet;
