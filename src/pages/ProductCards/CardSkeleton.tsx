const CardSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="product-item ">
        <div className="w-full h-[350px] sm:h-[300px] md:h-[350px] lg:h-[380px] bg-gray-300 animate-pulse rounded"></div>
        <div className="mt-4 h-12 bg-gray-300 animate-pulse rounded"></div>
        <div className="mt-12 h-16 bg-gray-300 animate-pulse rounded"></div>
        <div className="mt-14 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="mt-6 h-14 bg-gray-300 animate-pulse rounded"></div>
      </div>
    ));
};

export default CardSkeleton;
