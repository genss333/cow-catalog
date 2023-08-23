import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CowTable from "../../components/CowTable";
import FarmDropDown from "../../components/DropDown";

const Home = () => {
  const [selectedCows, setSelectedCows] = useState([]);
  const [memberUuid, setMemberUuid] = useState("");
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
    <Fragment>
      <Container>
      <FarmDropDown handleSelectFarm={handleSelectFarm} />
      <br />
        <Row>
          <Col sm={11} md={10} lg={10} xl={11}>
          </Col>
          <Col>
              <Button
                variant="success"
                onClick={handleCreateCatalog}
                href="/catalog"
              >
                สร้าง <Badge bg="secondary">{selectedCows.length}</Badge>
              </Button>
          </Col>
        </Row>
        <br />
        <CowTable
          handleSelectCow={handleCowSelect}
          selectedCows={selectedCows}
          member={memberUuid}
        />
      </Container>
    </Fragment>
  );
};

export default Home;
