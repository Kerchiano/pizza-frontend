import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../authSlice";
import { authApi } from "../../authApi";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    dispatch(authApi.util.resetApiState());
  };

  return (
    <button className="user-logout" onClick={handleLogout}>
      Вихід
    </button>
  );
};

export default Logout;
