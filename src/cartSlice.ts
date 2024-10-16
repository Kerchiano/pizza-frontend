import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Topping {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  options?: Topping[];
}

interface CartState {
  items: CartItem[];
  toppingItems: Topping[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  toppingItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

interface AddToppingPayload {
  itemId: number;
  topping: Topping;
}

const loadCartFromLocalStorage = (): CartState => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : initialState;
};

const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      item.options = [];
      state.items.push(item);

      state.totalQuantity += 1;
      state.totalPrice += item.price;
      saveCartToLocalStorage(state);
    },

    addToppingItemToCart: (state, action: PayloadAction<AddToppingPayload>) => {
      const { itemId, topping } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        const existingTopping = state.toppingItems.find(
          (option) => option.id === topping.id
        );
        if (!existingTopping) {
          state.toppingItems.push({ ...topping, quantity: 1 });
          state.totalPrice += topping.price;
          state.totalQuantity += 1;
          saveCartToLocalStorage(state);
        }
      }
    },

    increaseToppingItemQuantity: (state, action: PayloadAction<number>) => {
      const toppingId = action.payload;
      const existingTopping = state.toppingItems.find(
        (option) => option.id === toppingId
      );
      const totalItemsQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      if (existingTopping && existingTopping.quantity < totalItemsQuantity) {
        existingTopping.quantity += 1;
        state.totalPrice += existingTopping.price;
        state.totalQuantity += 1;
        saveCartToLocalStorage(state);
      }
    },

    decreaseToppingItemQuantity: (state, action: PayloadAction<number>) => {
      const toppingId = action.payload;
      const existingTopping = state.toppingItems.find(
        (option) => option.id === toppingId
      );
      if (existingTopping && existingTopping.quantity > 1) {
        existingTopping.quantity -= 1;
        state.totalPrice -= existingTopping.price;
        state.totalQuantity -= 1;
        saveCartToLocalStorage(state);
      } else if (existingTopping && existingTopping.quantity === 1) {
        state.toppingItems = state.toppingItems.filter(
          (option) => option.id !== toppingId
        );
        state.totalPrice -= existingTopping.price;
        state.totalQuantity -= 1;
        saveCartToLocalStorage(state);
      }
    },

    removeToppingItemFromCart: (state, action: PayloadAction<number>) => {
      const toppingId = action.payload;
      const toppingIndex = state.toppingItems.findIndex(
        (topping) => topping.id === toppingId
      );
      if (toppingIndex >= 0) {
        const toppimg = state.toppingItems[toppingIndex];
        state.totalQuantity -= toppimg.quantity;
        state.totalPrice -= toppimg.price * toppimg.quantity;
        state.toppingItems.splice(toppingIndex, 1);
        saveCartToLocalStorage(state);
      }
    },

    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
        saveCartToLocalStorage(state);
      }
    },

    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
        saveCartToLocalStorage(state);
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const itemQuantity = item.quantity;

        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);

        state.toppingItems.forEach((topping) => {
          if (topping.quantity > itemQuantity) {
            topping.quantity -= itemQuantity;
            state.totalPrice -= topping.price * itemQuantity;
            state.totalQuantity -= itemQuantity
          } else {
            state.totalPrice -= topping.price * topping.quantity;
            topping.quantity = 0;
            state.totalQuantity -= itemQuantity
            state.toppingItems = []
          }
        });
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const selectCartQuantity = (state: { cart: CartState }) =>
  state.cart.totalQuantity;

export const selectCartTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export const selectCartToppingItems = (state: { cart: CartState }) =>
  state.cart.toppingItems;

export const selectTotalItemsQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const {
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  addToppingItemToCart,
  increaseToppingItemQuantity,
  decreaseToppingItemQuantity,
  removeToppingItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
