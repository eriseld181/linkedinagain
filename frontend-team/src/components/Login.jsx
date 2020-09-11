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


    fetchRegisterUser = async () => {
        //dont forget to send in .env
        await fetch("http://localhost:4001/profiles/login", {
            method: "POST",
            body: JSON.stringify(this.state.user),
            credentials: 'include',
            headers: new Headers({

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


    render() {
        return (
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
        );
    }
}

export default Login;