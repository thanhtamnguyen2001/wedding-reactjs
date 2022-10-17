import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TopTitleStyles.css';

const TopTitle = (props) => {
    return (
        <Card className="bg-dark text-white">
            <Card.Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPazeZVMGoT1IInHWkra4wd4E6I5CmOxcHtA&usqp=CAU"
                alt="Card image"
                className="topTitle-img"
            />
            <Card.ImgOverlay className="topTitle-overlay">
                <Card.Title className="topTitle-title">
                    <Link to="/wedding-ui">Trang chủ</Link>/{props.itemNav}
                </Card.Title>
                <Card.Text className="topTitle-text">
                    <img srcSet="icon-toptitle.png 12x" />
                    {props.itemNav}
                    <img srcSet="icon-toptitle.png 12x" />
                </Card.Text>
            </Card.ImgOverlay>
        </Card>
    );
};

export default TopTitle;
