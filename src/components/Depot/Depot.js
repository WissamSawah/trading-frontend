import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card, ListGroup, Table} from 'react-bootstrap'

import Balance from '../Balance/Balance'

const Deposit = ({balance, setBalance, depot, setDepot}) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (userData) {
            axios.get(`https://trading-backend.wissamsawah.me/auth/check`,
                { headers: { "x-access-token": `${userData.token}` } })
                .then(res => {
                    // If the token is valid
                    if (res.status === 200) {
                        axios.get('https://trading-backend.wissamsawah.me/depots/view',
                        { headers: {"x-access-token" : `${userData.token}`} })
                        .then(res => {
                            setBalance(res.data.balance)
                            setDepot(res.data)})
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    localStorage.removeItem("user");
                    setRedirect(true);
                });
        } else {
            localStorage.removeItem("user");
            setRedirect(true);
        }
    // eslint-disable-next-line
    }, []);

    function checkForObjects() {
        if (depot.objects) {
            if (depot.objects.length === 0) {
                return <p className="text-muted">No objects here!</p>
            } else {
                let tableData = depot.objects.map(function(obj, i) {
                    return <tr key={i}><td>{obj.name}</td><td>{obj.amount}</td></tr>
                })
                return <Table bordered size="sm"><tbody>{tableData}</tbody></Table>
            }
        }
    }
    if(redirect) {
        return (<Redirect to={'/login'} />);
    }
    return (
        <div>
            <Card className="cardDepot">
                <Card.Header><b className="navbar-brand">Deposit</b></Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><b className="navbar-brand">User:</b>{depot.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p><b className="navbar-brand">Balance:</b> <b className="balnr">{balance} kr</b></p>
                        <Balance balance={balance} setBalance={setBalance} />
                    </ListGroup.Item>
                    <ListGroup.Item><p><b className="navbar-brand">Available Stocks:</b> </p>{checkForObjects()}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default Deposit;
