import React, { useEffect } from 'react';
import './index.css';
import { Container, Row, Col } from 'reactstrap';
import CustomCard from '../../components/HeroCard';
import HeroData from '../../data/HomeData.json';
import ContainerWrapper from '../../components/ContainerWrapper';


function Index({openModal}) {
  useEffect(() => {
    if (HeroData[0] && HeroData[0].video === 'on') {
      openModal();
    }
  }, []);
  return (
    <ContainerWrapper>
      <div className='textWrapper'>
        <h1>Welcome to <span className='boldText'>Astera Data Stack</span></h1>
        <p className='heroDesc'>Seamless Integration, Limitless Possibilities</p>
      </div>
      <Container>
        <Row className='gy-4 pt-3 justify-content-center'>
          {HeroData.map((card, index) => (
            <Col key={index} md="4" sm="6" xs="12" className="d-flex justify-content-center">
              <CustomCard card={card} />
            </Col>
          ))}
        </Row>
      </Container>
    </ContainerWrapper>

  );
}

export default Index;
