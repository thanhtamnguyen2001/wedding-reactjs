import { Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import httpRequest, { endpoints } from '../configs/httpRequest';

const Banner = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImageBanners = async () => {
            try {
                let res = await httpRequest.get(endpoints.banners);
                setImages(res.data);
            } catch (err) {
                console.info(err);
            }
        };
        loadImageBanners();
    }, []);

    return (
        <Carousel>
            {images.map((im, i) => {
                return (
                    <Carousel.Item key={i}>
                        <img className="d-block w-100 banner-img" src={im.image} alt={im.id} />
                        <Carousel.Caption>
                            <h3>{im.name}</h3>
                            <p>{im.content}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default Banner;
