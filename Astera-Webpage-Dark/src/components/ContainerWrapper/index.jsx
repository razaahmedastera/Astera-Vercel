import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './index.css'

const ContainerWrapper = ({ children }) => {
    return (
        <Container className='mainContainer' fluid>
            <div className='mainWrapper'>
                {children}
            </div>
            <div className='footerImage'>
                <div className='dots'></div>
            </div>
        </Container>
    )
}

export default ContainerWrapper