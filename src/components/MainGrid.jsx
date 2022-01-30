import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../config";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;

const MainGrid = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (pageNumber) => {
    try {
      const url = `${api}/product/GetList`;
      const data = {
        pageSize: PAGE_SIZE,
        pageNo: pageNumber || 0,
      };
      const response = await axios.post(url, data);
      if (response.data) {
        setList(response.data.payload.list);
        setCount(response.data.payload.count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="list-container">
      <button onClick={(e) => navigate("/new")}>Add New Record</button>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td>{item.prodName}</td>
              <td>{item.prodDescription}</td>
              <td>
                <button
                  type="button"
                  onClick={(e) => navigate(`/edit/${item.productId}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tfoot">
        <div className="pagination">
          {[...new Array(Math.ceil(parseInt(count) / PAGE_SIZE))].map(
            (item, i) => (
              <div
                className={`pagination-link ${
                  pageNo === i ? "page-active" : ""
                }`}
                onClick={() => {
                  getData(i);
                  setPageNo(i);
                }}
              >
                {i + 1}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
