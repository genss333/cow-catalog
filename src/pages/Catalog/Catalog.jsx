import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CowTableCatalog from "../../components/CowTableCatalog";
import LoadingDialog from "../../components/LoadingDialog";
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
    window.location.reload();
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
      setShow(true);
      createCowCatalog(formData, lotNo);
      setShow(false);
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
        {isConfirm ? (
          <div>
            <div
              style={{
                margin: "0 auto",
                textAlign: "center",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="info" onClick={handleCancle}>
                แก้ไข
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="success" onClick={handleConfirmCatalog}>
                ยืนยันการสร้างแคตตาล็อก
              </Button>
            </div>
            <br /> <br />
            <CowTableCatalog
              handleDelete={handleDelete}
              cart={cart}
              isConfirm={isConfirm}
            />
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
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>ชื่อจริง</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstname"
                placeholder="ชื่อจริง"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastname"
                placeholder="นามสกุล"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" style={{ paddingTop: "2rem" }}>
              {cart.length > 0 ? (
                <Button type="submit" variant="primary">
                  ยืนยันการสร้างแคตตาล็อก
                </Button>
              ) : (
                <Button type="submit" variant="secondary" disabled>
                  ยืนยันการสร้างแคตตาล็อก
                </Button>
              )}
            </Form.Group>
          </Row>
          <br />
          <CowTableCatalog
            handleDelete={handleDelete}
            cart={cart}
            isConfirm={isConfirm}
          />
        </Container>
      </Form>
    );
  }
};

export default Catalog;
