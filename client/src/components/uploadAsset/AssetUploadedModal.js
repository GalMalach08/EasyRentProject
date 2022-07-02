import React from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Material ui
import { Button } from "@material-ui/core";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Css
import "./style.css";

const AssetUploadedModal = ({ modalOpen, setModalOpen, isUpdate }) => {
  const user = useSelector((state) => state.users.data);
  const navigate = useNavigate();

  return (
    <>
      <Modal
        size="md"
        centered
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ margin: "70px auto 30px", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "700" }}>
            <p>תודה {user.firstname}!</p>
            {isUpdate ? (
              <h5>
                עדכון נכסים עוזר לנו להשאר רלוונטים ומגדיל את הסיכויים שהנכס שלך
                יושכר בסוף!
              </h5>
            ) : (
              <h5>
                הנכס שלך הועבר לבדיקה, במידה והנכס יעבור את הבדיקות הוא יעלה
                לאתר והודעה תשלח לכתובת המייל שהזנת
              </h5>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            className="my-3"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/5")}
          >
            מעבר לדף הבית
          </Button>
          <Button
            className="m-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(`/myassets/${user._id}`)}
          >
            {" "}
            מעבר לדף הכנסים האישי
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssetUploadedModal;
