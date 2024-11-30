import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  const storedAccessToken = localStorage.getItem("accessToken");
  return {
    accessToken: storedAccessToken || null,
    isAuthenticated: storedIsAuthenticated
      ? JSON.parse(storedIsAuthenticated)
      : false,
  };
};

const setAuthInLocalStorage = (isAuthenticated: boolean, accessToken: string | null) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const initialState: AuthState = getInitialAuthState();
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      setAuthInLocalStorage(true, accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      setAuthInLocalStorage(false, null);
      localStorage.removeItem("refresh");
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
      setAuthInLocalStorage(state.isAuthenticated, accessToken);
    },
  },
});

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const { setCredentials, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
