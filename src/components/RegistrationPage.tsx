import { Link } from "react-router-dom";
import RegistrationForm from "./auth/RegistrationForm";

const RegistrationPage = () => {
  return (
    <main className="pl-20 mt-25 lg:mt-20 mb-5 flex w-full flex-col flex-1 bg-gray-100">
      <section className="p-[10px] mt-[20px] mb-[20px] lg:p-[60px] lg:pt-[0]">
        <div className="m-auto max-w-[500px]">
          <div className="flex justify-center pt-5 pb-5">
            <Link
              to={"/login"}
              className="text-center text-gray-500 leading-[40px] text-[36px] font-bold"
            >
              Вхід
            </Link>
            <span className="text-[36px] text-center leading-[40px] font-bold ml-2 mr-2">
              /
            </span>
            <h1 className="text-[36px] text-center leading-[40px] font-bold">
              Реєстрація
            </h1>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
};

export default RegistrationPage;
