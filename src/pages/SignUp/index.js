import React, { useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import InputForm from '~/components/InputForm';
import httpRequest, { endpoints } from '~/configs/httpRequest';
import LogoForm from '~/components/LogoForm';

const cx = classNames.bind(styles);

console.log(styles);

const SignUpPage = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const avatar = useRef();

    const signUp = (event) => {
        event.preventDefault();

        let signUpCustomer = async () => {
            const formData = new FormData();
            //Lấy dữ liệu
            formData.append('last_name', lastName);
            formData.append('first_name', firstName);
            formData.append('email', email);
            formData.append('avatar', avatar.current.files[0]);
            formData.append('username', username);
            formData.append('password', password);

            //Gọi Api
            let res = await httpRequest.post(endpoints.signUp, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', //Khi gửi lên server phải có tệp tin này gửi kèm
                },
            });
            console.info(res.data);
        };

        if (password != null && password === confirmPassword) {
            signUpCustomer();
        }
    };

    return (
        <div>
            <Container className={cx('container')}>
                <LogoForm to="/wedding-ui" />
                <Form onSubmit={signUp}>
                    <InputForm
                        id="lastName"
                        label="Họ"
                        type="text"
                        value={lastName}
                        change={(event) => setLastName(event.target.value)}
                    />
                    <InputForm
                        id="firstName"
                        label="Tên"
                        type="text"
                        value={firstName}
                        change={(event) => setFirstName(event.target.value)}
                    />
                    <InputForm
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        change={(event) => setEmail(event.target.value)}
                    />
                    <InputForm
                        id="username"
                        label="Tên đăng nhập"
                        type="text"
                        value={username}
                        change={(event) => setUsername(event.target.value)}
                    />
                    <InputForm
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        value={password}
                        change={(event) => setPassword(event.target.value)}
                    />
                    <InputForm
                        id="confirm"
                        label="Nhập lại mật khẩu"
                        type="password"
                        value={confirmPassword}
                        change={(event) => setConfirmPassword(event.target.value)}
                    />
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" ref={avatar} />
                    </Form.Group>
                    <Button className={cx('button')} type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default SignUpPage;
