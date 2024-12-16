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

export interface Review {
  user?: number | undefined;
  review: string;
  rating: string;
  restaurant: undefined;
  email?: string;
  first_name?: string;
  phone_number?: string;
}

export const apiSlice = createApi({
  reducerPath: "api-cities",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pizza-backend-t2lf.onrender.com/" }),
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
    addReview: builder.mutation<Review, Review>({
      query: (reviewDetails) => ({
        url: "/reviews/",
        method: "Post",
        body: reviewDetails,
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
  useAddReviewMutation,
} = apiSlice;
