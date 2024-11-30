import { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../authApi";
import { logout, setAccessToken } from "../authSlice";
import { RootState } from "../store";

interface InitialWrapperProps {
  children: ReactNode;
}

const InitialWrapper = ({ children }: InitialWrapperProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [refreshToken] = useRefreshTokenMutation();
  const citySlug = useSelector((state: RootState) => state.city.citySlug);
  const checkAndRefreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!accessToken && refresh) {
      try {
        const result = await refreshToken();
        if (result.data) {
          dispatch(setAccessToken(result.data.access));
          localStorage.setItem("refresh", result.data.refresh);
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        dispatch(logout());
      }
    }
  };

  checkAndRefreshToken();

  useEffect(() => {
    if (window.location.pathname === "/" && !citySlug) {
      window.location.replace("/kiyiv");
    } else if (window.location.pathname === "/" && citySlug) {
      window.location.replace(`/${citySlug}`);
    }
  }, []);

  return <>{children}</>;
};

export default InitialWrapper;
