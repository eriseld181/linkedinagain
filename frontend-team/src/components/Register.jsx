import React from "react";
import { Table, Form, Col, Row, Button, Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom'
import Navbar from "./NavBar"


class Register extends React.Component {
    state = {
        showUser: false,
        show: false,
        person: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    componentDidUpdate = () => {
        if (
            this.state.show === false &&
            this.state.person.name.length > 2 &&
            this.state.person.surname.length > 3 &&
            this.state.person.email.includes("@") &&
            this.state.person.password.length >= 8 &&
            this.state.person.confirmPassword === this.state.person.password
        ) {
            this.setState({
                show: !this.state.show
            });
        }
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
            <div>
                <Container style={{ height: "90vh", width: "60vh", marginTop: "100px" }}>
                    <Row className="d-flex justfify-content-center mt-5" style={{ border: "1px solid black", height: "500px", backgroundColor: "white" }}>
                        <Col md={6} className="offset-3">
                            <h3 className="text-center mt-3">Get started, it's free!</h3>
                            <Form onSubmit={this.handleSubmit}>
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

                                </Row>

                                {this.state.show ||
                                    <Button  type="submit" style={{width: "240px", height: "40px"}}>
                                         <Link to="/feed" >
                                                <p style={{color: "white"}}>Join now</p>
                                         </Link>
                                    </Button>
                                }
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
            </div >
        );
    }
}

export default Register;
