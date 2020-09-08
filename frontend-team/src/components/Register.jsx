import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Register(props) {
  const { credentials, register, setData } = props;
  const mystyle = {
    border: "1px solid black",
    backgroundColor: "whitesmoke",
    padding: "10px",
    fontFamily: "Arial",
    marginBottom: "10rem",
  };
  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="mt-5" style={mystyle}>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
              style={{ width: "250px", marginLeft: "110px" }}
            ></img>
            <div className="mt-3 my-3 ml-3 mr-3">
              <Form
                onSubmit={(e) => {
                  register(e);
                }}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={credentials.name}
                    onChange={(e) => setData({ name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={credentials.surname}
                    onChange={(e) => setData({ surname: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setData({ username: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={(e) => setData({ email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setData({ password: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
