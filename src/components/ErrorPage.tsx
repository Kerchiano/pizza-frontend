const ErrorPage = () => {
  return (
    <>
      <main className="flex flex-1 w-full flex-col mt-30 lg:mt-20 items-center lg:pl-20">
        <section className="error-page">
          <h1>Помилка</h1>
          <div className="error-type">404</div>
          <div className="error-text">Сторінка не знайдена...</div>
          <img
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/404.png"
            alt="404"
          />
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
