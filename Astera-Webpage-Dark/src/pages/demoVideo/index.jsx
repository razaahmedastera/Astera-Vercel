import React, { useState, useEffect } from 'react';
import './index.css';
import { Container, Spinner } from 'reactstrap';
import Home_icon from '../../assets/icons/Home_icon.svg'
import { useLocation } from 'react-router-dom';
import interactiveDemo from '../../data/InteractiveDemo.json';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Back_icon from "../../assets/icons/Back_icon.svg"

function Index({ closeModal }) {
  const location = useLocation();
  const { demoData } = location.state || {};
  const [interactiveData, setInteractiveData] = useState(demoData);
  const [noData, setNodata] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const transformDefaultOption = (data) => ({
    value: data.id,
    label: data.title,
  });
  const [defaultValue, setDefaultValue] = useState(
    transformDefaultOption(interactiveData)
  )
  useEffect(() => {
    if (!interactiveData) {
      setNodata(true);
    } else {
      setNodata(false);
    }
  }, [interactiveData]);
  useEffect(() => {
    closeModal()
  }, [])

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleChange = (selectedOption) => {
    const value = interactiveDemo.find((option) => option.id == selectedOption.value);
    setDefaultValue(selectedOption)
    setInteractiveData(value);
    setIframeLoaded(false);
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isHovered ? '#43464C' : '#43464C',
      color: '#fff',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      '&:hover': {
        background: '#43464C',
        color: "#01358D"
      },
      '&:not(:first-child):not(:last-child)': {
        border: '1px solid #EFEFEF',
      },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: '7px',
      backgroundColor: "#FFF",
      boxShadow: "none",
      border: state.menuIsOpen ? '1px solid #C8E5FC' : 'none',
      border: 0,
      boxShadow: 'none',
      background: '#43464C',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 700,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };
  return (
    <Container className='mainContainer' fluid>
      <div className='demoVideoWrapper'>
        <div className='demoInnerWrapper w-100 mx-auto'>
        <div className='d-flex flex-md-row flex-column justify-content-between'>
          <Link to="/demo">
            <div className='topNav'>
              <img src={Back_icon} alt="home_icon" />
              <p className='page_title'>Back</p>
            </div>
          </Link>
          <div className='selectContainer'>
            <div>
              <Select
                value={defaultValue}
                onChange={handleChange}
                isSearchable={false}
                options={interactiveDemo.map((option) => ({
                  value: option.id,
                  label: option.title,
                }))}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
        <div className='iframeContainer'>
          {noData ? (
            <div className='d-flex justify-content-center'>
              <p>No Data Found</p>
            </div>
          ) : (

            <div className="iframeInnerWrapper">
              {!iframeLoaded && (
                <div className='loaderWrapper'>
                  <Spinner color="secondary">
                  </Spinner>
                </div>
              )}
              <iframe
                src={interactiveData?.link}
                frameBorder="0"
                loading="lazy"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen
                className='iframeVideo'
                title={interactiveData?.title}
                onLoad={handleIframeLoad}
              />
            </div>
          )}
        </div>
        <div className='infoLinkWrapper'>
          <p>For more information : <a href={interactiveData?.infoLink} target="_blank" rel="noopener noreferrer">{interactiveData?.infoLink}</a></p>
          <a></a>
        </div>
        </div>
      </div>
      <div className='footerImage'>
        <div className='dots'></div>
      </div>
    </Container>
  );
}

export default Index;
