import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Product,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../apiSlice";
import { useState } from "react";
import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { useSelector } from "react-redux";
import {
  addItemToCart,
  addToppingItemToCart,
  decreaseItemQuantity,
  decreaseToppingItemQuantity,
  increaseItemQuantity,
  increaseToppingItemQuantity,
  selectCartItems,
  selectCartToppingItems,
  Topping,
} from "../cartSlice";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import ErrorPage from "./ErrorPage";

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

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="relative w-full h-[350px] sm:h-[300px] md:h-[350px] lg:h-[380px] bg-gray-300 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        </div>
      )}
      <img
        loading="lazy"
        className={`m-auto w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

const Products = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const cartItems = useSelector(selectCartItems);
  const cartToppingItems = useSelector(selectCartToppingItems);
  const dispatch = useDispatch();
  const { citySlug } = useParams<{ citySlug: string }>();
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("sort");

  const { data: categories = [], isLoading: categoryIsLoading } =
    useGetCategoriesQuery();
  const category = categories.find((item) => item.slug == categorySlug);
  const [filter, setFilter] = useState(currentFilter || "");
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    categorySlug: categorySlug || "",
    filter,
  });
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());
  const categoryDescription = categories.find(
    (category) => category.slug === categorySlug
  )?.description;

  const navigate = useNavigate();

  const handleFilterChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newFilter: string
  ) => {
    e.preventDefault();
    setFilter(newFilter);
    navigate(`/${citySlug}/products/${categorySlug}/?sort=${newFilter}`);
    setFalse();
  };

  const handleProductDetail = (
    e: React.MouseEvent<HTMLAnchorElement>,
    product: Product
  ) => {
    e.preventDefault();
    navigate(`/${citySlug}/product/${product.slug}`);
  };

  const productItem = (product: Product) => {
    return cartItems.find((item) => product?.id == item.id);
  };

  const handleAddToCart = (item: Product) => {
    const newItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      slug: item.slug,
      quantity: 1,
      image: item.image,
    };
    dispatch(addItemToCart(newItem));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleAddItemToppingToCart = (itemId: number, topping: Topping) => {
    dispatch(addToppingItemToCart({ itemId, topping }));
  };

  const handleIncreaseToppingQuantity = (toppingId: number) => {
    dispatch(increaseToppingItemQuantity(toppingId));
  };

  const handleDecreaseToppingQuantity = (toppingId: number) => {
    dispatch(decreaseToppingItemQuantity(toppingId));
  };

  const handleToppingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number,
    topping: Topping,
    cartToppingItems: Topping[],
    handleAddItemToppingToCart: (productId: number, topping: Topping) => void,
    handleIncreaseToppingQuantity: (toppingId: number) => void,
    handleDecreaseToppingQuantity: (toppingId: number) => void
  ) => {
    if (e.target.checked) {
      const productToppingExists = cartToppingItems.some(
        (existingTopping) => existingTopping.id === topping.id
      );
      if (!productToppingExists) {
        handleAddItemToppingToCart(productId, topping);
      } else {
        handleIncreaseToppingQuantity(topping.id);
      }
    } else {
      handleDecreaseToppingQuantity(topping.id);
    }
  };

  const filters = {
    popular: "по популярності",
    newest: "по новизні",
    price_asc: "за зростанням цін",
    price_desc: "за зменшенням цін",
    alphabetical: "за алфавітом",
  };

  const isValidFilter = (filter: string): boolean => {
    return Object.keys(filters).includes(filter);
  };

  if (categoryIsLoading) {
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
  }

  if (currentFilter && !isValidFilter(currentFilter)) {
    return <ErrorPage />;
  }

  return category ? (
    <>
      <main className="pl-20 pt-20 flex-1 flex w-full flex-col">
        <section className="pr-10 pl-10 flex justify-between items-center min-h-20 w-full section-filters">
          <h1 className="text-3xl text-black font-semibold mr-5">
            {category?.title}
          </h1>
          <div ref={dropListRef} className="text-right flex items-center">
            <div onClick={toggle} className="relative">
              <span className="word-sort">Сортувати: </span>
              <span className="text-black cursor-pointer sort-filter">
                {currentFilter
                  ? filters[currentFilter as keyof typeof filters]
                  : "по популярності"}
              </span>
              {isToggled && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="sort-filter-list-popup"
                >
                  <ul>
                    <li>
                      <a
                        href={`/${citySlug}/products/${categorySlug}/?sort=popular`}
                        onClick={(e) => handleFilterChange(e, "popular")}
                      >
                        по популярності
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${citySlug}/products/${categorySlug}/?sort=newest`}
                        onClick={(e) => handleFilterChange(e, "newest")}
                      >
                        по новизні
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${citySlug}/products/${categorySlug}/?sort=price_desc`}
                        onClick={(e) => handleFilterChange(e, "price_desc")}
                      >
                        за зменшенням ціни
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${citySlug}/products/${categorySlug}/?sort=price_asc`}
                        onClick={(e) => handleFilterChange(e, "price_asc")}
                      >
                        за зростанням ціни
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${citySlug}/products/${categorySlug}/?sort=alphabetical`}
                        onClick={(e) => handleFilterChange(e, "alphabetical")}
                      >
                        за алфавітом
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="catalog-products">
          <div className="products-list">
            {(isLoading || isFetching) && <CardSkeleton cards={9} />}
            {products.length !== 0 &&
              products.map((product: Product) => (
                <div key={product.id} className="product-item">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleProductDetail(e, product);
                    }}
                    className="w-full relative overflow-hidden cursor-pointer text-black block"
                    href={`/${citySlug}/product/${product.slug}`}
                  >
                    <ProductImage
                      src={`${product.image}`}
                      alt={`${product.title}`}
                    />
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
                      {product.topping.map((topping: Topping, index) => (
                        <label key={topping.id}>
                          <input
                            type="checkbox"
                            id={`topping-${index}`}
                            onChange={(e) =>
                              handleToppingChange(
                                e,
                                product.id,
                                topping,
                                cartToppingItems,
                                handleAddItemToppingToCart,
                                handleIncreaseToppingQuantity,
                                handleDecreaseToppingQuantity
                              )
                            }
                          />
                          <span className="product-additional-name">
                            {topping.title}
                          </span>
                          <span className="product-additional-price">{`+${topping.price} грн`}</span>
                        </label>
                      ))}
                    </div>
                    <div className="product-price">
                      <div className="price">
                        <span className="price-value">{`${product.price} грн`}</span>
                      </div>
                    </div>
                    <div className="price-cart">
                      {!productItem(product)?.quantity ? (
                        <div style={{ height: "52px" }} className="price-btn">
                          <span
                            onClick={() => product && handleAddToCart(product)}
                            className="block px-0 py-1"
                          >
                            Замовити
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{ backgroundColor: "#8c9f3f", color: "#fff" }}
                          className="price-btn"
                        >
                          <div className="button-active">
                            <Minus
                              onClick={() => {
                                const item = productItem(product);
                                if (item && item.quantity > 1) {
                                  handleDecreaseQuantity(item.id);
                                }
                              }}
                              className={`${
                                productItem(product)?.quantity &&
                                productItem(product)!.quantity > 1
                                  ? "hover:opacity-70"
                                  : ""
                              }`}
                              height={30}
                              width={30}
                            />
                            <input
                              disabled
                              value={productItem(product)?.quantity}
                              type="text"
                            />
                            <Plus
                              onClick={() => {
                                const item = productItem(product);
                                item && handleIncreaseQuantity(item.id);
                              }}
                              className="hover:opacity-70"
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
        {categoryDescription && (
          <section className="seo-block-products">
            <p>{`${categoryDescription}`}</p>
          </section>
        )}
      </main>
    </>
  ) : (
    <ErrorPage />
  );
};

export default Products;
