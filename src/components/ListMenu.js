import { ButtonGroup, Card, CardGroup, Container, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import httpRequest, { endpoints } from '../configs/httpRequest';
import { Link, useLocation } from 'react-router-dom';
import formatNumber from '../utils/formatNumber';

const ListMenu = () => {
    const [menus, setMenus] = useState([]);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const loadMenus = async () => {
            let query = location.search;
            if (query === '') {
                query = `?page=${page}`;
            } else {
                query += `&page=${page}`;
            }
            try {
                let res = await httpRequest.get(`${endpoints.menus}${query}`);
                setMenus(res.data.results);

                setNext(res.data.next !== null);
                setPrev(res.data.previous !== null);
            } catch (err) {
                console.error(err);
            }
        };
        loadMenus();
    }, [location.search, page]);

    const paging = (inc) => {
        setPage(page + inc);
    };

    // useEffect(() => {
    //   const loadFoodsInMenu = async () => {
    //     try {
    //       let res = await httpRequest.get(`${endpoints["menus"]}${location.search}`);
    //       setFoods(res.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    //   loadFoodsInMenu();
    // }, [location.search]);

    return (
        <Container>
            <CardGroup>
                {menus.map((menu, idx) => {
                    return (
                        <Card className="container-card" key={idx}>
                            <Card.Img variant="top" src={menu.image} className="img-350"></Card.Img>
                            <Card.Header className="text-center">{menu.name}</Card.Header>
                            <Card.Body>
                                {menu.foods.map((food, i) => {
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            <span>
                                                <Card.Title>{food.name}</Card.Title>
                                                <small>{food.category.name}</small>
                                            </span>
                                            <Card.Text>{formatNumber(food.price, 0, ',', '.')}/vnđ</Card.Text>
                                        </div>
                                    );
                                })}
                            </Card.Body>
                            <Card.Footer
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <strong className="text-success">Tổng tiền:</strong>
                                <strong>{formatNumber(menu.price, 0, ',', '.')}/vnđ</strong>
                            </Card.Footer>
                        </Card>
                    );
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
            {/* <CardGroup>
        {menus.map((menu, idx) => {
          return (
            <Card key={idx} className="container-card">
              <Card.Img
                variant="top"
                src={menu.image}
                style={{ height: "250px" }}
              />
              <Card.Header className="text-center">{menu.name}</Card.Header>
              <Card.Body>
                {menu.foods.map((food, i) => {
                  return (
                    <Link
                      to={"/wedding-ui"}
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <Card.Title>{food.name}</Card.Title>
                      <Card.Text>{food.price}</Card.Text>
                    </Link>
                  );
                })}
              </Card.Body>
              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong className="text-success">Tổng tiền:</strong>
                <strong>{menu.price}</strong>
              </Card.Footer>
            </Card>
          );
        })}
      </CardGroup>
      <ButtonGroup>
        <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>
          &lt;&lt;
        </Button>
        <Button variant="info" onClick={() => paging(1)} disabled={!next}>
          &gt;&gt;
        </Button>
      </ButtonGroup> */}
        </Container>
        // {foods.map((menu) =>
        //   menu.foods.map((food, i) => {
        //     return <FoodCard key={i} obj={food} />;
        //   })
        // )}
    );
};

export default ListMenu;
