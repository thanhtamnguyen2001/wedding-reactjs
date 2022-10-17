import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

const ButtonShowContent = (props) => {
    const [show, setShow] = useBootstrapBreakpoints(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Xem nội dung
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.obj.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>{props.obj.content}</Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default ButtonShowContent;
