import React from "react";
import {Form, Button} from "react-bootstrap";
const AddProduct = () => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Domain</Form.Label>
                <Form.Control type="text" placeholder="Enter domain" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Price (in Wei)" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add Product
            </Button>
        </Form>
    )
}

export default AddProduct;