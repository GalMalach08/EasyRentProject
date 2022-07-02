import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  resetUserPassword,
  skipResetUserPassword,
} from "../../store/actions/user.thunk";
// Utils
import {
  passwordColor,
  createPasswordLabel,
  changePasswordColor,
} from "../../utils/password";
import { errorHelper, resetPasswordSchema } from "../../utils/formik";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Material ui
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// Formik
import { Formik } from "formik";
import zxcvbn from "zxcvbn";

// Styles
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const ChangePasswordModal = ({
  changePasswordModal,
  setChangedPasswordModal,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [score, setScore] = useState(0);
  const user = useSelector((state) => state.users.data);
  const classes = useStyles();
  const dispatch = useDispatch();

  // Form validation
  const validationSchema = resetPasswordSchema;

  // Handle password visiblity
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Password strengh function
  const checkPasswordStrength = (password) => {
    const testResult = zxcvbn(password);
    const score = (testResult.score * 100) / 4;
    setScore(score);
  };

  // Change the password
  const changePassword = async (values) => {
    dispatch(resetUserPassword({ ...values, id: user._id }))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          setChangedPasswordModal(false);
          setSuccessModal(true);
        }
      });
  };

  // Skip the change
  const skip = async () => {
    try {
      dispatch(skipResetUserPassword(user._id))
        .unwrap()
        .then(({ success }) => {
          if (success) {
            setChangedPasswordModal(false);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        centered
        show={changePasswordModal}
        onHide={() => setChangedPasswordModal(false)}
      >
        <Modal.Header>
          {" "}
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            <h4>עדכן את הסיסמה שלך</h4>
            <h6>
              שמנו לב שבצעת איפוס סיסמה, אנו ממליצים לך לשנות את הסיסמה לאחת
              שתזכור{" "}
            </h6>
          </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => changePassword(values)}
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
                  <button
                    disabled={
                      props.values.password &&
                      !props.errors.password &&
                      props.values.confirmPassword &&
                      !props.errors.confirmPassword
                        ? false
                        : true
                    }
                    type="button"
                    className="btn btn-primary m-3 btn-sm"
                    onClick={() => changePassword(props.values)}
                  >
                    אפס סיסמה
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm px-4"
                    onClick={() => skip()}
                  >
                    דלג
                  </button>
                </form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        centered
        show={successModal}
        onHide={() => setSuccessModal(false)}
      >
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            <h4>הסיסמה שונתה בהצלחה!</h4>
            <button
              type="button"
              className="btn btn-primary btn-sm px-4"
              onClick={() => setSuccessModal(false)}
            >
              סיים
            </button>
          </Modal.Title>{" "}
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
