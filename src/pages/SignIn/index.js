import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import cookies from 'react-cookies';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '~/ActionCreators/UserCreators';
import InputForm from '~/components/InputForm';
import LogoForm from '~/components/LogoForm';
import httpRequest, { endpoints } from '~/configs/httpRequest';

const SignInPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = async (event) => {
        event.preventDefault(); //Tắt xử lý mặc định trước
        try {
            let info = await httpRequest.get(endpoints.oauth2Info);
            let res = await httpRequest.post(endpoints.signIn, {
                client_id: info.data.client_id,
                client_secret: info.data.client_secret,
                username: username,
                password: password,
                grant_type: 'password',
            });
            cookies.save('access_token', res.data.access_token);

            let customer = await httpRequest.get(endpoints.currentCustomer, {
                headers: {
                    Authorization: `Bearer ${cookies.load('access_token')}`,
                },
            });

            cookies.save('customer', customer.data);

            dispatch(signInUser(customer.data));
            navigate('/wedding-ui');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Container>
            <LogoForm to="/wedding-ui" />
            <Form onSubmit={signIn}>
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
                <Button className="button" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </Container>
    );
};

export default SignInPage;
