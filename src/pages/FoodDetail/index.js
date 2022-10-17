// import React, { useEffect, useState } from 'react';
// import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
// import { useLocation, useParams } from 'react-router-dom';
// import httpRequest, { endpoints } from '../configs/httpRequest';
// import { formatNumber } from './ServicePage';

// const FoodDetailPage = () => {
//     const [foods, setFoods] = useState();
//     const { foodId } = useParams();
//     const location = useLocation();

//     useEffect(() => {
//         const loadFoodsInMenu = async () => {
//             try {
//                 let res = await httpRequest.get(`${endpoints['menus']}${location.search}`);
//                 setFoods(res.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         loadFoodsInMenu();
//     }, [location.search]);

//     return (
//         <>
//             <h1 className="text-center">Chi tiết sảnh cưới</h1>
//             <Container>
//                 <Row>
//                     <Col md={4} xs={12}>
//                         <Image src={hall.image} rounded fluid />
//                     </Col>
//                     <Col md={8} xs={12}>
//                         <h2>{hall.name}</h2>
//                         <p>Sức chứa: {formatNumber(hall.capacity, 0, ',', '.')}/người</p>
//                         <p>Giá sáng: {formatNumber(hall.morning_price, 0, ',', '.')}/vnđ</p>
//                         <p>Giá trưa: {formatNumber(hall.noon_price, 0, ',', '.')}/vnđ</p>
//                         <p>Giá tối: {formatNumber(hall.night_price, 0, ',', '.')}/vnđ</p>
//                         <p>
//                             Tình trạng:{' '}
//                             <b className={hall.free ? 'text-success' : 'text-danger'}>
//                                 {hall.free ? 'Còn trống' : 'Đã có người đặt'}
//                             </b>
//                         </p>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// };

// export default HallDetailPage;
