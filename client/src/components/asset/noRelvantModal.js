import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { sendComplainMessage } from "../../store/actions/customer.thunk";
// Tools
import { toastify } from "../../utils/tools";
// React-Bootstrap
import Modal from "react-bootstrap/Modal";
// Material ui
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

// Modal for sending message about not relevant asset
const NotRelvantModal = ({
  notRelevantModal,
  setNotRelevantModal,
  assetId,
}) => {
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  // Find errors in input
  const findError = (e) => {
    setTextValue(e.target.value);
    textValue.length < 20
      ? setError("מינימום 20 תווים")
      : textValue.length === 0
      ? setError("שדה זה הינו חובה")
      : setError("");
  };

  // Send the message to the database
  const sendMessage = async () => {
    const obj = {
      userId: user._id,
      assetId,
      content: textValue,
      date: new Date().toDateString(),
    };
    dispatch(sendComplainMessage(obj))
      .unwrap()
      .then(({ request }) => {
        if (request) {
          setNotRelevantModal(false);
          toastify("SUCCESS", "תודה! פנייתך נרשמה במערכת ותטופל בהקדם");
        }
      });
  };

  return (
    <>
      <Modal
        size="lg"
        centered
        show={notRelevantModal}
        onHide={() => setNotRelevantModal(false)}
      >
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            <h4>אנא פרט את הסיבה שבגללה הנכס לא רלוונטי</h4>
          </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <TextareaAutosize
            rowsMin={3}
            placeholder=" מינימום 20 תווים.."
            name="textValue"
            style={{ width: "80%", padding: "7px" }}
            onChange={(e) =>
              error ? findError(e) : setTextValue(e.target.value)
            }
            onBlur={(e) => findError(e)}
          />

          {error && (
            <p className="error" style={{ width: "80%", margin: "5px auto" }}>
              *{error}
            </p>
          )}

          <button
            disabled={textValue.length < 20}
            type="button"
            className="btn btn-primary btn-sm px-4"
            onClick={() => sendMessage()}
            style={{ width: "50%", margin: "10px auto" }}
          >
            שלח
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NotRelvantModal;
