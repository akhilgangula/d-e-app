import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { ProductCard } from "./Product";

const Market = ({ products = [] }) => {
    return (<Container fluid>
        <Row xs={1} md={3} className="g-4">
            {/* {products.map(product => <ProductCard />)} */}
        </Row>

    </Container>);
}

export default Market;