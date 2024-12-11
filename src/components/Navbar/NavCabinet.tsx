import { Link } from "react-router-dom";

interface NavCabinetProps {
  isAuthenticated: boolean;
}

const NavCabinet = ({ isAuthenticated }: NavCabinetProps) => {
  return (
    <div className="user-cabinet ml-8 hidden sm:block lg:block">
      {isAuthenticated ? (
        <Link to="/profile/personal_data">
          <span className="text-white hover:text-gray-400 font-medium cursor-pointer hidden lg:block">
            Кабінет
          </span>
        </Link>
      ) : (
        <Link to="/login">
          <span className="text-white hover:text-gray-400 font-medium cursor-pointer hidden lg:block">
            Вхід
          </span>
        </Link>
      )}
      {isAuthenticated ? (
        <Link to="/profile/personal_data">
          <img
            className="min-w-10 h-10 block lg:hidden"
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/mafia_logo.jpg"
            alt=""
          />
        </Link>
      ) : (
        <Link to="/login">
          <img
            className="min-w-10 h-10 block lg:hidden"
            src="https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/mafia_logo.jpg"
            alt=""
          />
        </Link>
      )}
    </div>
  );
};

export default NavCabinet;
