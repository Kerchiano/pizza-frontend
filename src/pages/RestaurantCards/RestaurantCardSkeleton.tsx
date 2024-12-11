const RestaurantCardSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} style={{ paddingBottom: "0px" }} className="restaurant-item">
        <div className="w-full h-[270px] bg-gray-300 mb-[30px] animate-pulse rounded"></div>
        <div className="mb-[30px] h-[20px] bg-gray-300 animate-pulse rounded"></div>
        <div className="flex justify-between px-[15px] mb-[30px] pt-[0px]">
          <div className="h-[40px] w-[40%] bg-gray-300 animate-pulse rounded"></div>
          <div className="h-[40px] w-[40%] bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="flex justify-between py-[15px] px-[15px] border mt-[15px]">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"
              ></div>
            ))}
        </div>
      </div>
    ));
};

export default RestaurantCardSkeleton;
