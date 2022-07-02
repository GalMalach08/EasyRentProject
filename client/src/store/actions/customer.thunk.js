import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenCookie } from "../../utils/tools";
// Add asset to the database
export const sendComplainMessage = createAsyncThunk(
  "assets/sendComplainMessage",
  async (obj) => {
    try {
      const response = await fetch(`/customerService`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        body: JSON.stringify(obj),
      });
      const { request } = await response.json();
      return { request };
    } catch (error) {
      console.error(error);
    }
  }
);
