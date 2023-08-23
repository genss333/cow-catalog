import React from "react";
import { CloseButton } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ImageNetwork } from "../service/imageNetwork";
import cowImage from "../assets/cow-1.jpg";
import { Link } from "react-router-dom";

const CowTableCatalog = ({ handleDelete, cart, isConfirm }) => {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>ชื่อโค</th>
          <th>รายละเอียด</th>
          <th>สถานะ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((cowItem) => (
          <tr key={cowItem.cow_id}>
            <td align="center" onClick={() => handleCowDetail(cowItem)}>
              <Link to={"/detail"}>
                <img
                  src={ImageNetwork(cowItem.cow_img)}
                  alt={cowItem.cow_name}
                  style={{ maxWidth: "5rem" }}
                  onError={(e) => {
                    e.target.src = cowImage;
                  }}
                />
              </Link>
            </td>
            <td align="left">{cowItem.cow_name}</td>
            <td align="left">
              <p>สายพันธุ์: {cowItem.cow_breed}</p>
              <p>อายุ: {cowItem.cow_age}</p>
              <p>เพศ: {cowItem.cow_sex == "F" ? "เพศเมีย" : "เพศผู้"}</p>
            </td>
            <td align="left">{cowItem.cow_belly}</td>
            <td align="center">
              {isConfirm ? null : (
                <td>
                  <CloseButton onClick={() => handleDelete(cowItem)} />
                </td>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CowTableCatalog;
