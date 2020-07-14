import React from "react";
import Form from 'react-bootstrap/Form'
import { Row, Col, Container } from 'react-bootstrap'

const Search = () => {

    return (
        <>

            <Form>
                <Form.Group as={Row} controlId="formHorizontal">
                    <Form.Label column sm={2}>
                        Search
                     </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Search keyword: Box" />
                    </Col>
                </Form.Group>
            </Form>

        </>
    );

}
export default Search;