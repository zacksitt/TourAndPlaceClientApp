import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertWarningModal(props) {

  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideWarningAlert}
        >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure to delete this item?        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => props.hideWarningAlert()}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={(e) => props.confirmDelete(props.data.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertWarningModal;