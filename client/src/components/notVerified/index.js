import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationMail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";

import { Button } from "react-bootstrap";

const NotVerified = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const sendEmail = () => {
    setButtonDisabled(true);
    dispatch(sendVerificationMail(user.data._id))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          toastify("SUCCESS", "נשלח אימייל לאימות לכתובת המייל שהזנת");
          setButtonDisabled(false);
        }
      });
  };
  return (
    <div>
      {" "}
      {user && !user.data.isVerified && user.auth ? (
        <>
          <div className="not_verified">
            המשתמש לא מאומת
            <Button
              className="m-2"
              size="sm"
              disabled={buttonDisabled}
              variant="outline-light"
              onClick={() => sendEmail()}
            >
              לשליחת מייל חדש לחץ כאן
            </Button>{" "}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NotVerified;
