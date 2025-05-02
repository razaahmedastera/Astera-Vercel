import React from 'react';
import { Button } from 'reactstrap';
import './index.css'
import { useNavigate } from 'react-router-dom';

const OutlineButton = ({data}) => {
  const {link} = data;
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (link.startsWith('/')) {
      navigate(link);
    } else {
      window.open(link, '_blank');
    }
  };
  return (
    <Button
      className='outlineBtn' onClick={handleButtonClick}>
      Explore Now
    </Button>
  );
};

export default OutlineButton;
