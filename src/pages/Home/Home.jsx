import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import CowTable from "../../components/CowTable";
import FarmDropDown from "../../components/DropDown";

const Home = () => {
  const [selectedCows, setSelectedCows] = useState([]);
  const [memberUuid , setMemberUuid] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCowSelect = (cowItem) => {
    if (selectedCows.includes(cowItem)) {
      setSelectedCows(selectedCows.filter((cow) => cow !== cowItem));
    } else {
      setSelectedCows([...selectedCows, cowItem]);
    }
  };

  const handleCreateCatalog = () => {
    const newItems = selectedCows.filter(
      (cowItem) => !cart.some((cartItem) => cartItem.cow_id === cowItem.cow_id)
    );
    setCart([...cart, ...newItems]);
    setSelectedCows([]);
  };

  const handleSelectFarm = (farm) => {
    setMemberUuid(farm.member_uuid);
  };

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <h1>Naihoi</h1>
        </Col>
        <Col md="auto"></Col>
        <Col xs lg="3">
          <Button variant="primary" href="/catalog">
            แคตตาลอก <Badge bg="secondary">{cart.length}</Badge>
          </Button>
        </Col>
      </Row>
      <br />
      <FarmDropDown handleSelectFarm={handleSelectFarm}/>
      <br />
      <CowTable handleSelectCow={handleCowSelect} selectedCows={selectedCows} member={memberUuid} />
      <Button variant="success" onClick={handleCreateCatalog} href="/catalog">
        สร้างแคตตาลอก <Badge bg="secondary">{selectedCows.length}</Badge>
      </Button>
    </Container>
  );
};

export default Home;
