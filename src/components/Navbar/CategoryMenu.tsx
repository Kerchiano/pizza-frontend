import { useNavigate } from "react-router-dom";
import { Category } from "../../apiSlice";

interface CategoryMenuProps {
  categories: Category[];
  citySlug: string;
  navigate: ReturnType<typeof useNavigate>;
}

const CategoryMenu = ({
  categories,
  citySlug,
  navigate,
}: CategoryMenuProps) => {
  return (
    <div className="category-menu hover:not-main-page">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${citySlug}/products/${category.slug}`);
            }}
          >
            <a
              href={`/${citySlug}/products/${category.slug}`}
              className="flex px-6 py-4 w-52 items-center border-b hover:bg-orange-300"
            >
              <img className="mr-3 h-8 w-8" src={category.icon} alt="" />
              <span className="text-black">{category.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
