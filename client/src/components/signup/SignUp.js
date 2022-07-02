import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { errorHelper, signupValidationSchema } from "../../utils/formik";
import {
  passwordColor,
  createPasswordLabel,
  changePasswordColor,
} from "../../utils/password";
import { toastify } from "../../utils/tools";
import { useDispatch } from "react-redux";
// import { setIsAuth } from "../../store/actions";
import { registerUser } from "../../store/actions/user.thunk";
import RegisterModal from "./registrationModal/RegistrationModal";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Collapse,
  InputAdornment,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// formik
import { Formik } from "formik";
import zxcvbn from "zxcvbn";
// css
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  image: {
    position: "relative",
    backgroundRepeat: "no-repeat",
    alignSelf: "center",
    backgroundPosition: "0 0",
    backgroundSize: "454px 618px",
    flexBasis: "454px",
    height: "618px",
  },
  formGrid: {
    margin: "70px auto",
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(true);
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  // Form validation
  const validationSchema = signupValidationSchema;

  // Handle password visiblity
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handle confirm password visiblity
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Sign up new user
  const signUpUser = async (values) => {
    try {
      setButtonDisabled(true);
      dispatch(registerUser(values))
        .unwrap()
        .then(({ data }) => {
          if (data) {
            navigate("/5");
            toastify(
              "SUCCESS",
              "ברוכה הבאה! אנא בדוק את המייל שלך על מנת לאמת את המשתמש"
            );
          }
        });
      setButtonDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkPasswordStrength = (password) => {
    const testResult = zxcvbn(password);
    const score = (testResult.score * 100) / 4;
    setScore(score);
  };

  return (
    <Grid container className={classes.root}>
      {/* Sign up form */}
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
        elevation={6}
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
          <h4 className="signup_header">דף הרשמה</h4>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstname: "",
              lastname: "",
              phoneNumber: "",
            }}
            onSubmit={(values) => signUpUser(values)}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(props) => (
              <>
                <form
                  style={{ textAlign: "center" }}
                  onSubmit={props.handleSubmit}
                  autoComplete="off"
                >
                  <>
                    <TextField
                      className={classes.textField}
                      name="email"
                      margin="normal"
                      label="אימייל"
                      variant="outlined"
                      fullWidth
                      {...props.getFieldProps("email")}
                      {...errorHelper(props, "email")}
                    />

                    <TextField
                      className={classes.textField}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="סיסמה"
                      onKeyUp={(e) => checkPasswordStrength(e.target.value)}
                      {...props.getFieldProps("password")}
                      {...errorHelper(props, "password")}
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
                    />
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={changePasswordColor(score)}
                      ></div>
                    </div>
                    <p
                      style={{
                        color: passwordColor(score),
                        textAlign: "left",
                        margin: "2px",
                      }}
                    >
                      {createPasswordLabel(score)}
                    </p>

                    <TextField
                      className={classes.textField}
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="אימות סיסמה"
                      {...props.getFieldProps("confirmPassword")}
                      {...errorHelper(props, "confirmPassword")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickConfirmPassword}>
                              {" "}
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}{" "}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>

                  <TextField
                    className={classes.textField}
                    name="firstname"
                    margin="normal"
                    label="שם פרטי"
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("firstname")}
                    {...errorHelper(props, "firstname")}
                  />
                  <TextField
                    className={classes.textField}
                    name="lastname"
                    margin="normal"
                    label="שם משפחה"
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("lastname")}
                    {...errorHelper(props, "lastname")}
                  />

                  <TextField
                    className={classes.textField}
                    name="phoneNumber"
                    margin="normal"
                    label="מספר טלפון"
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("phoneNumber")}
                    {...errorHelper(props, "phoneNumber")}
                  />

                  <Button
                    disabled={
                      props.values.firstname &&
                      props.values.lastname &&
                      props.values.email &&
                      props.values.password &&
                      !props.errors.password &&
                      props.values.confirmPassword &&
                      props.values.phoneNumber &&
                      !props.errors.phoneNumber &&
                      !buttonDisabled
                        ? false
                        : true
                    }
                    className="my-3"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => signUpUser(props.values)}
                  >
                    {" "}
                    הרשם{" "}
                  </Button>

                  {/* Alert error */}
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

                  <Grid container>
                    <Grid item>
                      <Link to="/signin" variant="body2">
                        {" "}
                        יש לך משתמש ? עבור לדף ההתחברות
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignUp;
