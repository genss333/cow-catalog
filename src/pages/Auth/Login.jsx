import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { JwtSecretKey } from "../../constants/appConstant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === "naihoi@zyanwoa.com" && password === "12345678"){
      localStorage.setItem("token", JwtSecretKey);
      window.location.href = "/";
    }else{
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div
      className="container"
      style={{
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="อีเมล"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="รหัสผ่าน"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>{" "}
        <br /> <br />
        <Row>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
