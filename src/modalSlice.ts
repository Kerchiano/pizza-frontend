import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  reviewModal: boolean;
  successModal: boolean;
  isAnimating: boolean;
}

const initialState: ModalState = {
  reviewModal: false,
  successModal: false,
  isAnimating: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openReviewModal: (state) => {
      state.reviewModal = true;
    },
    closeReviewModal: (state) => {
      state.reviewModal = false;
    },
    setAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
  },
});

export const { openReviewModal, closeReviewModal, setAnimating } = modalSlice.actions;

export const selectReviewModal = (state: any) => state.modal.reviewModal;
export const selectIsAnimating = (state: any) => state.modal.isAnimating;

export default modalSlice.reducer;
