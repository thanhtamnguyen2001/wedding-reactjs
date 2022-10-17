import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFoundPageStyles.css';

const NotFoundPage = () => {
    return (
        <div className="notfoundpage-container">
            <NavLink to="/wedding-ui" className={'logo'}>
                <img srcSet="/wedding-ui/logowedding.png 2x" alt="logo-wedding" />
            </NavLink>
            <h1 className="heading">Oops! Không tìm thấy trang</h1>
            <NavLink to="/wedding-ui" className={'back'}>
                Trở về trang chủ!
            </NavLink>
        </div>
    );
};

export default NotFoundPage;
