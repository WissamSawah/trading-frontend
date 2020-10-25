import React  from 'react';
import useForm from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import '../styles/form.css';

const Balance = ({ balance, setBalance }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data, e) => {
        e.target.reset();
        data.balance = parseInt(data.balance) + parseInt(balance)
        axios.put('https://trading-backend.wissamsawah.me/depots', data,
        { headers: {"x-access-token" : `${userData.token}`} })
        .then(res => setBalance(data.balance))
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={10}>
                <Form.Group>
                <Form.Control
                    name="balance"
                    placeholder="Value to transfer"
                    ref={register({ required: true, pattern: /^[1-9]\d*$/ })}
                    />
                    {errors.balance && errors.balance.type === "pattern" && (<p className="errorMessage">That's not a valid number.</p>)}
                </Form.Group>
                </Col>
                <Form.Group>
                <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
                </Form.Group>
            </Row>
        </Form>
    );
}
export default Balance;
