import React from "react";
import { useNavigate } from "react-router-dom";
// Material ui
import { Button } from "@material-ui/core";
// Bootstrap
import Modal from "react-bootstrap/Modal";

const RegisterModal = ({
  registerModalOpen,
  setRegisterModalOpen,
  firstname,
}) => {
  const navigate = useNavigate();

  const setModalHide = () => {
    setRegisterModalOpen(false);
    // navigate('/')
  };

  return (
    <>
      <Modal
        size="md"
        centered
        show={registerModalOpen}
        onHide={() => setModalHide()}
        style={{ margin: "70px auto 30px", textAlign: "center" }}
      >
        <Modal.Header style={{ textAlign: "center", margin: "auto" }}>
          <Modal.Title style={{ fontWeight: "700" }}>
            <p>שלום {firstname}!</p>
            <h5>על מנת לאמת את הרשמתך אנא אשר את המייל שנשלח לכתובת שהזנת</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
