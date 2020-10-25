import React from 'react';
import { Jumbotron, Container, Row, Col, CardGroup, CardDeck, Card, Button } from 'react-bootstrap'



const Home = () => {

    return (
        <Container className="start">
            <h1 className="h1-start">Welcome to StockTrading!</h1>
                <Card>
                    <div ClassName="intro">
      <Card.Body>We wanted to build a company we ourselves wanted to be customers in. Therefore, we make sure to always charge as little as possible of our customers, and at the same time offer cheaper, better and simpler products. We are revolutionizing the banking industry and working to ensure that millions of people have a better future.</Card.Body>
    </div></Card>
            <Row>
                <CardDeck>
                  <Card>
                    <Card.Img height="231px" variant="top" src="holder.jpg" />
                    <Card.Body>
                      <a href="/trading">
                      <Card.Title href="/trading">Trading Market</Card.Title>
                      </a>
                      <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Img height="231px" variant="top" src="register.jpg" />
                    <Card.Body>
                    <a href="/register">
                      <Card.Title href="/register">Register</Card.Title>
                      </a>
                      <Card.Text>
                        This card has supporting text below as a natural lead-in to additional
                        content.{' '}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Img height="231px" variant="top" src="log.png" />
                    <Card.Body>
                        <a href="/login">

                      <Card.Title href="/login">Login</Card.Title>
                      </a>
                      <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This card has even longer content than the first to
                        show that equal height action.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </CardDeck>

            </Row>

        </Container>

    );
};

export default Home;
