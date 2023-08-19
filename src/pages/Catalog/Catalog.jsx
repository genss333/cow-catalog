import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CowTableCatalog from "../../components/CowTableCatalog";
import LoadingDialog from "../../components/LoadingDialog";
import MemberData from "../../components/MemberData";
import NumberOfCatalog from "../../components/NumberOfCatalog";
import useCowList from "../../hooks/useCowList";

const Catalog = () => {
  const [cart, setCart] = useState([]);
  const [lotNo, setLotNo] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const { createCowCatalog } = useCowList();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCartAndStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (cowItem) => {
    const updatedCart = cart.filter((item) => item.cow_id !== cowItem.cow_id);
    updateCartAndStorage(updatedCart);
  };

  const handleCancle = () => {
    setIsConfirm(false);
  };

  const handleConfirmCatalog = async () => {
    const formData = {
      cow_uuid: cart.map((item) => `${item.cow_uuid}`),
      catalog: {
        lot_no: lotNo,
        exporter: formValues.firstname + " " + formValues.lastname,
      },
    };
    try {
      createCowCatalog(formData,lotNo);
      setShow(true);
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      navigate("/error");
    }
  };

  const [validated, setValidated] = useState(false);

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLotNo(uuidv4());
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const formValues = {};

      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      setFormValues(formValues);

      form.reset();
      setValidated(false);
      setIsConfirm(true);
    }
    setValidated(true);
  };

  if (isConfirm) {
    if (show) {
      return <LoadingDialog show={show} />;
    }
    return (
      <Container>
        <h1>Catalog</h1>
        <br />
        <Row>
          <Col>
            <MemberData data={formValues} />
          </Col>
          <Col md="auto"></Col>
          <Col xs lg="3">
            <NumberOfCatalog lot={uuidv4()} />
          </Col>
        </Row>
        <br />
        <CowTableCatalog
          handleDelete={handleDelete}
          cart={cart}
          isConfirm={isConfirm}
        />
        <br /> <br />
        {isConfirm ? (
          <div>
            <Button variant="success" onClick={handleConfirmCatalog}>
              ยืนยันการสร้างแคตตาล็อก
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="info" onClick={handleCancle}>
              กลับไปแก้ไขแคตตาล็อก
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    );
  } else {
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Container>
          <br />
          <Row>
            <Col>
              <h1>Catalog</h1> <br />
            </Col>
            <Col md="auto"></Col>
            <Col xs lg="3">
              <Button variant="primary" href="/">
                กลับหน้าหลัก
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstname"
                placeholder="First name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastname"
                placeholder="Last name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <CowTableCatalog
            handleDelete={handleDelete}
            cart={cart}
            isConfirm={isConfirm}
          />
          <br /> <br />
          {cart.length > 0 ? (
            <Button type="submit" variant="primary">
              ยืนยันการสร้างแคตตาล็อก
            </Button>
          ) : (
            <Button type="submit" variant="secondary" disabled>
              ยืนยันการสร้างแคตตาล็อก
            </Button>
          )}
        </Container>
      </Form>
    );
  }
};

export default Catalog;
