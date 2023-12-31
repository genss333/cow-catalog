import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import cowImage from "../../assets/cow-1.jpg";
import { ImageNetwork } from "../../service/imageNetwork";

const CowDetail = () => {
  const [cart, setCart] = useState([]);
  const cowItem = JSON.parse(localStorage.getItem("cowDetail"));
  const cow = JSON.parse(localStorage.getItem("cowDetail"));

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCreateCatalog = () => {
    if (!cart.some((cartItem) => cartItem.cow_id === cow.cow_id)) {
      setCart([...cart, cow]);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={10} md={6} lg={8}>
          <Carousel data-bs-theme="ligth">
            {cow.cow_img_list.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={ImageNetwork(img)}
                  alt={cowItem.cow_name}
                  style={{ maxWidth: "100%" }}
                  onError={(e) => {
                    e.target.src = cowImage;
                  }}
                />
                <Carousel.Caption>
                <h5>{cow.cow_name}</h5>
                <p>
                  รูปที่ {index + 1} จาก {cow.cow_img_list.length} รูป
                </p>
              </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <br />
          <h2>ชื่อโค: {cow.cow_name}</h2>
          <p>สายพันธุ์:{cow.cow_breed}</p>
          <p>อายุ: {cow.cow_age}</p>
          <p>น้ำหนัก: {cow.cow_weight === 0 ? "ยังไม่บันทึกน้ำหนัก" : cow.cow_weight + ' กิโลกรัม'}</p>
          <p>เพศ: {cow.cow_sex == "F" ? "เพศเมีย" : "เพศผู้"}</p>
          <Button
            href="/catalog"
            onClick={handleCreateCatalog}
            variant="primary"
          >
            เพิ่มลงแคตตาลอก
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CowDetail;
