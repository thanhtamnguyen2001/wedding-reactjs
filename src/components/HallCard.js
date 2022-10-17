import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import formatNumber from '../utils/formatNumber';

const HallCard = (props) => {
    let path = `/halls/${props.obj.id}`;
    return (
        <Card>
            <Link to={path} className="link-img">
                <Card.Img variant="top" src={props.obj.image} className="img-card" />
            </Link>
            <Card.Body>
                <Card.Title>{props.obj.name}</Card.Title>
                <Card.Text>Sức chứa: {formatNumber(props.obj.capacity, 0, ',', '.')}</Card.Text>
                <Card.Text>Giá sáng: {formatNumber(props.obj.morning_price, 0, ',', '.')}/vnđ</Card.Text>
                <Card.Text>Giá trưa: {formatNumber(props.obj.noon_price, 0, ',', '.')}/vnđ</Card.Text>
                <Card.Text>Giá tối: {formatNumber(props.obj.night_price, 0, ',', '.')}/vnđ</Card.Text>
            </Card.Body>
            <Card.Footer>
                <b className={props.obj.free ? 'text-success' : 'text-danger'}>
                    {props.obj.free ? 'Còn trống' : 'Đã có người đặt'}
                </b>
            </Card.Footer>
        </Card>
    );
};

export default HallCard;
