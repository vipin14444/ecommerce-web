import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config";
import Modal from "./Modal";

const New = () => {
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodAttributes, setProdAttributes] = useState([]);

  const [prodCategories, setProdCategories] = useState([]);
  const [attributeLookup, setAttributeLookup] = useState([]);

  const [showTrans, setShowTrans] = useState(false);
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  const [modalAttribute, setModalAttribute] = useState("");
  const [modalAttributeValue, setModalAttributeValue] = useState("");

  const history = useNavigate();

  useEffect(() => {
    (async () => {
      const url = `${api}/Product/GetAllProductCategory`;
      const response = await axios.get(url);
      setProdCategories(response.data.payload);
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${api}/product/CreateProduct`;

      // {
      //   attributeId: modalAttribute,
      //   attributeLabel: attrbuteLabel,
      //   attributeName: modalAttributeValue,
      // },

      const attArr = prodAttributes.map((x) => ({
        attributeId: x.attributeId,
        attributeValue: x.attributeName,
      }));

      const data = {
        prodName,
        prodDescription,
        prodCatId: prodCategory,
        prodAttributes: attArr,
      };
      const response = await axios.post(url, data);

      if (response.data.statusCode === 200) {
        history("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSelectCategory = (e) => {
    console.log(e.target.value);
    setProdCategory(e.target.value);
    setProdAttributes([]);

    if (!e.target.value) {
      setShowTrans(false);
      setShowAttributesModal(false);
      return;
    }

    setShowTrans(true);
  };

  const addAttribute = () => {
    if (!modalAttribute) {
      alert("Please select a attribute.");
      return;
    }

    const attrbuteLabel = attributeLookup.find(
      (x) => x.attributeId === parseInt(modalAttribute)
    ).attributeName;

    setProdAttributes([
      ...prodAttributes,
      {
        attributeId: modalAttribute,
        attributeLabel: attrbuteLabel,
        attributeName: modalAttributeValue,
      },
    ]);
    setModalAttribute("");
    setModalAttributeValue("");
    setShowAttributesModal(false);
  };

  const onClickShowAttributeModal = async (e) => {
    const url = `${api}/Product/GetProductAttributeLookup?CatId=${prodCategory}`;
    const response = await axios.get(url);

    if (response.data.payload) {
      setAttributeLookup(response.data.payload);
      setShowAttributesModal(true);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="prodName">Product Name</label>
          <input
            type="text"
            id="prodName"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prodDescription">Product Description</label>
          <input
            type="text"
            id="prodDescription"
            value={prodDescription}
            onChange={(e) => setProdDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prodCategory">Product Category</label>
          <select
            onChange={onSelectCategory}
            name="prodCategory"
            id="prodCategory"
          >
            <option value={null}></option>
            {prodCategories.map((item, i) => (
              <option key={i} value={item.prodCatId}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>

        {showTrans && (
          <div>
            <div className="trans-actions">
              <button type="button" onClick={onClickShowAttributeModal}>
                Add
              </button>
            </div>
            {showAttributesModal && (
              <Modal>
                <div className="modal-header">
                  <div className="title">Add New Attribute</div>
                  <button
                    type="button"
                    onClick={(e) => setShowAttributesModal(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="attributeId">Attribute Id</label>
                    <select
                      onChange={(e) => setModalAttribute(e.target.value)}
                      name="attributeId"
                      id="attributeId"
                    >
                      <option value={""}></option>
                      {attributeLookup.map((item, i) => (
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
                      value={modalAttributeValue}
                      onChange={(e) => setModalAttributeValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={addAttribute}>
                    Save
                  </button>
                </div>
              </Modal>
            )}
            <table>
              <thead>
                <tr>
                  <th>Attribute Name</th>
                  <th>Attribute Value</th>
                </tr>
              </thead>
              <tbody>
                {prodAttributes.map((item, i) => (
                  <tr key={i}>
                    <td>{item.attributeLabel}</td>
                    <td>{item.attributeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default New;
