import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import InputForm from '~/components/InputForm';
import LogoForm from '~/components/LogoForm';
import httpRequest, { endpoints } from '~/configs/httpRequest';

const OrderPage = () => {
    const customer = useSelector((state) => state.user.user);
    const [groomName, setGroomName] = useState();
    const [brideName, setBrideName] = useState();
    const [dateOrgan, setDateOrgan] = useState();
    const [numberTables, setNumberTables] = useState();
    const [menus, setMenus] = useState([]);
    const [choosedMenu, setChoosedMenu] = useState(1);
    const [services, setServices] = useState([]);
    const [choosedService, setChoosedService] = useState(1);
    const [halls, setHalls] = useState([]);
    const [choosedHall, setChoosedHall] = useState(1);
    const [sessons, setSessons] = useState([1, 2, 3]);
    const [choosedSesson, setChoosedSesson] = useState(1);

    useEffect(() => {
        const loadMenus = async () => {
            try {
                let res = await httpRequest.get(endpoints['menus']);
                setMenus(res.data.results);
            } catch (err) {
                console.error(err);
            }
        };
        const loadComboServices = async () => {
            let res = await httpRequest.get(endpoints.comboService);
            setServices(res.data.results);
        };
        const loadHalls = async () => {
            try {
                let res = await httpRequest.get(endpoints['halls']);
                setHalls(res.data.results);
            } catch (err) {
                console.error(err);
            }
        };
        loadMenus();
        loadComboServices();
        loadHalls();
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        let tempService = services.map((service) =>
            service.name === name ? { ...service, isChecked: checked } : service,
        );
        setServices(tempService);
    };

    const book = (event) => {
        event.preventDefault();

        let bookWedding = async () => {
            const formData = new FormData();
            //Lấy dữ liệu
            formData.append('groom_name', groomName);
            formData.append('bride_name', brideName);
            formData.append('date', dateOrgan);
            formData.append('number_of_table', numberTables);
            formData.append('combo_services', choosedService);
            formData.append('menu', choosedMenu);
            formData.append('hall', choosedHall);
            formData.append('shift', choosedSesson);
            formData.append('customer', Number(customer.id));

            //Gọi Api
            let res = await httpRequest.post(endpoints['orders'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', //Khi gửi lên server phải có tệp tin này gửi kèm
                },
            });
            console.info(res.data);
        };
        bookWedding();
    };
    return (
        <div>
            <Container className="container-signup">
                <LogoForm to="/wedding-ui" />
                <Form onSubmit={book}>
                    <Row xs={1} md={2} className="g-4">
                        <Col>
                            <InputForm
                                id="groomName"
                                label="Họ tên cô dâu"
                                type="text"
                                value={groomName}
                                change={(event) => setGroomName(event.target.value)}
                            />
                            <InputForm
                                id="brideName"
                                label="Họ tên chú rể"
                                type="text"
                                value={brideName}
                                change={(event) => setBrideName(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="dateOrgan">
                            <Form.Label>Ngày tổ chức</Form.Label>
                            <Form.Control
                                type="text"
                                value={dateOrgan}
                                onChange={(event) => setDateOrgan(event.target.value)}
                            />
                        </Form.Group>
                        <InputForm
                            id="numberTable"
                            label="Số bàn"
                            type="number"
                            value={numberTables}
                            change={(event) => setNumberTables(event.target.value)}
                        />
                    </Col>
                    {/* <Col>
                            <Form.Group className="mb-3" controlId="customer">
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control type="text" value={customer.id} disabled />
                            </Form.Group>
                        </Col> */}
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="menu-select">Chọn thực đơn:</Form.Label>
                            <select
                                id="menu-select"
                                name="menu-select"
                                onChange={(event) => setChoosedMenu(event.target.value)}
                            >
                                {menus.map((menu, index) => {
                                    return (
                                        <>
                                            <option key={index} value={menu.id}>
                                                {menu.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="menu-select">Chọn sảnh:</Form.Label>
                            <select
                                id="menu-select"
                                name="menu-select"
                                onChange={(event) => setChoosedHall(event.target.value)}
                            >
                                {halls.map((hall, idx) => {
                                    return (
                                        <>
                                            <option key={idx} value={hall.id}>
                                                {hall.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="menu-select">Chọn thực đơn:</Form.Label>
                            <select
                                id="service-select"
                                name="service-select"
                                onChange={(event) => setChoosedService(event.target.value)}
                            >
                                {services.map((service, idx) => {
                                    return (
                                        <>
                                            <option key={idx} value={service.id}>
                                                {service.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="menu-select">Chọn buổi:</Form.Label>
                            <select
                                id="sesson-select"
                                name="sesson-select"
                                onChange={(event) => setChoosedSesson(event.target.value)}
                            >
                                {sessons.map((sesson, idx) => {
                                    return (
                                        <>
                                            <option key={idx} value={idx}>
                                                {idx === 0 ? 'Sáng' : idx === 1 ? 'Trưa' : 'Tối'}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </Form.Group>
                    </Col>
                    <Button className="button" type="submit">
                        Đặt tiệc
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default OrderPage;
