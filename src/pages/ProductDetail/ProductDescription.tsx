const ProductDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <h1>{title}</h1>
    <div className="description">
      <div className="less">
        <div className="description-desktop">
          <p>Інгредієнти</p>
          {description}
        </div>
      </div>
    </div>
  </>
);

export default ProductDescription;
