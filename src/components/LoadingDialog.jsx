import React from 'react';
import { Modal, Row, Spinner } from 'react-bootstrap';

const LoadingDialog = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status">
        </Spinner>
       
      </Modal.Body> 
      <Row className='align-items-center'>
        <span className="sr-only">กำลังทำรายการ</span>
      </Row>
      <br />
    </Modal>
  );
};

export default LoadingDialog;
