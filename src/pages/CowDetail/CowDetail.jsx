import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ImageNetwork } from '../../service/imageNetwork';

const CowDetail = () => {
  const [cart, setCart] = useState([]);

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
        <h1>CowDetail</h1><br />
        <Row>
            <Col>
              <img src={ImageNetwork(cow.cow_img)} alt={cow.cow_name} width={200} />
            </Col>
            <Col>
                <h2>{cow.cow_name}</h2>
                <p>{cow.cow_breed}</p>
                <Button href='/catalog' onClick={handleCreateCatalog} variant="primary">เพิ่มลงแคตตาลอก</Button>
            </Col>
        </Row>
    </Container>
  )
};

export default CowDetail;
