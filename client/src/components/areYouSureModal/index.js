import React from "react";
import { useSelector } from "react-redux";
// Material ui
import { Button } from "react-bootstrap";
// Bootstrap
import Modal from "react-bootstrap/Modal";

// Target of the component - open a modal that assure that the user intrested to continue with the action (delete,updateor add) asset
const AreYouSureModal = ({
  modalOpen,
  setModalOpen,
  message,
  functionToExcute,
  modalType,
}) => {
  const user = useSelector((state) => state.users.data);

  return (
    <>
      <Modal
        size="md"
        centered
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ margin: "auto", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: "700",
              margin: "auto",
            }}
          >
            <p>שלום {user.firstname} !</p>

            <h5>{message}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            className="my-3"
            variant={
              modalType === "approve" ||
              modalType === "upload" ||
              modalType === "update"
                ? "outline-success"
                : "outline-danger"
            }
            size="lg"
            onClick={() => {
              setModalOpen(false);
              functionToExcute();
            }}
          >
            {modalType === "approve"
              ? "אשר"
              : modalType === "upload"
              ? "אישור"
              : modalType === "update"
              ? "עדכן"
              : "מחק"}
          </Button>
          <Button
            className="m-3"
            variant="outline-primary"
            size="lg"
            onClick={() => setModalOpen(false)}
          >
            חזור
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
