import QRCode from 'qrcode.react'; // Import QRCode component
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import cowImage from "../../assets/cow-1.jpg";
import useCowList from "../../hooks/useCowList";
import { ImageNetwork } from "../../service/imageNetwork";

const Recipt = () => {
  const { lotNo } = useParams();
  const [qrCodeValue, setQrCodeValue] = useState(""); // State to hold QR code value
  const { fetchCowCatalogList, cowCatalog } = useCowList();

  const onDownloadQrCode = () => {
    const canvas = document.getElementById("qrcode");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrCode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Canvas element not found.");
    }
  };
  

  useEffect(() => {
    fetchCowCatalogList(lotNo);
  }, [lotNo]);

  useEffect(() => {
    const currentUrl = window.location.href;
    setQrCodeValue(currentUrl);
  }, []);

  return (
    <Container>
      <br />
      <h1>รายการแคตตาลอค รหัส: {cowCatalog?.lot_no}</h1>
      <div>
        <h4>ข้อมูลลูกค้า</h4>
        <div>
          <h6>ชื่อ-สกุล: {cowCatalog?.exporter}</h6>
        </div>
        <br />
        <div>
          <QRCode id='qrcode' value={qrCodeValue} size={128} />
          <br />
          <br />
          <Button variant="primary" size="sm" onClick={onDownloadQrCode}>
            พิมพ์ QR Code
          </Button>
          <br />
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
          {cowCatalog?.cow_list &&
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
