import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
            <th>Name</th>
            <th>Image</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {cowCatalog &&
            cowCatalog.cow_list &&
            cowCatalog.cow_list.length > 0 &&
            cowCatalog.cow_list.map((cowItem) => (
              <tr key={cowItem.cow_id}>
                <td>{cowItem.cow_id}</td>
                <td>{cowItem.cow_name}</td>
                <td>
                  <img
                    src={ImageNetwork(cowItem.cow_img)}
                    alt={cowItem.cow_name}
                    width={200}
                  />
                </td>
                <td>{cowItem.cow_breed}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Recipt;
