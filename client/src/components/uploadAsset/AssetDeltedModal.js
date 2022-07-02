import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
// Material ui
import { Button } from "@material-ui/core";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Css
import "./style.css";

const AssetDeletedModal = ({ DeletedmodalOpen, message }) => {
  const user = useSelector((state) => state.users.data);
  const navigate = useNavigate();

  return (
    <>
      <Modal
        size="md"
        centered
        show={DeletedmodalOpen}
        onHide={() => navigate("/5")}
        style={{ margin: "auto", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: "700",
              margin: "auto",
            }}
          >
            <p>תודה {user.firstname}!</p>

            <h5>{message}</h5>
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

export default AssetDeletedModal;
