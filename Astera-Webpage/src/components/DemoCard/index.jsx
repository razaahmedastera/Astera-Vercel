import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './index.css'
import Play_Btn from '../../assets/icons/Play_Btn.svg';
import { useNavigate } from 'react-router-dom';

const Index = ({ demoData }) => {
    const { title, image, description } = demoData;
    const iconPath = require(`../../assets/icons/${image}`);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/video`, { state: { demoData } });
    };
    return (
        <Card className='demoCardWrapper'
        > <div className='imageContainer'>
                <img
                    alt="cardplaceholder"
                    src={iconPath}
                    className='demoImage'
                />
                <img className='hoverButton' src={Play_Btn} alt="SVG" onClick={handleClick} />
            </div>

            <CardBody className='demoCardBody'>
                <CardTitle tag="h2">
                    {title}
                </CardTitle>
                <CardText className='demoCardDesc'>
                    {description}
                </CardText>
            </CardBody>
        </Card>
    )
}

export default Index