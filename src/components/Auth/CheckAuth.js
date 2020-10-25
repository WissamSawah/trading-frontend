import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class checkAuth extends Component {
    constructor() {
        super();
        this.state = {
            userData: JSON.parse(localStorage.getItem("user")),
            redirect: false
        };
    }

    componentDidMount() {
        if (this.state.userData) {
            // Check if the stored token still is valid.
            // Remove the token and redirect to '/login' if it's not valid.
            axios.get(`https://trading-backend.wissamsawah.me/auth/check`,
                { headers: { "x-access-token": `${this.state.userData.token}` } })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data.message)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    localStorage.removeItem("user");
                    this.setState({
                        redirect: true
                    });
                });
        } else {
            localStorage.removeItem("user");
            this.setState({
                redirect: true
            });
        }
    }

    render() {
        // If token not valid or token not found, redirect to '/login'
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />);
        } return null;
    }
}
export default checkAuth;
