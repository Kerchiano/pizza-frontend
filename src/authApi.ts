import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../src/authSlice";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export interface User {
  id: number;
  first_name: string;
  phone_number: string;
  email: string;
  gender: string;
}

export interface OrderItem {
  product?: number;
  product_title?: string;
  product_price?: string;
  topping?: number;
  topping_title?: string;
  topping_price?: string;
  quantity: number;
}

export interface Order {
  id?: number;
  user: number;
  total_amount: number;
  paid_amount?: string | number;
  delivery_address?: number;
  restaurant?: undefined;
  payment_method: string;
  delivery_date: string;
  delivery_time: string;
  order_items: OrderItem[];
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
  const refresh = localStorage.getItem("refresh");
  let result = await baseQuery(args, api, extraOptions);
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
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Addresses", "Orders"],
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
    getUserAddresses: builder.query<UserAddresses[], number>({
      query: (id) => `/address/?user=${id}`,
      providesTags: () => [{ type: "Addresses" }],
    }),
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: "/address/create/",
        method: "POST",
        body: addressData,
      }),
      invalidatesTags: () => [{ type: "Addresses" }],
    }),
    addOrder: builder.mutation<Order, Order>({
      query: (Order) => ({
        url: "/orders/",
        method: "POST",
        body: Order,
      }),
      invalidatesTags: () => [{ type: "Orders" }],
    }),
    getOrders: builder.query<Order[], number>({
      query: (user) => `/orders/?user=${user}`,
      providesTags: () => [{ type: "Orders" }],
    }),
    removeAddress: builder.mutation({
      query: (id) => ({
        url: `/address/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Addresses" }],
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
  useAddOrderMutation,
  useGetOrdersQuery,
} = authApi;
