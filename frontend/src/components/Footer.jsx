import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-light py-2'>
            <Container>
                <Row>
                    <Col className='text-center py-3 text-primary'>
                       ProShop &copy; {currentYear}
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer