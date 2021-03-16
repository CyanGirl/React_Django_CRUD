import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { API_URL } from "../constants";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { modeContext } from "./context";

const RemoveReview = ({ pk }) => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useContext(modeContext);

  const toggle = () => {
    setModal(!modal);
  };
  const deleteReview = (pk) => {
    console.log(pk);
    axios.delete(API_URL + pk).then(() => {
      toggle();
      setMode(!mode);
    });
  };

  return (
    <Fragment>
      <Button color="danger" onClick={() => toggle()}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really want to delete the review?
        </ModalHeader>
        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteReview(pk)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default RemoveReview;
