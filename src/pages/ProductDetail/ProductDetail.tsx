import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../apiSlice";
import { selectCartItems, selectCartToppingItems } from "../../cartSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductToppingMobile from "./ProductToppingMobile";
import ProductToppingDesktop from "./ProductToppingDesktop";
import ProductCartControls from "./ProductCartControls";
import MobileBottom from "./MobileBottom";
import LoadingSpinner from "./LoadingSpinner";

const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: product, isLoading } = useGetProductQuery(productSlug || "");
  const cartItems = useSelector(selectCartItems);
  const productCartItem = cartItems.find((item) => product?.id == item.id);
  const cartToppingItems = useSelector(selectCartToppingItems);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return product ? (
    <>
      <main>
        <section className="product-page">
          <div className="product-page-content">
            <div className="product-page-inside">
              <ProductImage
                image={product.image}
                title={product.title}
                isImageLoaded={isImageLoaded}
                onImageLoad={handleImageLoad}
              />
              <div className="product-detail-description">
                <ProductDescription
                  title={product.title}
                  description={product.description}
                />
                <ProductToppingMobile
                  cartToppingItems={cartToppingItems}
                  productId={product.id}
                  toppings={product.topping}
                />
                <ProductToppingDesktop
                  category={product.category.toString()}
                  cartToppingItems={cartToppingItems}
                  toppings={product.topping}
                  productId={product.id}
                />
                <ProductCartControls
                  productCartItem={productCartItem}
                  product={product}
                />
                <MobileBottom />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  ) : (
    <ErrorPage />
  );
};

export default ProductDetail;
