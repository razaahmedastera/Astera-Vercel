import React, { useState } from 'react';
import { Modal, Button, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import HomeData from "../../data/HomeData.json"
import './index.css';

function VideoModal({showModal,closeModal}) {
  const [modalOpen, setModalOpen] = useState(showModal);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div>
      <Modal isOpen={showModal} toggle={toggleModal} centered={true} size="lg">
        <ModalBody>
          <div className="videoContainer">
            <iframe
              width="100%"
              height="315"
              src={HomeData[0]?.videoLink}
              frameBorder="0"
              allowFullScreen
              onLoad={handleIframeLoad}
            ></iframe>
            {!iframeLoaded && (
              <div className="videoLoader">
                <Spinner color="secondary" />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Skip
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default VideoModal;
