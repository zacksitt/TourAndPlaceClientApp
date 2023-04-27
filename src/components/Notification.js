
import {Alert} from 'react-bootstrap';
function AlertWarningModal(props) {

  return (
    <>

        <Alert key={props.variant} variant={props.variant} dismissible>
            {props.message}
        </Alert>
    </>
  );
}

export default AlertWarningModal;