import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, email, password }) => {
    let valid = true;

    // Validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // Validate the form was filled out
    if (email === null) {
        valid = false;
    }

    if (password === null) {
        valid = false;
    }

    return valid;
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: null,
            password: null,
            result: "",
            redirect: false,
            formErrors: {
                email: "",
                password: "",
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        if (formValid(this.state)) {
            axios.post('https://trading-backend.wissamsawah.me/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        this.props.setIsLoggedIn(true)
                        this.setState({
                            redirect: true
                        })
                    }
                })
                .catch(error => alert(error))
        } else {
            for (var prop in this.state.formErrors) {
                if (this.state.formErrors[prop]) {
                    console.error(this.state.formErrors[prop]);
                }
            }
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'Invalid email adress';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'Minimum 6 characters required' : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    };

    render() {
        const { formErrors } = this.state;
        //If logged in redirect to '/reports'
        if (localStorage.getItem("user") || this.state.redirect) {
            return (<Redirect to={'/trading'} />)
        }

        return (
            <Container className="login">
                <Row>
                    <Col md></Col>
                    <Col md={6}>
                        <div className="wrapper">
                            <div className="form-wrapper">
                                <h1>Log in</h1>
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className={formErrors.email.length > 0 ? "error form-control" : this.state.email ? "correct form-control" : "form-control"}
                                            placeholder="Email"
                                            name="email"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.email.length > 0 && (
                                            <span className="errorMessage">{formErrors.email}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className={formErrors.password.length > 0 ? "error form-control" : this.state.password ? "correct form-control" : "form-control"}
                                            placeholder="Password"
                                            name="password"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </div>
                                    <div className="login">
                                        <button type="submit" className="btn btn-primary" disabled={!formValid(this.state)}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col md></Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
