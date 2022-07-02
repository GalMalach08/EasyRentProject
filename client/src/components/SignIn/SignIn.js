import React, { useState, useEffect } from "react";
// Redux
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signinUser,
  signinUserByGoogle,
  registerUser,
} from "../../store/actions/user.thunk";
// Formik
import { errorHelper, signinValidationSchema } from "../../utils/formik";
import { useFormik } from "formik";
// Components
import EmailStepper from "./emailStepper";
// import Url from "../Url";
// Packages
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
// Material ui
import {
  Grid,
  TextField,
  Button,
  Paper,
  Collapse,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// Material ui icons
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// Modal
import Modal from "react-bootstrap/Modal";
// Style
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  formGrid: {
    margin: "50px auto 10px ",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  longMessage: {
    marginTop: "50px",
    fontWeight: "600",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  header: {
    textAlign: "center",
    margin: theme.spacing(2),
    fontFamily: "Chilanka",
  },
}));

const SignIn = (props) => {
  const [message, setMessage] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signinValidationSchema,
    onSubmit: (values, { resetForm }) => {
      loginUser(values);
    },
  });

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handle password visibility
  const closeModal = () => setEmailModal(false);
  const openModal = () => setEmailModal(true);

  // Log in user
  const loginUser = async (values) => {
    try {
      setButtonDisabled(true);
      dispatch(signinUser(values))
        .unwrap()
        .then(({ data }) => {
          if (data) {
            navigate(prevUrl);
          }
          setButtonDisabled(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Facebook login
  // const responseFacebook = async (facebookRes) => {
  //   const { id, email, name } = facebookRes;
  //   const firstname = name.split(" ")[0];
  //   const lastname = name.split(" ")[1];

  //   const response = await fetch(`${Url}/user/isexcist`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ facebookId: id, googleId: null }),
  //   });
  //   const { success, user } = await response.json();
  //   if (success) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     // dispatch(setIsAuth(true));
  //     navigate(prevUrl);
  //   } else {
  //     const newUserObj = {
  //       email,
  //       firstname,
  //       lastname,
  //       facebookId: id,
  //     };
  //     const response = await fetch(`${Url}/user/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...newUserObj }),
  //     });
  //     const { user, message } = await response.json();
  //     if (user) {
  //       localStorage.setItem("user", JSON.stringify(user));
  //       //  dispatch(setIsAuth(true));
  //       navigate(prevUrl);
  //     } else {
  //       setMessage(message);
  //       setOpenAlert(true);
  //     }
  // }
  // };

  // Google login
  const responseGoogle = async (googleRes) => {
    const { googleId, email, givenName, familyName } = googleRes.profileObj;
    dispatch(signinUserByGoogle(googleId))
      .unwrap()
      .then(({ auth }) => {
        if (auth) {
          navigate("/5");
        } else {
          const newUserObj = {
            email,
            firstname: givenName,
            lastname: familyName,
            googleId,
          };
          dispatch(registerUser(newUserObj))
            .unwrap()
            .then(({ auth, data }) => {
              if (data) {
                navigate(prevUrl);
              }
            });
        }
      });
    setButtonDisabled(false);
  };

  useEffect(() => {
    setPrevUrl(props.location ? props.location.state.path : "/5");
  }, [props.location]);

  return (
    <>
      <Grid container className={classes.root}>
        {/* Form grid */}
        <Grid
          item
          xs={10}
          md={4}
          component={Paper}
          square
          className={classes.formGrid}
        >
          <div className={classes.paper}>
            <img
              src="https://static.crozdesk.com/web_app_library/providers/logos/000/005/518/original/easyrent-1559230516-logo.png?1559230516"
              width="100"
              height="100"
              crop="scale"
              alt="cart"
            />
            <h4 className="signup_header">דף התחברות</h4>
            <form
              className={classes.form}
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="אימייל"
                name="email"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
              <TextField
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {" "}
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="סיסמה"
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
              {/* Error Alert */}
              <Collapse in={openAlert}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => setOpenAlert(false)}
                    >
                      {" "}
                      <CloseIcon fontSize="inherit" />{" "}
                    </IconButton>
                  }
                >
                  {message}
                </Alert>
              </Collapse>
              {/* <FacebookLogin
                appId="997958704391955"
                autoLoad={false}
                fields="name,email,picture"
                style={{ width: "100%" }}
                callback={responseFacebook}
                textButton="התחבר באמצעות פייסבוק"
                cssClass="loginBtn loginBtn--facebook"
              /> */}
              <GoogleLogin
                render={(renderProps) => (
                  <>
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      type="button"
                      className="loginBtn loginBtn--google"
                    >
                      התחבר באמצעות גוגל
                    </button>
                  </>
                )}
                clientId="521974913551-b851j9ui32ie4juj8b7u7gf42f4th7fj.apps.googleusercontent.com"
                buttonText="התחבר דרך גוגל"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              <Button
                disabled={
                  !buttonDisabled &&
                  formik.values.email &&
                  formik.values.password &&
                  !formik.errors.password
                    ? false
                    : true
                }
                className="my-3"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {" "}
                התחבר{" "}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    אין לך משתמש באתר? עבור לדף הרשמה
                  </Link>
                </Grid>
                <Grid container>
                  <Grid item className="mt-3">
                    <Link
                      to="/signin"
                      variant="body2"
                      onClick={() => openModal()}
                    >
                      שכחתי את הסיסמה
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>

        {/* Modal */}
        <Modal size="lg" centered show={emailModal} onHide={closeModal}>
          <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Modal.Title>
              {" "}
              <h4> עדכן את הסיסמה שלך </h4>
            </Modal.Title>{" "}
          </Modal.Header>
          <Modal.Body>
            <EmailStepper setEmailModal={setEmailModal} />
          </Modal.Body>
        </Modal>
      </Grid>
    </>
  );
};

export default SignIn;
// 521974913551-b851j9ui32ie4juj8b7u7gf42f4th7fj.apps.googleusercontent.com
