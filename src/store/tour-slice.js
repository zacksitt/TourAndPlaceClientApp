import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tours: [],
    placeOptions:[],
    tour_id:0,
  },
  reducers: {
    setPlaceOptions(state,action){
      state.placeOptions = action.payload;
    },
    setTours(state,action){
        state.tours = action.payload.tours;
    },
    addPlace(state,action){
      state.tours.push(action.payload.tour);
      
    },
    setTourId(state,action){
      state.tour_id = action.payload;
    }
  }
})

export const fetchTours = () => {
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/tours");
            return response.data;
        }
        let tours = await fetch();
        dispatch(tourAction.setTours(tours))
    }
}

export const deleteTour = (id) => {
  return async (dispatch) => {
    const deleteData = async () => {
        let response = await axios.delete(API_URL + "/tour",{data:{id}});
        return response.data;
    }
    await deleteData();
    dispatch(fetchTours());
  }
}
export const fetchPlaceOptions = () => {
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/places");
            return response.data.places;
        }
        let places = await fetch();
        let placeOptions = [];

        for (const place of places) {
          placeOptions.push(
            {
              label:place.slug,
              value:place.id
            }
          )
        }
        dispatch(tourAction.setPlaceOptions(placeOptions))

      }
}

export const uploadImage  = (file,tour_id) => {

  return async (dispatch) => {
    const update = async () => {
        const formData = new FormData();
        formData.append( 
            "file", 
            file, 
            file.name 
        );
        formData.append("tour_id",tour_id);
        let response = await axios.post(API_URL + '/upload-tour-cover',formData)
        return response.data;
        
    }
    let response = await update();
    dispatch(fetchTours());
  }
}

export const uploadImages  = (files,tour_id) => {

  return async (dispatch) => {
    const update = async () => {
        const formData = new FormData();
        let index = 0;
        for (const file of files) {
          index++;
          formData.append( 
            "file_" + index, 
            file, 
            file.name 
          );
          
        }

        formData.append("tour_id",tour_id);
        formData.append("count",index);
        let response = await axios.post(API_URL + '/upload-tour-covers',formData)
        return response.data;
        
    }
    let response = await update();
    dispatch(fetchTours());
  }
}

export const updateTour = (tour) => {

  return async (dispatch) => {
      const update = async () => {
          let response;
          if(tour.id)
            response = await axios.put(API_URL + "/tour",tour);
          else
            response = await axios.post(API_URL + "/tour",tour);
          
          return response.data;
      }
      let response = await update();
      dispatch(fetchTours())
      if(!tour.id){
        dispatch(tourAction.setTourId(response.tour.id))
      }
  }
}
export const tourAction = tourSlice.actions;

export default tourSlice;