const LoadingSpinner = () => {
  return (
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
  );
};

export default LoadingSpinner;
