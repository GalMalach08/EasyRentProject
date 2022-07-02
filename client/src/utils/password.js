import zxcvbn from "zxcvbn";

// Password strengh functions
export const passwordColor = (score) => {
  switch (score) {
    case 0:
      return "#828282";
    case 25:
      return "#ea1111";
    case 50:
      return "#ffad00";
    case 75:
      return "lightGreen";
    case 100:
      return "#00b500";
    default:
      return "none";
  }
};

export const createPasswordLabel = (score) => {
  switch (score) {
    case 25:
      return "חלשה מאוד";
    case 50:
      return "חלשה";
    case 75:
      return "טובה";
    case 100:
      return "חזקה";
    default:
      return "";
  }
};

export const changePasswordColor = (score) => {
  return {
    width: `${score}%`,
    backgroundColor: `${passwordColor(score)}`,
    height: "7px",
  };
};
