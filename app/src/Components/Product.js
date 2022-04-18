import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export const Product = ({ name = "Domain Name", domain = "domain.com", price = 100000, address = "0x606633be8f09c38bcA3D3dE6BE65412248107308" }) => {
    return (
        <Container fluid>
            <Row className="justify-content-md-center align-self-center">
                <ProductCard name={name} domain={domain} price={price} address={address} />
            </Row>
        </Container>
    )
}

export const ProductCard = ({ name = "Domain Name", domain = "domain.com", price = 100000, address = "0x606633be8f09c38bcA3D3dE6BE65412248107308", cardClick = () => {}, buy, active }) => {
    return (<Col xs >
        <Card>
            <Card.Header>{name}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {`${domain} at ${price} in wei`}
                    </p>
                    <footer className="blockquote-footer">
                        {`${address}`}
                    </footer>
                </blockquote>
            </Card.Body>
            {buy && <Button variant="primary" onClick={cardClick} disabled={!active}>Buy</Button>}
        </Card>
    </Col>)
}