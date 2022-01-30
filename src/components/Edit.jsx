import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../config";
import AttributeGrid from "./AttributeGrid";

const Edit = () => {
  const [productId, setProductId] = useState(0);
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodCatId, setProdCatId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [attributeGridList, setAttributeGridList] = useState([]);

  const history = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const url = `${api}/Product/GetAllProductCategory`;
      const response = await axios.get(url);
      setCategoryList(response.data.payload);

      const url2 = `${api}/Product/GetProduct?id=${params.id}`;
      const response2 = await axios.get(url2);
      let data = response2.data.payload;
      setProdName(data.prodName);
      setProdDescription(data.prodDescription);
      setProdCatId(data.prodCatId);
      setAttributeGridList(data.prodAttributes);
      setProductId(data.productId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const url = `${api}/Product/GetAllProductCategory`;
      const response = await axios.get(url);
      setCategoryList(response.data.payload);
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!prodName || !prodDescription || !prodCatId) {
      alert("Please fill all the fields before saving.");
      return;
    }

    try {
      const url = `${api}/product/EditProduct`;
      const prodAttributes = attributeGridList;
      const data = {
        productId,
        prodName,
        prodDescription,
        prodCatId,
        prodAttributes,
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
    setProdCatId(e.target.value);
    setAttributeGridList([]);
  };

  return (
    <div className="form-page">
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
            value={prodCatId}
          >
            <option value={null}></option>
            {categoryList.map((item, i) => (
              <option key={i} value={item.prodCatId}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>

        <AttributeGrid
          prodCategory={prodCatId}
          list={attributeGridList}
          setList={setAttributeGridList}
        />

        <div className="page-actions">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
