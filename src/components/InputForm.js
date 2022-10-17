import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = (props) => {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} value={props.value} onChange={props.change} />
        </Form.Group>
    );
};

export default InputForm;
