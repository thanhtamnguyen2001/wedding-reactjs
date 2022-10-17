import React, { useEffect, useState } from 'react';
import { ButtonGroup, CardGroup, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import HallCard from '~/components/HallCard';
import httpRequest, { endpoints } from '~/configs/httpRequest';

const HallPage = () => {
    const [listHall, setListHall] = useState([]);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const loadListHall = async () => {
            let query = location.search;
            if (query === '') {
                query = `?page=${page}`;
            } else {
                query += `&page=${page}`;
            }
            try {
                let res = await httpRequest.get(`${endpoints.halls}${query}`);
                setListHall(res.data.results);

                setNext(res.data.next !== null);
                setPrev(res.data.previous !== null);
            } catch (err) {
                console.error(err);
            }
        };
        loadListHall();
    }, [location.search, page]);

    const paging = (inc) => {
        setPage(page + inc);
    };
    return (
        <div>
            <div>
                <Container>
                    <h1 className="text-center">Danh sách sảnh cưới</h1>
                    <CardGroup>
                        {listHall.map((h, i) => {
                            return <HallCard key={i} obj={h}></HallCard>;
                        })}
                    </CardGroup>
                    <ButtonGroup>
                        <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>
                            &lt;&lt;
                        </Button>
                        <Button variant="info" onClick={() => paging(1)} disabled={!next}>
                            &gt;&gt;
                        </Button>
                    </ButtonGroup>
                </Container>
            </div>
        </div>
    );
};

export default HallPage;
