import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {  updateTour,uploadImage,uploadImages } from '../store/tour-slice';
import { fetchPlaces } from '../store/place-slice';
import Select from 'react-select'


let file = '';
let files = [];

const TourModal = (props) => {

  const [tour,setTour]  = useState('');
  const tour_id = useSelector(state => state.tour.tour_id);
  const [place,setPlace] = useState('');

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPlaces())
    },[dispatch])


    useEffect(() => {
        console.log("tour id effect",tour_id)
        if(file && file != ''){
            dispatch(uploadImage(file,tour_id))
        }

        if(files && files != ''){
            console.log(files);
            dispatch(uploadImages(files,tour_id))
        }

    },[tour_id,dispatch])

    useEffect(() => {
   
     
      if(props.placeOptions){
        for (const p of props.placeOptions) {
            if(p.value == props.tour.place_id){
                setPlace(p);
            }
        }
      }
      let tourData = {...props.tour};

      tourData.metadata_title = props.tour.metadata?.title || '';
      tourData.metadata_description = props.tour.metadata?.description;
      setTour(tourData)
      
      

    }, [props])

    
    const handleChange = e => {
        const { name, value } = e.target;
        setTour(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      let tourData = {...tour};
      tourData.place_id = place.value;
      dispatch(updateTour(tourData));
      props.hideTourModal();

      if(tour.id){
        if(file && file != ''){
            dispatch(uploadImage(file,tour.id))
        }
        if(files && files != ''){
            console.log(files);
            dispatch(uploadImages(files,tour.id))
        }
        
      }
      
    }

    const onFileChange = (e) => {
      file = e.target.files[0];
    }

    const onFilesChange = (e) => {

        for (const file of e.target.files) {
           files.push(file); 
        }
    }

    const onChangePlace = (e) => {
        setPlace(e);
    }
  
  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hideTourModal}
        size="lg"
        >
        <Form 
            onSubmit={handleSubmit}
            >

        <Modal.Header closeButton>
          <Modal.Title>Tour heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { tour.cover_url &&
              <Form.Group className="mb-3 text-center">
                <img src={tour.cover_url} width={150}></img>
              </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control name="slug" value={tour?.slug || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Place</Form.Label>

                 
                <Select
                    {...props}
                    value = {place}
                    as="select"
                    options = {props.placeOptions}
                    onChange={(e) => {onChangePlace(e)}}
                    >
                    
                </Select>
               

                {/* <Form.Control type="text" name="code" value={tour.code || ''}  onChange={(e) => handleChange(e)}  required/> */}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={tour?.name || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
         
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={tour?.price || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" name="duration" value={tour?.duration || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>SKU</Form.Label>
                <Form.Control type="text" name="sku" value={tour?.sku || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Language <small className='text-secondary'>Example: English,Thai</small></Form.Label>
                <Form.Control type="text" name="languages" value={tour?.languages || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Itineary</Form.Label>
                <Form.Control as="textarea" rows={3}  name="itineary" value={tour?.itineary || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" rows={3}  name="description" value={tour.description || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control  as="textarea" rows={3}  name="content" value={tour.content || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Metadata</Form.Label>
                <Row>
                <Col>
                    <Form.Control placeholder="Title" name="metadata_title" value={tour?.metadata_title || ''}  onChange={(e) => handleChange(e)} required/>
                </Col>
                <Col>
                    <Form.Control placeholder="Description" name="metadata_description" value={tour?.metadata_description || ''}  onChange={(e) => handleChange(e)} required/>
                </Col>
            </Row>
            </Form.Group>
      
            <Form.Group className="mb-3">
                <Form.Label>Cover</Form.Label>
                {
                  tour.id ? (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)}/>
                  ) : (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)} required/>
                  )
                }
                
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Images</Form.Label>
                {
                  tour.id ? (
                    <Form.Control  type="file" name="file" onChange={(e) => onFilesChange(e)} multiple/>
                  ) : (
                    <Form.Control  type="file" name="file" onChange={(e) => onFilesChange(e)} multiple required/>
                  )
                }

            </Form.Group>

                <Form.Group className="mb-3 text-center">
                  
                    {
                        tour.images && tour?.images.map((image) => {
                          
                          return(<img src={image?.url} width={100} className='m-2'></img>)
                          
                        })
                    }
                </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.hideTourModal()}}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default TourModal;