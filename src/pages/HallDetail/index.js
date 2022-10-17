import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import httpRequest, { endpoints } from '~/configs/httpRequest';
import formatNumber from '~/utils/formatNumber';

import cookies from 'react-cookies';

function HallDetailPage() {
    const customer = useSelector((state) => state.user.user);
    const { hallId } = useParams();
    const [hall, setHall] = useState();
    const [rate, setRate] = useState();

    useEffect(() => {
        const loadHall = async () => {
            try {
                let res = await httpRequest.get(endpoints['hall-detail'](hallId));
                setHall(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadHall();
    }, []);

    const saveRating = async (r) => {
        if (window.confirm('Bạn muốn đánh giá bài học này?') == true) {
            try {
                let res = await httpRequest.post(
                    endpoints['rating'](hallId),
                    {
                        rate: r,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${cookies.load('access_token')}`,
                        },
                    },
                );
                console.info(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (!hall) {
        return (
            <div
                style={{
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    height: '500px',
                }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    let r = '';

    if (customer !== null && customer !== undefined && customer.is_customer === true) {
        r = <Rating initialRating={rate} onClick={saveRating} />;
    }

    return (
        <>
            <h1 className="text-center">Chi tiết sảnh cưới</h1>
            <Container>
                <Row>
                    <Col md={4} xs={12}>
                        <Image src={hall.image} rounded fluid />
                    </Col>
                    <Col md={8} xs={12}>
                        <h2>{hall.name}</h2>
                        <p>Sức chứa: {formatNumber(hall.capacity, 0, ',', '.')}/người</p>
                        <p>Giá sáng: {formatNumber(hall.morning_price, 0, ',', '.')}/vnđ</p>
                        <p>Giá trưa: {formatNumber(hall.noon_price, 0, ',', '.')}/vnđ</p>
                        <p>Giá tối: {formatNumber(hall.night_price, 0, ',', '.')}/vnđ</p>
                        <p>
                            Tình trạng:{' '}
                            <b className={hall.free ? 'text-success' : 'text-danger'}>
                                {hall.free ? 'Còn trống' : 'Đã có người đặt'}
                            </b>
                        </p>
                        <p>{r}</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HallDetailPage;
