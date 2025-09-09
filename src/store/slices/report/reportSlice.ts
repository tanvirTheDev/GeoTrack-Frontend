import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportState {
  reports: any[];
  currentReport: any | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    organizationId: string;
    userId: string;
    startDate: string;
    endDate: string;
    type: string;
  };
  exportStatus: "idle" | "exporting" | "completed" | "failed";
}

const initialState: ReportState = {
  reports: [],
  currentReport: null,
  isLoading: false,
  error: null,
  filters: {
    organizationId: "",
    userId: "",
    startDate: "",
    endDate: "",
    type: "",
  },
  exportStatus: "idle",
};

const reportSlice = createSlice({
  name: "report",
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
    setReports: (state, action: PayloadAction<any[]>) => {
      state.reports = action.payload;
    },
    setCurrentReport: (state, action: PayloadAction<any | null>) => {
      state.currentReport = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ReportState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setExportStatus: (
      state,
      action: PayloadAction<ReportState["exportStatus"]>
    ) => {
      state.exportStatus = action.payload;
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
  setReports,
  setCurrentReport,
  setFilters,
  setExportStatus,
  resetFilters,
} = reportSlice.actions;

export default reportSlice.reducer;
