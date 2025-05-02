import React from 'react';
import './index.css';
import { Container, Row, Col } from 'reactstrap';
import InteractiveDemo from '../../data/InteractiveDemo.json';
import Democard from '../../components/DemoCard'
import ContainerWrapper from '../../components/ContainerWrapper';
import VideoModal from '../../components/Modal';
import { Link } from 'react-router-dom';
import Back_icon from "../../assets/icons/Back_icon.svg"

function index({showModal,closeModal}) {
  return (
    <ContainerWrapper>
      <div className='textWrapper'>
        <h1 className='boldText'>The Interactive Product Tour Experience</h1>
        <p className='demoDescription'>Get hands-on with interactive product demonstrations, and understand the value <br/> that Astera can bring to your organization, all at your own pace.</p>
      </div>
      <Container>
        <Row className='gy-4 pt-5 '>
        <Link to="/">
            <div className='backBtn'>
              <img src={Back_icon} alt="home_icon" />
              <p className='page_title'>Back</p>
            </div>
          </Link>
          {InteractiveDemo.map((data, index) => (
            <Col key={index} lg="4" md="6" sm="6" xs="12" className="d-flex justify-content-center">
              <Democard demoData={data} />
            </Col>
          ))}
        </Row>
        <VideoModal 
        showModal={showModal}
        closeModal={closeModal}
        />
      </Container>
    </ContainerWrapper>

  );
}

export default index;
