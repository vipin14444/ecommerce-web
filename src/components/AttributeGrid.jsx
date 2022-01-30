import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import { api } from "../config";
import AddAttributeModal from "./AddAttributeModal";

const AttributeGrid = ({ prodCategory, list, setList }) => {
  const [productAttributeList, setProductAttributeList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prodCategory) getProductAttributeList();
  }, [prodCategory]);

  const getProductAttributeList = async () => {
    const url = `${api}/Product/GetProductAttributeLookup?CatId=${prodCategory}`;
    const response = await axios.get(url);

    if (response.data.payload) {
      setProductAttributeList(response.data.payload);
    }
  };

  const showModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const addAttribute = (row) => {
    setList([...list, row]);
    closeModal();
  };

  if (!prodCategory) return null;

  return (
    <div className="trans-grid-container">
      <div className="trans-actions">
        <button type="button" onClick={showModal}>
          Add
        </button>
      </div>
      {show && (
        <AddAttributeModal
          productAttributeList={productAttributeList}
          closeModal={closeModal}
          addAttribute={addAttribute}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Attribute Name</th>
            <th>Attribute Value</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td>{item.attributeName}</td>
              <td>{item.attributeValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttributeGrid;
