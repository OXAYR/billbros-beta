import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createPaymentIntent = createAsyncThunk(
  'Stripe/createPaymentIntent',
  async (payload, {rejectWithValue}) => {
    try {
      console.log('here is the payload------>', payload);
      const response = await axios.post(
        'http://10.0.2.2:3000/stripe/create-payment-intent',
        payload,
      );
      console.log('here os the response------->', response.data);
      return response.data;
    } catch (error) {
      console.log('here are teh error --------->', error, error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const confirmPaymentIntent = createAsyncThunk(
  'Stripe/confirmPaymentIntent',
  async (payload, {rejectWithValue}) => {
    try {
      console.log('here is the payload for confirm payment------>', payload);
      const response = await axios.post(
        'http://10.0.2.2:3000/stripe/confirm-payment',
        payload,
      );
      console.log('here os the response------->', response.data);
      return response.data;
    } catch (error) {
      console.log('here are teh error --------->', error, error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
