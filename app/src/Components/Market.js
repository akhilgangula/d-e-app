import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { ProductCard } from "./Product";

const Market = ({ products = [], isBuyer, selectedProduct }) => {
   
    return (<Container fluid>
        <Row xs={1} md={3} className="g-10">
            {products.map(product => <ProductCard
                name={product.name}
                domain={product.domain}
                address={product.address}
                price={product.price}
                cardClick={() => { selectedProduct(product) }}
                buy={isBuyer}
                active={product.isActive}
                />)}
        </Row>

    </Container>);
}

export default Market;