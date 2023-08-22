import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import cowImage from "../assets/cow-1.jpg";
import useCowList from "../hooks/useCowList";
import { ImageNetwork } from "../service/imageNetwork";

const CowTable = ({ handleSelectCow, selectedCows }) => {
  const { cowList, fetchCowList } = useCowList();

  const handleCowDetail = (cow) => {
    localStorage.setItem("cowDetail", JSON.stringify(cow));
  };
  useEffect(() => {
    fetchCowList();
  }, []);

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
        {cowList.map((cowItem) => (
          <tr key={cowItem.cow_id}>
            <td align="center" onClick={()=>handleCowDetail(cowItem)}>
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
              <p>น้ำหนัก: {cowItem.cow_weight}</p>
              <p>เพศ: {cowItem.cow_sex =="F" ? "เพศเมีย":"เพศผู้"}</p>
            </td>
            <td align="left">{cowItem.cow_belly}</td>
            <td align="center">
              <input
                type="checkbox"
                onChange={() => handleSelectCow(cowItem)}
                checked={selectedCows.includes(cowItem)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CowTable;
