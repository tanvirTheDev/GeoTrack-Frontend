import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Payment,
  PaymentStats,
  Subscription,
} from "../../../types/payment.types";

interface PaymentState {
  payments: Payment[];
  subscriptions: Subscription[];
  currentPayment: Payment | null;
  currentSubscription: Subscription | null;
  stats: PaymentStats | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    organizationId: string;
    status: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
  };
}

const initialState: PaymentState = {
  payments: [],
  subscriptions: [],
  currentPayment: null,
  currentSubscription: null,
  stats: null,
  isLoading: false,
  error: null,
  filters: {
    organizationId: "",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.unshift(action.payload);
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex(
        (payment) => payment._id === action.payload._id
      );
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
    setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
    },
    addSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscriptions.unshift(action.payload);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      const index = state.subscriptions.findIndex(
        (sub) => sub._id === action.payload._id
      );
      if (index !== -1) {
        state.subscriptions[index] = action.payload;
      }
    },
    setCurrentPayment: (state, action: PayloadAction<Payment | null>) => {
      state.currentPayment = action.payload;
    },
    setCurrentSubscription: (
      state,
      action: PayloadAction<Subscription | null>
    ) => {
      state.currentSubscription = action.payload;
    },
    setStats: (state, action: PayloadAction<PaymentStats>) => {
      state.stats = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<PaymentState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPayments,
  addPayment,
  updatePayment,
  setSubscriptions,
  addSubscription,
  updateSubscription,
  setCurrentPayment,
  setCurrentSubscription,
  setStats,
  setFilters,
  resetFilters,
} = paymentSlice.actions;

export default paymentSlice.reducer;
