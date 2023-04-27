import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { deleteTour, fetchTours } from "../store/tour-slice";
import { Table } from "react-bootstrap"
import TourModal from '../components/TourModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import AlertWarningModal from "../components/AlertWarningModal";
import { fetchPlaces } from "../store/place-slice";
import ItinearyModal from "../components/ItinearyModal";
import Notification from '../components/Notification'

const Tour = () => {

    const dispatch = useDispatch();
    const tours   = useSelector( (state) => state.tour.tours)
    const [showModal,setModalData] = useState(false);
    const [tour,setTour] = useState({});
    const [columns,setColumns] = useState();
    const [showAlert,setShowAlert] = useState(false)
    const places = useSelector((state) => state.place.places)
    const [placeOptions,setPlaceOptions] = useState();
    const [isShowedItinearyModal,setIsShowItinearyModal] = useState(false);
    const notification = useSelector((state) => state.tour.notification)

    useEffect(() => {
        setPlaceOptions(getPlaceOptions(places))
    },[places])

    useEffect(() => {
        dispatch(fetchTours())
        dispatch(fetchPlaces())

        setColumns([
            {
                name: 'Cover',
                width:'15%',
                selector: row => <img width="75px" alt={row.name} src={row.cover_url} className="p-2"/>,
            },
            {
                name: 'Slug',
                width:'15%',
                selector: row => row.slug,
            },
            {
              name: 'Name',
              width:'15%',
              selector: row => row.name,
            },
            {
                name: 'Place',
                width:'15%',
                selector: row => row.place,
            },
            {
                name: 'Price',
                width:'10%',
                selector: row => row.price,
            },
            ,{
                name:'',
                width:'30%',
                selector: row => <div> <a className="btn btn-primary m-1" onClick={ () => showTourModal(row)}>Edit</a> 
                                        <a className="btn btn-danger m-1" onClick={() => showWarningAlert(row)}>Delete</a>
                                        <a className="btn btn-warning m-1" onClick={() => showItinearyModal(row)}>Edit Itineary</a>
                                 </div>
            }
        ])
    },[dispatch]);

    const getPlaceOptions = (places) => {

        let placeOptions = [];
        for (const place of places) {
            placeOptions.push(
              {
                label:place.slug,
                value:place.id

              }
            )
        }
        return placeOptions;
    }

    const showTourModal = (tour) => {
        setModalData(true)
        setTour(tour)
    }

    const hideTourModal = () => {
        setModalData(false);
    }

    const showWarningAlert = (tour) => {
        setShowAlert(true);
        setTour(tour);
    }

    const hideWarningAlert = () => {
        setShowAlert(false);
    }
    const confirmDelete = (tourid) => {
        dispatch(deleteTour(tourid))
        setShowAlert(false);
    }
    const showItinearyModal = (row) => {
        setTour(row);
        setIsShowItinearyModal(true);
    }
    const hideItinearyModal = () => {
        setIsShowItinearyModal(false);
    }

    return (
        <div className="container">

          { notification.message && 
            <Notification
                message={notification.message}
                variant={notification.variant}
            >
            </Notification>}
          <h2 className="text-primary">
            Tours
            <a className="m-2 btn btn-success" onClick={ () => showTourModal({})}>Add new</a>
          </h2>
          <DataTable
             defaultSortFieldId={2}
            pagination
            columns={columns}
            data={tours}    
          />
          
          <TourModal show={showModal} hideTourModal={hideTourModal} tour={tour} placeOptions={placeOptions}></TourModal>
          <AlertWarningModal show={showAlert} hideWarningAlert={hideWarningAlert} confirmDelete={confirmDelete} data={tour}></AlertWarningModal>
          <ItinearyModal show={isShowedItinearyModal} hideItinearyModal={hideItinearyModal} itinearies={tour.itineary} tourId={tour.id}></ItinearyModal>

        </div>
      );
};
  
export default Tour;