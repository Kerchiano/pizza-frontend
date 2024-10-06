import { useParams } from "react-router-dom";
import { useGetCategoriesQuery, useGetProductsQuery } from "../apiSlice";
import { useEffect, useRef, useState } from "react";

const Products = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: categories = [] } = useGetCategoriesQuery();
  const category = categories.find((item) => item.slug == productSlug);
  const categorySlug = category?.slug || "";
  const [filter, setFilter] = useState("");
  const { data: products = [] } = useGetProductsQuery({ categorySlug, filter });
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [checkedToppings, setCheckedToppings] = useState<{
    [productId: number]: { [toppingId: number]: boolean };
  }>({});

  const handleCheckboxChange = (productId: number, toppingId: number) => {
    setCheckedToppings((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [toppingId]: !prev[productId]?.[toppingId],
      },
    }));
  };

  const togglePopup = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !target.classList.contains("sort-filter")
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <>
      <main className="pl-20 pt-20 flex-1 flex w-full flex-col">
        <section className="pr-10 pl-10 flex justify-between items-center min-h-20 w-full section-filters">
          <h1 className="text-3xl text-black font-semibold mr-5">
            {category?.title}
          </h1>
          <div className="text-right flex items-center">
            <div className="relative">
              <span className="word-sort">Сортувати: </span>
              <span
                onClick={togglePopup}
                className="text-black cursor-pointer sort-filter"
              >
                по популярності
              </span>
              <div
                ref={popupRef}
                style={{ display: isVisible ? "block" : "none" }}
                className="sort-filter-list-popup"
              >
                <ul>
                  <li>
                    <a href="#" onClick={() => handleFilterChange('popular')}>по популярності</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleFilterChange('newest')}>по новизні</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleFilterChange('price_desc')}>за зменшенням ціни</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleFilterChange('price_asc')}>за зростанням ціни</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleFilterChange('alphabetical')}>за алфавітом</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="catalog-products">
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <a
                  className="w-full relative overflow-hidden cursor-pointer text-black block"
                  href="#"
                >
                  <img
                    className="m-auto w-full h-full object-cover"
                    src={`${product.image}`}
                    alt={`${product.title}`}
                  />
                </a>
                <div className="product-properties">
                  <div className="product-title">
                    <a href="#">{`${product.title}`}</a>
                  </div>
                  <div className="product-top">
                    <div className="product-weight"></div>
                  </div>
                  <div className="product-description">{`${product.description}`}</div>
                  <div className="product-additional">
                    {product.topping.map((topping) => (
                      <label key={topping.id}>
                        <input
                          type="checkbox"
                          checked={
                            checkedToppings[product.id]?.[topping.id] || false
                          }
                          onChange={() =>
                            handleCheckboxChange(product.id, topping.id)
                          }
                        />
                        <span
                          className={`product-additional-name ${
                            checkedToppings[topping.id] ? "checked" : ""
                          }`}
                        >{`${topping.title}`}</span>
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
                    <div className="price-btn">
                      <span className="block px-0 py-1">В кошик</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="seo-block-products">
          <p>{`${
            categories.find((category) => category === category)?.description
          }`}</p>
        </section>
      </main>
    </>
  );
};

export default Products;
