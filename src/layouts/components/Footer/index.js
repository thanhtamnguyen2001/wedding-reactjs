import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer2')}>
            <div className={cx('oliven-narrow-content')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-12 text-center')}>
                        <h2>
                            <NavLink to="/wedding-ui">
                                <img srcSet="/wedding-ui/logowedding.png 30x" alt="logo-wedding" />
                            </NavLink>
                        </h2>
                        <p className={cx('copyright')}>April 27, 2022 – Việt Nam, Thành phố Hồ Chí Minh</p>
                        <br />
                        <div align="center" className={cx('socialbtns')}>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.facebook.com/tamc8"
                                        target="_blank"
                                        className="fa fa-lg fa-facebook"
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
