import { Link } from "react-router-dom";
import LoginForm from "./auth/LoginForm";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../authSlice";
import ErrorPage from "./ErrorPage";

const LoginPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return !isAuthenticated ? (
    <main className="pl-20 mt-30 lg:mt-20 flex w-full flex-col flex-1 bg-gray-100">
      <section className="p-[10px] mt-[20px] mb-[20px] lg:p-[60px] lg:pt-[0]">
        <div className="m-auto max-w-[500px]">
          <div className="flex justify-center pt-5 pb-5">
            <h1 className="text-[36px] text-center leading-[40px] font-bold">
              Вхід
            </h1>
            <span className="text-[36px] text-center leading-[40px] font-bold ml-2 mr-2">
              /
            </span>
            <Link
              to={"/registration"}
              className="text-center text-gray-500 leading-[40px] text-[36px] font-bold"
            >
              Реєстрація
            </Link>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  ) : (
    <ErrorPage />
  );
};

export default LoginPage;
