import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Organization,
  OrganizationStats,
} from "../../../types/organization.types";

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  stats: OrganizationStats | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    status: string;
    packageType: string;
  };
  pagination: {
    page: number;
    limit: number;
  };
}

const initialState: OrganizationState = {
  organizations: [],
  currentOrganization: null,
  stats: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    packageType: "",
  },
  pagination: {
    page: 1,
    limit: 10,
  },
};

const organizationSlice = createSlice({
  name: "organization",
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
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.unshift(action.payload);
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const index = state.organizations.findIndex(
        (org) => org._id === action.payload._id
      );
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    removeOrganization: (state, action: PayloadAction<string>) => {
      state.organizations = state.organizations.filter(
        (org) => org._id !== action.payload
      );
    },
    setCurrentOrganization: (
      state,
      action: PayloadAction<Organization | null>
    ) => {
      state.currentOrganization = action.payload;
    },
    setStats: (state, action: PayloadAction<OrganizationStats>) => {
      state.stats = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<OrganizationState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (
      state,
      action: PayloadAction<Partial<OrganizationState["pagination"]>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setOrganizations,
  addOrganization,
  updateOrganization,
  removeOrganization,
  setCurrentOrganization,
  setStats,
  setFilters,
  setPagination,
  resetFilters,
  resetPagination,
} = organizationSlice.actions;

export default organizationSlice.reducer;
