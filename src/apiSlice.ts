import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface City {
  id: number;
  slug: string;
  name: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Restaurant {
  id: number;
  address: string;
  image: string;
  phone_number: string;
  open_time: string;
  close_time: string;
  description: string;
  city: string;
  service: Service[];
  slug: string;
}

export interface Category {
  id: number;
  title: string;
  icon: string
}

export const apiSlice = createApi({
  reducerPath: "api-cities",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  endpoints: (builder) => ({
    getItems: builder.query<City[], void>({
      query: () => "/cities/",
    }),
    getRestaurantsByCity: builder.query<Restaurant[], string>({
      query: (citySlug) => `/restaurants/?city=${citySlug}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories/`,
    }),
  }),
});

export const { useGetItemsQuery, useGetRestaurantsByCityQuery, useGetCategoriesQuery  } = apiSlice;
