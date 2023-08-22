import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import cowImage from "../../assets/cow-1.jpg";
import useCowList from "../../hooks/useCowList";
import { ImageNetwork } from "../../service/imageNetwork";

const Recipt = () => {
  const { lotNo } = useParams();

  const { fetchCowCatalogList, cowCatalog } = useCowList();

  useEffect(() => {
    fetchCowCatalogList(lotNo);
  }, []);

  return (
    <Container>
      <br />
      <h1>รายการแคตตาลอค รหัส: {cowCatalog.lot_no}</h1>
      <div>
        <h4>ข้อมูลลูกค้า</h4>
        <div>
          <h6>ชื่อ-สกุล: {cowCatalog.exporter}</h6>
        </div>
        <br />
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อโค</th>
            <th>รายละเอียด</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {cowCatalog &&
            cowCatalog.cow_list &&
            cowCatalog.cow_list.length > 0 &&
            cowCatalog.cow_list.map((cowItem) => (
              <tr key={cowItem.cow_id}>
                <td>
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
                  <p>เพศ: {cowItem.cow_sex === "F" ? "เพศเมีย" : "เพศผู้"}</p>
                </td>
                <td align="left">{cowItem.cow_belly}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Recipt;
