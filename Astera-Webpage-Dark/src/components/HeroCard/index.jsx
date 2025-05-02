import React from 'react';
import { Card,CardTitle,CardText } from 'reactstrap';
import OutlineButton from '../OutlineButton';
import './index.css';

const CustomCard = ({ card }) => {
  const { title, icon, description } = card;
  const iconPath = require(`../../assets/icons/${icon}`);
  return (
    <Card className='cardBody' body>
       <div className='iconWrapper'>
     <img src={iconPath} alt="Icon" className='icon' />
    </div>
    <CardTitle tag="h2">
    {title}
    </CardTitle>
    <CardText className='description'>
     {description}
    </CardText>
    <OutlineButton data={card}/>
  </Card>
  );
};

export default CustomCard;
