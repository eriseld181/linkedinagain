import React, { Component } from 'react';
import { Container,  Button, Form, Image, Row, Col, Nav } from 'react-bootstrap'

class Login extends Component {

    state = {
        name: '',
        password: '',
        users: []
    }

    setName = (e) => {
        this.setState({
            name: e
        });
    }

    setPassword = (e) => {
        this.setState({
            password: e
        });
    }


    fetchUser = async () => {
        await fetch("http://localhost:4000/user/signup", {
            headers: new Headers({
                'Authorization': 'Basic ' + "dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=",
                "Content-Type": "application/json",
            }),
        })
            .then(resp => resp.json())
            .then(respObj => this.setState({
                users: respObj
            }))
    }

 

    render() {
        return (
            <Container className="my-5">
            <Row>
              <Col md={3}></Col>
              <Col md={6} className="mt-5" >
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
                  style={{ width: "250px", marginLeft: "110px" }}
                ></img>
                <div className="mt-3 my-3 ml-3 mr-3">
                  
                  <Form
                    
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                       
                        onChange={(e) => setData({ username: e.target.value })}
                      />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                     
                        onChange={(e) => setData({ password: e.target.value })}
                      />
                    </Form.Group>
    
                    <div className={"d-flex justify-content-between"}>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Nav.Link as={Link} to={"/register"} className={"py-0"}>
                        <span>Sign Up</span>
                      </Nav.Link>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default Login;