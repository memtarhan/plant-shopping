// src/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],         // { name, image, description, cost, quantity }
    totalQuantity: 0,  // total number of items in cart (sum of quantities)
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload; // expect at least { name, cost, image, description }
            const existing = state.items.find(i => i.name === newItem.name);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.totalQuantity += 1;
        },
        removeItem: (state, action) => {
            const name = action.payload; // name of item to remove
            const existing = state.items.find(i => i.name === name);
            if (existing) {
                state.totalQuantity -= existing.quantity;
                state.items = state.items.filter(i => i.name !== name);
            }
        },
        updateQuantity: (state, action) => {
            const { name, amount } = action.payload; // amount is new quantity (number)
            const existing = state.items.find(i => i.name === name);
            if (existing) {
                // adjust totalQuantity by delta
                state.totalQuantity += (amount - existing.quantity);
                existing.quantity = amount;
                if (existing.quantity <= 0) {
                    // remove item if zero or less
                    state.items = state.items.filter(i => i.name !== name);
                }
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;