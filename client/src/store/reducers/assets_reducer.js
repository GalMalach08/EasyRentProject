import { createSlice } from "@reduxjs/toolkit";
import {
  getAssetsByCategory,
  filterAssets,
  getAssetsOfUser,
  getNotApprovedAssets,
} from "../actions/assets.thunk";

const FILTERED_SEARCH_DEFAULT = {
  numberOfRooms: "",
  location: "",
  price: "",
  area: "",
  dates: "",
};

export const assetSlice = createSlice({
  name: "assets",
  initialState: {
    data: [],
    skip: 0,
    loading: false,
    filteredSearch: FILTERED_SEARCH_DEFAULT,
    assetsTotalLength: 0,
  },
  reducers: {
    clearAssets: (state, action) => {
      state.data = [];
    },
    resetFilter: (state, action) => {
      state.skip = 0;
      state.filteredSearch = FILTERED_SEARCH_DEFAULT;
    },
    setFilteredSearch: (state, action) => {
      state.filteredSearch = action.payload;
    },
    resetSkip: (state, action) => {
      state.skip = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get assets by category
      .addCase(getAssetsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssetsByCategory.fulfilled, (state, action) => {
        const { assets, assetsTotalLength } = action.payload;
        state.loading = false;
        if (assets) {
          state.data = [...state.data, ...assets];
          state.skip = state.data.length;
          state.assetsTotalLength = assetsTotalLength;
        }
      })
      .addCase(getAssetsByCategory.rejected, (state, action) => {
        state.loading = false;
      })
      // Filter assets
      .addCase(filterAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterAssets.fulfilled, (state, action) => {
        const { assets, assetsTotalLength } = action.payload;
        state.loading = false;
        state.data = [...state.data, ...assets];
        state.skip = state.data.length;

        state.assetsTotalLength = assetsTotalLength;
      })
      .addCase(filterAssets.rejected, (state, action) => {
        state.loading = false;
      })
      // Get not approved assets
      .addCase(getNotApprovedAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotApprovedAssets.fulfilled, (state, action) => {
        const { assets } = action.payload;
        state.loading = false;
        state.data = [...assets];
        state.skip = 0;
      })
      .addCase(getNotApprovedAssets.rejected, (state, action) => {
        state.loading = false;
      })
      // Get assets by user
      .addCase(getAssetsOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssetsOfUser.fulfilled, (state, action) => {
        const { assets } = action.payload;
        state.loading = false;
        state.data = assets;
      })
      .addCase(getAssetsOfUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {
  clearAssets,
  resetFilter,
  setFilteredSearch,
  resetSkip,
} = assetSlice.actions;
export default assetSlice.reducer;
