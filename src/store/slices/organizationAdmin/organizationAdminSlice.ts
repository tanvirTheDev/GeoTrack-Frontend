import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrganizationAdmin } from "../../../types/organizationAdmin.types";

interface OrganizationAdminState {
  selectedAdmin: OrganizationAdmin | null;
  filters: {
    search: string;
    status: string;
    organizationId: string;
  };
  pagination: {
    page: number;
    limit: number;
  };
}

const initialState: OrganizationAdminState = {
  selectedAdmin: null,
  filters: {
    search: "",
    status: "",
    organizationId: "",
  },
  pagination: {
    page: 1,
    limit: 10,
  },
};

const organizationAdminSlice = createSlice({
  name: "organizationAdmin",
  initialState,
  reducers: {
    setSelectedAdmin: (
      state,
      action: PayloadAction<OrganizationAdmin | null>
    ) => {
      state.selectedAdmin = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<OrganizationAdminState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (
      state,
      action: PayloadAction<Partial<OrganizationAdminState["pagination"]>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        status: "",
        organizationId: "",
      };
    },
    resetPagination: (state) => {
      state.pagination = {
        page: 1,
        limit: 10,
      };
    },
  },
});

export const {
  setSelectedAdmin,
  setFilters,
  setPagination,
  resetFilters,
  resetPagination,
} = organizationAdminSlice.actions;

export default organizationAdminSlice.reducer;
