import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form,Row,Col} from 'react-bootstrap'
import { placeAction } from '../store/place-slice';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlace,uploadImage,fetchPlaces} from '../store/place-slice';
let file = '';

function PlaceModal(props) {

  const [place,setPlace]  = useState('');
  const [is_published, setIsPublished] = useState(false);
  const [coverPreviewUrl,setCoverPreviewUlr] = useState('')
  const place_id = useSelector(state => state.place.place_id);
  const places = useSelector((state) => state.place.places)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchPlaces());
  },[dispatch])

  useEffect(() => {
        
    console.log("placeid change");
    console.log("place id",place_id);
    if(file && file != '')
      dispatch(uploadImage(file,place_id))

},[place_id,dispatch])

    useEffect(() => {
      let placeData = {...props.place};
      placeData.metadata_title = props.place.metadata?.title || '';
      placeData.metadata_description = props.place.metadata?.description;
      placeData.faqs_of_places_title = props.place.faqs_of_places?.title;
      placeData.faqs_of_places_description = props.place.faqs_of_places?.description;
      setPlace(placeData)
      setIsPublished(props.place ? props.place.is_published: false)

    }, [props])

    
    const handleChange = e => {
        const { name, value } = e.target;
        setPlace(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(place);
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      let placeData = {...place};
      placeData.is_published = is_published || 0;
      dispatch(updatePlace(placeData));
      props.hidePlaceModal();

      if(place.id && file != ''){
        dispatch(uploadImage(file,place.id))
      }
    }

    const onFileChange = (e) => {

      setCoverPreviewUlr(URL.createObjectURL(e.target.files[0]))
      file = e.target.files[0];
      console.log("file",file);
    }
  return (
    <>

      <Modal 
        show={props.show} 
        onHide={props.hidePlaceModal}
        size="lg"
        >
        <Form 
            onSubmit={handleSubmit}
            >

        <Modal.Header closeButton>
          <Modal.Title>Place Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { place.cover_url &&
              <Form.Group className="mb-3 text-center">
                <img src={place.cover_url} width={150}></img>
              </Form.Group>
            }

            <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control name="slug" value={place?.slug || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" name="code" value={place.code || ''}  onChange={(e) => handleChange(e)}  required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Parent</Form.Label>
                <Form.Control type="text" name="parent" value={place?.parent || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>GEO</Form.Label>
                <Form.Control type="text" name="geo" value={place.geo || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>View count</Form.Label>
                <Form.Control type="number" name="place_view" value={place?.place_view || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Type of place</Form.Label>
                <Form.Control type="text" name="type_of_place" value={place?.type_of_place || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name of place</Form.Label>
                <Form.Control type="text" name="name_of_place" value={place?.name_of_place || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" rows={3}  name="description" value={place.description || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control  as="textarea" rows={3}  name="content" value={place.content || ''}  onChange={(e) => handleChange(e)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Metadata</Form.Label>
                <Row>
                <Col>
                    <Form.Control placeholder="Title" name="metadata_title" value={place?.metadata_title || ''}  onChange={(e) => handleChange(e)} required/>
                </Col>
                <Col>
                    <Form.Control placeholder="Description" name="metadata_description" value={place?.metadata_description || ''}  onChange={(e) => handleChange(e)} required/>
                </Col>
            </Row>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Faqs of place</Form.Label>
                <Row>
                <Col>
                    <Form.Control placeholder="Title" name="faqs_of_places_title" value={place?.faqs_of_places_title || ''} onChange={(e) => handleChange(e)} required/>
                </Col>
                <Col>
                    <Form.Control placeholder="Description" name="faqs_of_places_description" value={place?.faqs_of_places_description || ''} onChange={(e) => handleChange(e)} required/>
                </Col>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                {
                  place.id ? (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)}/>
                  ) : (
                    <Form.Control  type="file" name="file" onChange={(e) => onFileChange(e)} required/>
                  )
                }
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Is published?" checked={is_published} onChange={() => setIsPublished((is_published) => !is_published)}/>
            </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
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

export default PlaceModal;