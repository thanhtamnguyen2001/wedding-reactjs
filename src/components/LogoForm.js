import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './LogoFormStyles.css';

const LogoForm = (props) => {
    return (
        <Fragment>
            <NavLink to={props.to}>
                <img srcSet="/wedding-ui/logowedding.png 10x" alt="logo-wedding" className="logo" />
            </NavLink>
        </Fragment>
    );
};

export default LogoForm;
