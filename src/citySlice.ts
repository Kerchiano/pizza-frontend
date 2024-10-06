import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityState {
  cityName: string;
  citySlug: string;
}

const initialState: CityState = {
  cityName: localStorage.getItem("currentCityName") || "Київ",
  citySlug: localStorage.getItem("currentCitySlug") || "kiyiv",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
      localStorage.setItem("currentCityName", action.payload);
    },
    setCitySlug: (state, action: PayloadAction<string>) => {
      state.citySlug = action.payload;
      localStorage.setItem("currentCitySlug", action.payload);
    },
  },
});

export const { setCityName, setCitySlug  } = citySlice.actions;
export default citySlice.reducer;
