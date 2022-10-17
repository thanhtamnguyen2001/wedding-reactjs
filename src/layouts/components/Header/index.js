import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Form, FormControl, Nav, Navbar, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'react-cookies';
import classNames from 'classnames/bind';

import { signOutUser } from '~/ActionCreators/UserCreators';
import { baseURL } from '~/reducers/RootReducer';
import styles from './Header.module.scss';

const navLinks = [
    { url: '/wedding-ui', title: 'Trang chủ' },
    { url: '/wedding-ui/menus', title: 'Thực đơn' },
    { url: '/wedding-ui/halls', title: 'Sảnh cưới' },
    { url: '/wedding-ui/services', title: 'Dịch vụ' },
];

const cx = classNames.bind(styles);

function Header() {
    const [isActive, setIsActive] = useState(false);
    const customer = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [q, setQ] = useState('');
    const navigate = useNavigate();
    const [urlPresent, setUrlPresent] = useState('wedding/');

    const search = (event) => {
        event.preventDefault(); //Chặn xử lý mặc định để nó không nạp lại trang
        navigate(`${urlPresent}?q=${q}`);
    };

    const signOut = (event) => {
        event.preventDefault();
        cookies.remove('access_token');
        cookies.remove('customer');
        dispatch(signOutUser());
    };

    let path = (
        <>
            <Link className="nav-link text-danger" to="/wedding-ui/sign-in">
                Đăng nhập
            </Link>
            <Link className="nav-link text-danger" to="/wedding-ui/sign-up">
                Đăng ký
            </Link>
        </>
    );

    if (customer !== null && customer !== undefined && customer.is_customer === true) {
        path = (
            <>
                <Link className="nav-link text-danger" to="/wedding-ui/">
                    <Image
                        src={`${baseURL}${customer.avatar}`}
                        roundedCircle
                        alt="Ảnh đại diện"
                        className={cx('avatar')}
                    />
                    {customer.username}
                </Link>
                <Link className="nav-link text-danger" onClick={signOut} to="/wedding-ui/">
                    Đăng xuất
                </Link>
            </>
        );
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/wedding-ui">
                            <img srcSet="/wedding-ui/logowedding.png 30x" alt="logo-wedding" />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={cx('menu') + ' me-auto '}>
                            {navLinks.map((item) => (
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) => (isActive ? 'text-primary' : '')}
                                    onClick={function () {
                                        setIsActive(!isActive);
                                        setUrlPresent(`${item.url}`);
                                    }}
                                    key={item.title}
                                >
                                    {item.title}
                                </NavLink>
                            ))}
                            {path}
                        </Nav>
                        <Form className="d-flex" onSubmit={search}>
                            <FormControl
                                type="search"
                                placeholder="Bạn cần tìm gì?"
                                className="me-2"
                                aria-label="Search"
                                value={q}
                                onChange={(event) => setQ(event.target.value)}
                            />
                            <Button type="submit" variant="outline-warning">
                                Tìm
                            </Button>
                        </Form>
                        <Link to={'/wedding-ui/orders'}>
                            <Button
                                variant="warning"
                                style={{
                                    margin: 'auto 10px',
                                    backgroundColor: 'rgb(214, 169, 100)',
                                }}
                            >
                                Đặt tiệc
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
