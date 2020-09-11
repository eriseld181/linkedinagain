import React from "react";
import { Table, Form, Col, Row, Button, Container, Tab, Tabs, FormGroup, FormControl, Image, Alert } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom'

import Login from "./Login"

class Register extends React.Component {
  state = {
    showUser: false,
    show: false,
    person: {
      name: '',
      surname: '',
      email: '',
      password: '',
      username: '',
    }
  }

  componentDidUpdate = () => {
    if (
      this.state.show === false &&
      this.state.person.name.length > 2 &&
      this.state.person.surname.length > 3 &&
      this.state.person.email.includes("@") &&
      this.state.person.password.length >= 8 &&
      this.state.person.username === this.state.person.username
    ) {
      this.setState({
        show: !this.state.show
      });
    }
  }

  fetchRegisterUser = async () => {
    //dont forget to send in .env
    const fetchRegister = await fetch("http://localhost:4001/profiles/register", {
      method: "POST",
      body: JSON.stringify(this.state.person),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })


    if (fetchRegister) alert("Register has been done")
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      showUser: !this.state.showUser
    });
  }

  updatePerson = (event) => {
    let person = this.state.person
    person[event.currentTarget.id] = event.currentTarget.value

    this.setState({
      person
    });
  }
  render() {
    return (
      <div >

        <Tabs className="justify-content-center" defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="register" variant="pills" title="Register">
            {/* this is Register */}
            <Container className="d-flex justfify-content-center" style={{ height: "90vh", width: "60vh", marginTop: "100px" }}>
              <Row className="d-flex justfify-content-center" style={{ border: "1px solid black", height: "500px", backgroundColor: "white" }}>
                <Image className="mb-1 mt-3 justfify-content-center" src="https://cdn.worldvectorlogo.com/logos/linkedin.svg" />
                <h2 className="justfify-content-center mt-1 mb-2 ml-5 mt-3">Register, it's free!</h2>
                <Col md={6} className="offset-3">

                  <Form >

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>First name</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={this.state.person.name}
                            onChange={this.updatePerson}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Last name</Form.Label>
                          <Form.Control
                            type="text"
                            id="surname"
                            placeholder="Surname"
                            value={this.state.person.surname}
                            onChange={this.updatePerson}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.person.email}
                            onChange={this.updatePerson}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.person.password}
                            onChange={this.updatePerson}
                            required
                          />
                        </Form.Group>
                      </Col>
                      {this.state.show ||
                        <Button type="submit" style={{ width: "240px", height: "40px" }} onClick={this.props.history.push("/feed")}>
                          {console.log(this.state.person)}
                          <Link to="/feed" >
                            <p style={{ color: "white" }}>Join now</p>
                          </Link>
                        </Button>
                      }
                    </Row>
                  </Form>
                  {this.state.showUser ?
                    <>
                      <Row className="d-flex justfify-content-center mt-3">
                        <Col>
                          <h5>The user has joined</h5>

                        </Col>
                      </Row>
                    </>
                    :
                    <Row className="d-flex justfify-content-center">
                      <Col className="text-center" >

                      </Col>
                    </Row>
                  }
                </Col>


              </Row>
            </Container>
          </Tab>
          <Tab eventKey="profile" title="Log In">
            <Container id="logingPage" className="d-flex justify-content-center ">

              <div className="Login">
                <Image className="mb-3" src="https://cdn.worldvectorlogo.com/logos/linkedin.svg" />
                <form onSubmit={this.fetchRegisterUser}>
                  <FormGroup controlId="name" bsSize="large">
                    <label>Email</label>
                    <FormControl
                      autoFocus
                      type="name"
                      value={this.state.name}
                      onChange={e => this.setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup controlId="password" bsSize="large">
                    <label>Password</label>
                    <FormControl
                      value={this.state.password}
                      onChange={e => this.setPassword(e.target.value)}
                      type="password"
                    />
                  </FormGroup>
                  <Button block bsSize="large" type="submit">
                    Login
            </Button>
                </form>
              </div>
            </Container>
          </Tab>
        </Tabs>

      </div >
    );
  }
}

export default Register;
