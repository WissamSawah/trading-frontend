import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // Validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // Validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
        val === false && (valid = false);
    });

    return valid;
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            lastName: null,
            email: null,
            password: null,
            gdpr: false,
            formErrors: {
                name: "",
                lastName: "",
                email: "",
                password: "",
                gdpr: ""
            },
            page: {
                redirect: false
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            axios.post('https://trading-backend.wissamsawah.me/auth/register', {
                name: this.state.name,
                lastname: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    if (res.statusText === "Created") {
                        this.setState({
                            redirect: true
                        })
                    }
                })
                .catch(error => alert('Error:', error))
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'name':
                formErrors.name = value.length < 2 ? 'Minimum 2 characters required' : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length < 2 ? 'Minimum 2 characters required' : "";
                break;
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

    handleCheckBoxClick = e => {
        let formErrors = this.state.formErrors;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        formErrors.gdpr = value === false ? 'Need to be checked' : "";
        this.setState({
            [name]: value
        }, () => console.log(this.state));
    }

    render() {
        const { formErrors } = this.state;
        // If registered were successfull redirect to '/login'
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <Container>
                <Row>
                    <Col md></Col>
                    <Col md={6}>
                        <div className="Wrapper">
                            <h1>Create Account</h1>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="name">First Name</label>
                                    <input
                                        type="text"
                                        className={formErrors.name.length > 0 ? "error form-control" : this.state.name ? "correct form-control" : "form-control"}
                                        placeholder="First Name"
                                        name="name"
                                        noValidate
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.name.length > 0 && (
                                        <span className="errorMessage">{formErrors.name}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className={formErrors.lastName.length > 0 ? "error form-control" : this.state.lastName ? "correct form-control" : "form-control"}
                                        placeholder="Last Name"
                                        name="lastName"
                                        noValidate
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.lastName.length > 0 && (
                                        <span className="errorMessage">{formErrors.lastName}</span>
                                    )}
                                </div>
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
                                <div className="checkbox">
                                    <label><input
                                        type="checkbox"
                                        name="gdpr"
                                        onChange={this.handleCheckBoxClick}
                                        checked={this.state.gdpr}
                                    />   By checking this you agree that your personal data will be stored in our database.
                </label>
                                </div>
                                <div className="createAccount">
                                    <button type="submit" className="btn btn-primary" disabled={!formValid(this.state)}>Create Account</button>
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col md></Col>
                </Row>
            </Container>
        );
    }
}

export default Register;
