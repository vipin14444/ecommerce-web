import React, { useState } from "react";
import Modal from "./Modal";

const AddAttributeModal = ({
  productAttributeList,
  closeModal,
  addAttribute,
}) => {
  const [attributeId, setAttributeId] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  const onSave = () => {
    if (!attributeId) {
      alert("Please select attribute id.");
      return;
    }

    addAttribute({
      attributeId,
      attributeValue,
      attributeName: productAttributeList.find(
        (x) => parseInt(x.attributeId) === parseInt(attributeId)
      ).attributeName,
    });
  };

  return (
    <Modal>
      <div className="modal-header">
        <div className="title">Add New Attribute</div>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="attributeName">Attribute Name</label>
          <select
            onChange={(e) => setAttributeId(e.target.value)}
            name="attributeName"
            id="attributeName"
            value={attributeId}
          >
            <option value={""}></option>
            {productAttributeList.map((item, i) => (
              <option key={i} value={item.attributeId}>
                {item.attributeName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="modalAttributeValue">Attribute Value</label>
          <input
            id="modalAttributeValue"
            type="text"
            value={attributeValue}
            onChange={(e) => setAttributeValue(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={onSave}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddAttributeModal;
