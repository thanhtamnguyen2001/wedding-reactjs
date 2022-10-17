import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const FoodCard = (props) => {
    return (
        <Col md={4} xs={12}>
            <Card>
                <Card.Img variant="top" src={props.obj.image} />
                <Card.Body>
                    <Card.Title>{props.obj.name}</Card.Title>
                    <Card.Text>{props.obj.price}</Card.Text>
                    <Button variant="primary">Xem chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default FoodCard;
