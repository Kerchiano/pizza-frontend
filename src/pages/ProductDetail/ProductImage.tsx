interface ProductImageProps {
  image: string;
  title: string;
  isImageLoaded: boolean;
  onImageLoad: () => void;
}

const ProductImage = ({
  image,
  title,
  isImageLoaded,
  onImageLoad,
}: ProductImageProps) => (
  <div className="product-img relative">
    {!isImageLoaded && (
      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
    )}
    <img
      src={image}
      alt={title || "Product image"}
      className={`absolute inset-0 m-auto w-full h-full object-cover transition-opacity duration-300 ${
        isImageLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={onImageLoad}
    />
  </div>
);

export default ProductImage;
