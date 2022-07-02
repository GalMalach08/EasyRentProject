import * as Yup from "yup";
import { getLocation } from "./tools";

export const errorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values] ? true : false,
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});
// sign up
export const signupValidationSchema = Yup.object().shape({
  firstname: Yup.string().required("אנא הכנס שם פרטי"),
  lastname: Yup.string().required("אנא הכנס שם משפחה"),
  email: Yup.string()
    .required("אנא הכנס אימייל")
    .email("כתובת האימייל אינה תקינה"),
  password: Yup.string()
    .required("אנא הכנס סיסמה")
    .min(6, "הסיסמה חייבת להיות באורך של 6 תווים לפחות"),
  confirmPassword: Yup.string()
    .required("אנא אמת את הסיסמה")
    .oneOf([Yup.ref("password"), null], "הסיסמאות לא תואמות"),
  phoneNumber: Yup.string()
    .required("אנא הכנס מספר טלפון")
    .min(6, "מספר הטלפון אינו תקין")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "מספר הטלפון אינו תקין"
    ),
});

// sign in
export const signinValidationSchema = Yup.object({
  email: Yup.string().required("אנא הכנס אימייל"),
  password: Yup.string()
    .required("אנא הכנס סיסמה")
    .min(6, "הסיסמה חייבת להכיל לפחות 6 תווים"),
});

export const assetValidationSchema = Yup.object({
  owner: Yup.string().required("שם בעל הנכס הוא חובה"),
  email: Yup.string().required("אימייל הוא חובה"),
  phoneNumber: Yup.string().required("מספר טלפון הוא חובה"),
  address: Yup.string()
    .required("כתובת היא חובה")
    .test("isValid", "נא הכנס כתובת מלאה ותקינה", function(value) {
      return getLocation(value);
    }),
  price: Yup.number().required("הכנסת מחיר היא חובה"),
  notes: Yup.string().max(
    40,
    "לא מעבר ל40 תווים, אם ברצונך לפרט עשה זאת בשדה הבאש"
  ),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("אנא הכנס סיסמה")
    .min(6, "הסיסמה חייבת להיות באורך של 6 תווים לפחות"),
  confirmPassword: Yup.string()
    .required("אנא אמת את הסיסמה")
    .oneOf([Yup.ref("password"), null], "הסיסמאות לא תואמות"),
});
