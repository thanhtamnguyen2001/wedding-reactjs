import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import httpRequest, { endpoints } from '~/configs/httpRequest';
import formatNumber from '~/utils/formatNumber';

const ServicePage = () => {
    const [services, setServices] = useState([]);

    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadServices = async () => {
            let query = location.search;
            if (query === '') {
                query = `?page=${page}`;
            } else {
                query += `&page=${page}`;
            }
            let res = await httpRequest.get(`${endpoints['services']}${query}`);
            setServices(res.data.results);

            setNext(res.data.next !== null);
            setPrev(res.data.previous !== null);
        };
        loadServices();
    }, [location.search, page]);

    const paging = (inc) => {
        setPage(page + inc);
    };

    return (
        <Container className="">
            <Row xs={1} md={2} className="g-4">
                {services.map((service, idx) => (
                    <Col key={idx}>
                        <Card className="container-card">
                            <Card.Img variant="top" src={service.image} className="img-350" />
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text className="show-content-4">{service.content}</Card.Text>
                                <>
                                    <Button variant="primary" onClick={handleShow}>
                                        Xem nội dung
                                    </Button>

                                    <Offcanvas show={show} onHide={handleClose}>
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>{service.name}</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>{service.content}</Offcanvas.Body>
                                    </Offcanvas>
                                </>
                            </Card.Body>
                            <Card.Footer>Giá dịch vụ: {formatNumber(service.price, 0, ',', '.')}/vnđ</Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ButtonGroup>
                <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>
                    &lt;&lt;
                </Button>
                <Button variant="info" onClick={() => paging(1)} disabled={!next}>
                    &gt;&gt;
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default ServicePage;
