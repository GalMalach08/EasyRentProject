import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendVerificationMail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";
import { Alert, Button } from "react-bootstrap";

const AlertBox = () => {
  const user = useSelector((state) => state.users.data);
  const [buttonDisables, setButtonDisables] = useState(false);
  const dispatch = useDispatch();

  const sendEmail = () => {
    setButtonDisables(true);
    dispatch(sendVerificationMail(user._id))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          toastify("SUCCESS", "נשלח אימייל לאימות לכתובת המייל שהזנת");
          setButtonDisables(false);
        }
      });
  };
  return (
    <Alert variant="success">
      <Alert.Heading>היי {user.firstname}</Alert.Heading>
      <p>
        {" "}
        על מנת להעלות נכס חדש עליך לאמת את המשתמש שלך דרך המייל שנשלח אליך
        לכתובת איתה נרשמת בדף זה ניתן לעלות נכסים למערכת
      </p>
      <hr />
      <p className="mb-0">
        <Button
          disabled={buttonDisables}
          variant="outline-success"
          onClick={() => sendEmail()}
        >
          לשליחת מייל חדש לחץ כאן
        </Button>{" "}
      </p>
    </Alert>
  );
};

export default AlertBox;
