import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../authSlice";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../authApi";

const LoginPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [login, {isLoading}] = useLoginMutation();
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setShowErrorPage(true);
      }, 300);
    }
  }, [isAuthenticated]);

  if (showErrorPage) {
    return <ErrorPage />;
  }

  return (
    <main className="pl-20 mt-30 lg:mt-20 flex w-full flex-col flex-1 bg-gray-100">
      <section className="p-[10px] mt-[20px] mb-[20px] lg:p-[60px] lg:pt-[0]">
        <div className="m-auto max-w-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
              <div
                className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin"
                role="status"
              ></div>
            </div>
          )}
          <div
            className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
          >
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
            <LoginForm login={login} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
