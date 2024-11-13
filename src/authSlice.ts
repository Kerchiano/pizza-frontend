import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
  const storedState = localStorage.getItem("isAuthenticated");
  return {
    accessToken: null,
    isAuthenticated: storedState ? JSON.parse(storedState) : false,
  };
};

const initialState: AuthState = getInitialAuthState();

const setLocalStorage = (isAuthenticated: boolean) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      setLocalStorage(true);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      setLocalStorage(false);
      localStorage.removeItem("refresh");
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const { setCredentials, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
