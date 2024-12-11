import React from "react";

interface DropListFiltersProps {
  dropListRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  currentFilter: string | null;
  isToggled: boolean;
  handleFilterChange: (
    e: React.MouseEvent<HTMLAnchorElement>,
    newFilter: string
  ) => void;
  categorySlug: string | undefined;
  citySlug: string | undefined;
}

const DropListFilters = ({
  dropListRef,
  toggle,
  currentFilter,
  isToggled,
  handleFilterChange,
  categorySlug,
  citySlug,
}: DropListFiltersProps) => {
  const filters = {
    popular: "по популярності",
    newest: "по новизні",
    price_asc: "за зростанням цін",
    price_desc: "за зменшенням цін",
    alphabetical: "за алфавітом",
  };
  return (
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
  );
};

export default DropListFilters;
