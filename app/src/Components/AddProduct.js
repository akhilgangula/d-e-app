import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const AddProduct = ({ onAdd }) => {
    const add = () => {
        onAdd({ domain, name, price, desc });
    }
    const [domain, setDomain] = useState('google.com');
    const [name, setName] = useState('hello');
    const [price, setPrice] = useState(1000000000);
    const [desc, setDesc] = useState('description');
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Domain</Form.Label>
                <Form.Control type="text" placeholder="Enter domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Price (in Wei)" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={add}>
                Add Product
            </Button>
        </Form>
    )
}

export default AddProduct;