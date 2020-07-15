import React from "react";

import { Row, Container, Button } from 'react-bootstrap'

const Landing = () => {

    return (
        <>
            <Container>
                <Row style={{ "padding": "20%" }} className="justify-content-md-center">
                    <Button id="landingbtn" variant="primary" size="lg" href="/Orders">Go To Orders</Button>
                </Row>

            </Container>


        </>
    );

}
export default Landing;