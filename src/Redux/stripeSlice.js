import {createSlice} from '@reduxjs/toolkit';
import {createPaymentIntent, confirmPaymentIntent} from './stripeThunks';

const stripeSlice = createSlice({
  name: 'Stripe',
  initialState: {
    stripe: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStripe: (state, action) => {
      state.stripe = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createPaymentIntent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.stripe = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmPaymentIntent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.stripe = action.payload;
      })
      .addCase(confirmPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setStripe} = stripeSlice.actions;

export default stripeSlice.reducer;
