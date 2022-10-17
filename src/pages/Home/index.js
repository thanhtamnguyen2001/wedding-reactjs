import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Image, Row, Button, ButtonGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cookies from 'react-cookies';
import httpRequest, { endpoints } from '~/configs/httpRequest';

function Home() {
    const customer = useSelector((state) => state.user.user);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [changed, setChanged] = useState(0);

    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadComments = async () => {
            let query = `?page=${page}`;
            try {
                let res = await httpRequest.get(`${endpoints['comments']}${query}`);
                setComments(res.data.results);

                setNext(res.data.next !== null);
                setPrev(res.data.previous !== null);
            } catch (err) {
                console.error(err);
            }
        };
        loadComments();
    }, [changed, page]);

    const paging = (inc) => {
        setPage(page + inc);
    };

    const addComment = async (event) => {
        event.preventDefault();
        try {
            let res = await httpRequest.post(
                endpoints.addComment,
                {
                    content: commentContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.load('access_token')}`,
                    },
                },
            );

            console.info(res.data);
            comments.push(res.data);
            setComments(comments);
            setChanged(comments.length);
        } catch (err) {
            console.error(err);
        }
    };

    let comment = (
        <em>
            <Link to="/wedding-ui/sign-in">Đăng nhập</Link> để bình luận!
        </em>
    );

    if (customer !== null && customer !== undefined && customer.is_customer === true) {
        comment = (
            <Form onSubmit={addComment}>
                <Form.Group className="mb-3" controlId="commentContent">
                    <Form.Control
                        as="textarea"
                        placeholder="Nhập nội dung bình luận..."
                        value={commentContent}
                        onChange={(event) => setCommentContent(event.target.value)}
                        rows={3}
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="info"
                    style={{ marginBottom: '10px' }}
                    onClick={() => window.location.reload()}
                >
                    Thêm bình luận
                </Button>
            </Form>
        );
    }

    return (
        <Container>
            <Container
                className="text-center"
                style={{
                    margin: '40px auto',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '18px',
                    fontStyle: 'italic',
                    color: '#888',
                }}
            >
                <h1>GIỚI THIỆU CHUNG</h1>
                <p>
                    Trung tâm Tổ chức Tiệc cưới được thành lập từ năm 2012 cung cấp cho khách hàng 05 dịch vụ chính, bao
                    gồm: Dịch vụ trang trí, Dịch vụ Hội Nghị - Hội Thảo, Dịch vụ Tiệc Outside Catering, Dịch vụ Tiệc
                    sinh nhật và Dịch vụ Wedding Planner.
                </p>
                <p>
                    Sở hữu 12 cơ sở tọa lạc tại các vị trí đắc địa trong thành phố Hà Nội và các tỉnh lân cận, đánh dấu
                    thương hiệu với phong cách Trẻ Trung - Thanh Lịch - Hiện Đại, Trống Đồng Palace tự hào là điểm đến
                    uy tín bậc nhất trong lĩnh vực tổ chức sự kiện và tiệc cưới.
                </p>
                <p>
                    Chúng tôi luôn lấy khách hàng làm trung tâm và không ngừng nỗ lực để mang đến sự hài lòng cho khách
                    hàng bằng sự chuyên nghiệp, hiệu quả và tận tâm. Được góp phần vào sự thành công trong sự kiện của
                    bạn chính là niềm hạnh phúc và vinh dự của chúng tôi!
                </p>
                <small>Nơi giấc mơ thành hiện thực!</small>
            </Container>
            <Container>{comment}</Container>
            <hr />
            <Container style={{ backgroundColor: 'hsla(204, 49%, 56%, 0.695)' }}>
                {comments.map((c, idx) => {
                    return (
                        <Row key={idx}>
                            <Col md={1} sm={4}>
                                <Image src={c.customer.user.avatar} roundedCircle fluid />
                            </Col>
                            <Col md={3} sm={4}>
                                <p>
                                    {c.customer.user.first_name} {c.customer.user.last_name}
                                </p>
                            </Col>
                            <Col md={8} xs={8}>
                                <p>{c.content}</p>
                                <p>
                                    Ngày bình luận: {c.created_date.slice(0, 10)}
                                    {', lúc: '}
                                    {c.created_date.slice(12, 19)}
                                </p>
                                <p>
                                    Cách đây: <Moment fromNow>{c.created_date}</Moment>
                                </p>
                            </Col>
                        </Row>
                    );
                })}
                <ButtonGroup>
                    <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>
                        &lt;&lt;
                    </Button>
                    <Button variant="info" onClick={() => paging(1)} disabled={!next}>
                        &gt;&gt;
                    </Button>
                </ButtonGroup>
            </Container>
        </Container>
    );
}

export default Home;
