import React from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import cowImage from "../../assets/cow-1.jpg";
import { ImageNetwork } from "../../service/imageNetwork";

const ReciptcowDetail = () => {
  const cow = JSON.parse(localStorage.getItem("cowDetail"));
  const { lotNo } = useParams();

  return (
    <Container>
      <br />
      <Row>
        <Col sm={10} md={6} lg={8}>
          <img
            src={ImageNetwork(cow.cow_img)}
            alt={cow.cow_name}
            style={{ maxWidth: "100%" }}
            onError={(e) => {
              e.target.src = cowImage;
            }}
          />
        </Col>
        <Col>
          <br />
          <h2>ชื่อโค: {cow.cow_name}</h2>
          <p>สายพันธุ์:{cow.cow_breed}</p>
          <p>อายุ: {cow.cow_age}</p>
          <p>เพศ: {cow.cow_sex == "F" ? "เพศเมีย" : "เพศผู้"}</p>
          <Button href={"/catalog/" + lotNo} variant="primary">
            กลับไปหน้าแคตตาล็อก
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReciptcowDetail;
