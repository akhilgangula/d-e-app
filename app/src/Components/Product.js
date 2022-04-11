import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const Product = ({ name = "Domain Name", domain = "domain.com", price = 100000, address = "0x606633be8f09c38bcA3D3dE6BE65412248107308" }) => {
    return (
        <Container fluid>
            <Row className="justify-content-md-center align-self-center">
                <Product />
            </Row>
        </Container>
    )
}

export const ProductCard = ({ name = "Domain Name", domain = "domain.com", price = 100000, address = "0x606633be8f09c38bcA3D3dE6BE65412248107308" }) => {
    return (<Col xs lg="2">
        <Card style={{ width: '30rem' }}>
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
        </Card>
    </Col>)
}

export default Product;