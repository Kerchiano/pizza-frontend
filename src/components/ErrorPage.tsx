import { useState } from "react";

const ErrorPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <>
      <main className="flex flex-1 w-full flex-col mt-30 lg:mt-20 items-center lg:pl-20">
        <section className="error-page">
          <h1>Помилка</h1>
          <div className="error-type">404</div>
          <div className="error-text">Сторінка не знайдена...</div>
          {isLoading && (
            <div
              className="w-[200px] h-[200px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
              role="status"
            ></div>
          )}
          <img
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/404.png"
            alt="404"
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
