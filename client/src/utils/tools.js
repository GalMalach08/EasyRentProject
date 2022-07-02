import { toast } from "react-toastify";
import cookie from "react-cookies";
import { createTheme } from "@material-ui/core/styles";

import "./tools.css";
const API_KEY = "AIzaSyAR_O7jPWJ4PerXuIKr1ioZI-IzuTVNxNs";

// Toastify
export const toastify = (type, message) => {
  switch (type) {
    case "SUCCESS":
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    case "ERROR":
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    default:
      return false;
  }
};

// Loader
export const Loader = () => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="loaders">
        {" "}
        <span style={{ color: "#F1A32B" }}>Easy</span>
        <span style={{ color: "#3882A6" }}>Rent</span>
      </div>
    </div>
  );
};

// Cookies
export const getTokenCookie = () => cookie.load("x-access-token");

export const removeTokenCookie = () =>
  cookie.remove("x-access-token", { path: "/" });

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};

// Oragnaize number
export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get the coordinates from google api
export const getLocation = async (address) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );
  const { results } = await res.json();
  console.log(results);
  if (results.length === 0) return false;
  else return true;
};

export const CustomTheme = createTheme({
  direction: "rtl",
});
