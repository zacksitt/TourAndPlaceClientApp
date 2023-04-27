import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { deletePlace, fetchPlaces } from "../store/place-slice";
import { Table } from "react-bootstrap"
import PlaceModal from '../components/PlaceModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import AlertWarningModal from "../components/AlertWarningModal";

const Place = () => {
    const dispatch = useDispatch();
    const places   = useSelector( (state) => state.place.places)
    const [showModal,setModalData] = useState(false);
    const [place,setPlace] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)

    useEffect(() => {
        dispatch(fetchPlaces())
        setColumns([
            {
                name: 'Cover',
                selector: row => <img width="75px" alt={row.name} src={row.cover_url} className="p-2"/>,
            },
            {
                name: 'Slug',
                selector: row => row.slug,
            },
            {
                name: 'Code',
                selector: row => row.code,
            },
            {
                name: 'Parent',
                selector: row => row.parent,
            },
            {
                name: 'Geo',
                selector: row => row.geo,
            },
            {
                name: 'View',
                selector: row => row.place_view,
            },
            {
                name: 'Is published?',
                selector: row => <div>{row.is_published ? (<AiFillCheckCircle></AiFillCheckCircle>): ('')}</div>,
            },{
                name:'',
                selector: row => <div> <a className="btn btn-primary mx-auto ml-2" onClick={ () => showPlaceModal(row)}>Edit</a> 
                                        <a className="btn btn-danger" onClick={() => showWarningAlert(row)}>Delete</a>
                                 </div>
            }
        ])
    },[dispatch]);

    const showPlaceModal = (place) => {
        setModalData(true)
        setPlace(place)
    }

    const hidePlaceModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (place) => {
        setShowAlert(true);
        setPlace(place);
    }

    const hideWarningAlert = () => {
        setShowAlert(false);
    }
    const confirmDelete = (placeid) => {
        dispatch(deletePlace(placeid))
        setShowAlert(false);
    }

    return (
        <div className="container">
          <h2 className="text-primary">
            Places
            <a className="m-2 btn btn-success" onClick={ () => showPlaceModal({})}>Add new</a>
          </h2>
          <DataTable
             defaultSortFieldId={2}
            pagination
            columns={columns}
            data={places}
          />
      
          <PlaceModal show={showModal} hidePlaceModal={hidePlaceModal} place={place}></PlaceModal>
          <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} confirmDelete={confirmDelete} data={place}></AlertWarningModal>

        </div>
      );
};
  
export default Place;