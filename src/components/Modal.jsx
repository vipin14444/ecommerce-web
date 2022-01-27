import React from "react";
import "./Modal.scss";

const Modal = ({ children }) => {
  return (
    <div className={`modal-wrapper`}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
