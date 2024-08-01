import React from "react";
import { Modal, ModalBody } from "reactstrap";

const CommonModal = ({ show, modalBody, size,className }) => {
  return (
    <React.Fragment>
      <Modal isOpen={show} size={size} centered className={className}>
        <ModalBody>{modalBody()}</ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CommonModal;
