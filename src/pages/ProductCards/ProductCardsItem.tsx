import { Product } from "../../apiSlice";
import ProductTopping from "./ProductTopping";
import ProductCartControls from "./ProductCartControls";
import ProductImage from "./ProductImage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartItem, selectCartToppingItems } from "../../cartSlice";

interface ProductListItemProps {
  product: Product;
  productItem: (roduct: Product) => CartItem | undefined;
}

const ProductListItem = ({ product, productItem }: ProductListItemProps) => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const cartToppingItems = useSelector(selectCartToppingItems);
  const navigate = useNavigate();
  const handleProductDetail = (
    e: React.MouseEvent<HTMLAnchorElement>,
    product: Product
  ) => {
    e.preventDefault();
    navigate(`/${citySlug}/product/${product.slug}`);
  };
  return (
    <div className="product-item">
      <a
        onClick={(e) => {
          e.preventDefault();
          handleProductDetail(e, product);
        }}
        className="w-full relative overflow-hidden cursor-pointer text-black block"
        href={`/${citySlug}/product/${product.slug}`}
      >
        <ProductImage src={`${product.image}`} alt={`${product.title}`} />
      </a>
      <div className="product-properties">
        <div className="product-title">
          <a
            onClick={(e) => {
              e.preventDefault();
              handleProductDetail(e, product);
            }}
            href={`/${citySlug}/product/${product.slug}`}
          >
            {`${product.title}`}
          </a>
        </div>
        <div className="product-top">
          <div className="product-weight"></div>
        </div>
        <div className="product-description">{`${product.description}`}</div>
        <div className="product-additional">
          <ProductTopping
            cartToppingItems={cartToppingItems}
            productId={product.id}
            toppings={product.topping}
          />
        </div>
        <div className="product-price">
          <div className="price">
            <span className="price-value">{`${product.price} грн`}</span>
          </div>
        </div>
        <ProductCartControls product={product} productItem={productItem} />
      </div>
    </div>
  );
};

export default ProductListItem;
