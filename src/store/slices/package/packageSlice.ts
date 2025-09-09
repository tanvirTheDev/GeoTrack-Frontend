import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Package } from "../../../types/payment.types";

interface PackageState {
  packages: Package[];
  currentPackage: Package | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  packages: [],
  currentPackage: null,
  isLoading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "package",
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
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.packages = action.payload;
    },
    setCurrentPackage: (state, action: PayloadAction<Package | null>) => {
      state.currentPackage = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPackages,
  setCurrentPackage,
} = packageSlice.actions;

export default packageSlice.reducer;
