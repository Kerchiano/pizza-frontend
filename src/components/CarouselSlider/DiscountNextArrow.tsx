interface ArrowProps {
    className: string;
    onClick: () => void;
  }

const DiscountNextArrow = ({ className, onClick }: ArrowProps) => {
  return (
    <div
      className={`${className } arrow`}
      style={{ display: "block", zIndex: 2, right: '60px', borderRadius: '50%'}}
      onClick={onClick}
    >
      <img
        src="https://mafia.ua/images/white-arrow.svg"
        alt="prev"
        style={{ width: "20px", height: "38px", top: '10px', position: 'absolute', left: "20px" }}
      />
    </div>
  );
};

export default DiscountNextArrow;
