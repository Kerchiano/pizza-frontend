import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface City {
  id: number;
  slug: string;
  name: string;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
}

export interface Restaurant {
  id: number;
  address: string;
  image_detail: string;
  image_thumbnail: string;
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
  slug: string;
  title: string;
  icon: string;
  description: string;
}

export interface Image {
  image: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  topping: Topping[];
  created_at: string;
}

export interface Topping {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderItem {
  product?: number;
  topping?: number;
  quantity: number;
}

export interface Order {
  user: number;
  total_amount: number;
  paid_amount?: number;
  delivery_address?: number;
  restaurant?: undefined;
  payment_method: string;
  delivery_date: string;
  delivery_time: string;
  order_items: OrderItem[];
}

export const apiSlice = createApi({
  reducerPath: "api-cities",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => "/cities/",
    }),
    getRestaurantsByCity: builder.query<Restaurant[], string>({
      query: (citySlug) => `/restaurants/?city=${citySlug}`,
    }),
    getRestaurantByRestaurantSlug: builder.query<Restaurant, string>({
      query: (restaurantSlug) => `/restaurants/${restaurantSlug}/`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories/`,
    }),
    getImages: builder.query<Image[], void>({
      query: () =>
        "https://raw.githubusercontent.com/Kerchiano/storage-photos/main/discount/discount_data.json",
    }),
    getProducts: builder.query<
      Product[],
      { categorySlug: string; filter?: string }
    >({
      query: ({ categorySlug, filter }) => {
        let url = `/products/?category=${categorySlug}`;

        if (filter) {
          url += `&sort_by=${filter}`;
        }

        return url;
      },
    }),
    getProduct: builder.query<Product, string>({
      query: (productSlug) => `/products/${productSlug}/`,
    }),
    addOrder: builder.mutation<Order, Order>({
      query: (Order) => ({
        url: "/orders/",
        method: "POST",
        body: Order,
      }),
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useGetRestaurantsByCityQuery,
  useGetCategoriesQuery,
  useGetImagesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetRestaurantByRestaurantSlugQuery,
  useAddOrderMutation
} = apiSlice;
