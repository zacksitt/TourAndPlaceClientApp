import { useEffect, useState } from 'react';
import { Table,Modal,Button, Form,Row,Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateTour } from '../store/tour-slice';

function ItinearyModal(props) {

  const dispatch = useDispatch();
  const [itinearies,setItinearies] = useState([])
  const [itineary,setItineary] = useState({});

  useEffect(()=> {
    console.log(props);
    setItinearies(props.itinearies);
  },[props])

  const handleItinearyChange = e => {

    const { name, value } = e.target;
    setItineary(prevState => ({
        ...prevState,
        [name]: value
    }));

};
    
const addToItinery = () => {

    let iArr = [...itinearies];
    iArr.push(itineary)
    setItinearies(iArr);
    setItineary({})

}

const removeItem = (i,ii) => {
    let iArr = [...itinearies];
    iArr.splice(ii, 1);
    setItinearies(iArr)
}

const saveItineary = () => {

    let tourData = {id:props.tourId,itineary:itinearies}
    dispatch(updateTour(tourData));
    props.hideItinearyModal();
}

return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideItinearyModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Edit Itinary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        itinearies && itinearies?.map((i,index) => {
                            return (
                                <tr key={index}>
                                    <td>{i.title}</td>
                                    <td>{i.description}</td>
                                    <td><Button className='btn-danger btn-sm' onClick={() => {removeItem(i,index)}}> Remove</Button></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table> 
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control placeholder="Title" name="title" value={itineary?.title || ''}  onChange={(e) => handleItinearyChange(e)} required/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="Description" name="description" value={itineary?.description || ''}  onChange={(e) => handleItinearyChange(e)} required/>
                    </Col>
                    <Col>
                    <Button variant="primary" onClick={() => {addToItinery()}}>
                      Add
                    </Button>
                    </Col>
                </Row>
            </Form.Group>                
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={(e) => props.hideItinearyModal()}>
            Close
          </Button>
          <Button className="btn-success" onClick={(e) => saveItineary()}>
            Save
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItinearyModal;