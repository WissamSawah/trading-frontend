import React  from 'react';
import useForm from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios';
import { Card, ListGroup, Table} from 'react-bootstrap'


import '../styles/form.css';

const Objects = ({ appleValue, samsungValue, nasdaqValue, setBalance, setDepot, setTradeAlert }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { register, handleSubmit, errors } = useForm();
    const sellUrl = 'https://trading-backend.wissamsawah.me/objects/sell'
    const buyUrl = 'https://trading-backend.wissamsawah.me/objects/buy'

    const onSubmit = (data, e) => {
        let url = ''
        if (data.buyorsell === "Buy") {
            url = buyUrl;
            data.buyAmount = data.amount;
        }
        if (data.buyorsell === "Sell") {
            url = sellUrl;
            data.sellAmount = data.amount;
        }
        if (data.allStocks === "Apple") {
            data.objectId = 1;
            data.price = appleValue;
        }
        if (data.allStocks === "Samsung") {
            data.objectId = 2;
            data.price = samsungValue;
        }
        if (data.allStocks === "Nasdaq") {
            data.objectId = 3;
            data.price = nasdaqValue;
        }

        e.target.reset();
        console.log(data)
        axios.post(url, data,
        { headers: {"x-access-token" : `${userData.token}`} })
        .then(res => {
            setTradeAlert(res.data.message);
            axios.get('https://trading-backend.wissamsawah.me/depots/view',
                    { headers: {"x-access-token" : `${userData.token}`} })
                    .then(res => {
                        setBalance(res.data.balance)
                        setDepot(res.data)
                    })
                })
    };



    return (
        <Container>
            <div className="list-group list-group-flush">

            <Card className="list-group-item">
            <Card.Header><b className="navbar-brand">Buy or Sell Stocks</b></Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Choose to buy or sell</Form.Label>
                    <Form.Control name='buyorsell' as="select" ref={register({required: true})}>
                        <option>Buy</option>
                        <option>Sell</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group name="allStocks">
                    <Form.Label>Choose from the stocks</Form.Label>
                    <Form.Control name="allStocks" as="select" ref={register({required: true})}>
                        <option value="Apple">Apple {appleValue} kr</option>
                        <option value="Samsung">Samsung {samsungValue} kr</option>
                        <option value="Nasdaq">Nasdaq {nasdaqValue} kr</option>


                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        name="amount"
                        type="number"
                        placeholder="Stocks to buy or sell"
                        ref={register({ required: true, pattern: /^[1-9]\d*$/ })}
                        />
                        {errors.amount && errors.amount.type === "pattern" && (<p className="errorMessage">That's not a valid number.</p>)}
                </Form.Group>
                <Button className="sub" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card>
    </div>
        </Container>
    );
}
export default Objects;
