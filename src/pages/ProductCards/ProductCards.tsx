import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Product,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../apiSlice";
import { useState } from "react";
import useToggle from "../../components/hooks/useToggle";
import useClickOutside from "../../components/hooks/useClickOutside";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../cartSlice";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
import CardSkeleton from "./CardSkeleton";
import DropListFilters from "./DropListFilters";
import ProductCardsItem from "./ProductCardsItem";
import LoadingSpinner from "./LoadingSpinner";

const Products = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const cartItems = useSelector(selectCartItems);
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

  const productItem = (product: Product) => {
    return cartItems.find((item) => product?.id == item.id);
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
      <LoadingSpinner />
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
          <DropListFilters
            categorySlug={categorySlug}
            citySlug={citySlug}
            currentFilter={currentFilter}
            dropListRef={dropListRef}
            handleFilterChange={handleFilterChange}
            isToggled={isToggled}
            toggle={toggle}
          />
        </section>
        <section className="catalog-products">
          <div className="products-list">
            {(isLoading || isFetching) && <CardSkeleton cards={9} />}
            {products.length !== 0 &&
              products.map((product: Product) => (
                <ProductCardsItem
                  key={product.id}
                  product={product}
                  productItem={productItem}
                />
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
