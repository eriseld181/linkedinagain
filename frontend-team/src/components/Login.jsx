import React, { Component } from 'react';
import { Container, FormControl, Button, FormGroup, Image } from 'react-bootstrap'

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
        await fetch("https://striveschool.herokuapp.com/api/profile/", {
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

    componentDidMount = () => {
        localStorage.removeItem("authorizationKey")
        localStorage.removeItem("username")
        this.fetchUser()
        this.props.resetAuthorization()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let user = this.state.users.filter(user =>
            user.name.toLowerCase() === this.state.name.toLowerCase() && user._id === this.state.password
        )
        if (user.length > 0 && user[0].name.toLowerCase() === "segun") {
            this.props.getAuthorization("dXNlcjI0OjQ4RDR2YVZoNlJhM0REOHc=", "user24")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "klevin") {
            this.props.getAuthorization("dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=", "user16")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "nomfundo verah") {
            this.props.getAuthorization("dXNlcjIxOjJydXhhNE1SSmRVZ2c2Y3o=", "user21")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "oluwasijibomi hafeez") {
            this.props.getAuthorization("dXNlcjE0Oko4M3M4SnN2eWRSTk5qTHQ=", "user14")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        }
        else {
            alert("Plase user just watch out what you type!")
        }


    }

    render() {
        return (
            <Container className="my-5">
            <Row>
              <Col md={3}></Col>
              <Col md={6} className="mt-5" style={mystyle}>
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
                  style={{ width: "250px", marginLeft: "110px" }}
                ></img>
                <div className="mt-3 my-3 ml-3 mr-3">
                  {!success && (
                    <Alert variant={"danger"}>
                      Incorrect username or password!
                    </Alert>
                  )}
                  <Form
                    onSubmit={(e) => {
                      login(e);
                    }}
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={credentials.username}
                        onChange={(e) => setData({ username: e.target.value })}
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