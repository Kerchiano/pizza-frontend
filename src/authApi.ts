import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../src/authSlice";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export interface User {
  id: number;
  first_name: string;
  phone_number: string;
  email: string;
  gender: string;
}

export interface UserAddresses {
  id: number;
  city: string;
  street: string;
  house_number: number;
  floor: number;
  entrance: number;
  flat: number;
}

type UserWithoutPhone = Omit<User, "phone_number">;

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  const refresh = localStorage.getItem("refresh");
  if (result.error && result.error.status === 401 && refresh) {
    const refreshResult = await baseQuery(
      { url: "auth/jwt/refresh/", method: "POST", body: { refresh: refresh } },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const { access, refresh } = refreshResult.data as {
        access: string;
        refresh: string;
      };
      localStorage.setItem("refresh", refresh);
      api.dispatch(
        setCredentials({
          accessToken: access,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      const citySlug = useSelector((state: RootState) => state.city.citySlug);
      const navigate = useNavigate();
      navigate(`/${citySlug}`);
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/jwt/create/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/users/",
        method: "POST",
        body: userData,
      }),
    }),
    getUserDetails: builder.query<User, void>({
      query: () => "auth/users/me/",
    }),
    changeUserDetails: builder.mutation<User, UserWithoutPhone>({
      query: (userDetails) => ({
        url: "auth/users/me/",
        method: "PATCH",
        body: userDetails,
      }),
    }),
    getUserAddresses: builder.query<UserAddresses[], string>({
      query: (email) => `/address/?user=${email}`,
    }),
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: "/address/create/",
        method: "POST",
        body: addressData,
      }),
    }),
    removeAddress: builder.mutation<void, number>({
      query: (addressId) => ({
        url: `/address/delete/${addressId}/`,
        method: "DELETE",
      }),
    }),
    refreshToken: builder.mutation<{ access: string; refresh: string }, void>({
      query: () => ({
        url: "auth/jwt/refresh/",
        method: "POST",
        body: { refresh: localStorage.getItem("refresh") },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserDetailsQuery,
  useRefreshTokenMutation,
  useChangeUserDetailsMutation,
  useGetUserAddressesQuery,
  useAddAddressMutation,
  useRemoveAddressMutation,
} = authApi;
