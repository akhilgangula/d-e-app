import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const BuyerDetail = ({ onCreateBuyer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    return (
        <Form>


            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={() => onCreateBuyer({ name, email })}>
                Create Buyer
            </Button>
        </Form>
    )
}

export default BuyerDetail;