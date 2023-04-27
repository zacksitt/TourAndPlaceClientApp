import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL } from '../config';
import { tourAction } from './tour-slice';

const placeSlice = createSlice({
  name: 'place',
  initialState: {
    places: [],
    place_id:0,
  },
  reducers: {
    
    setPlaces(state,action){
        state.places = action.payload.places;
    },
    addPlace(state,action){
      state.places.push(action.payload.place);
      
    },
    setPlaceId(state,action){
      state.place_id = action.payload;
    }
  }
})

export const fetchPlaces = () => {
    return async (dispatch) => {
        const fetch = async () => {
            let response = await axios.get(API_URL + "/places");
            return response.data;
        }
        let places = await fetch();
        
        dispatch(placeAction.setPlaces(places))
    }
}

export const deletePlace = (id) => {
  return async (dispatch) => {
    const deleteData = async () => {
        let response = await axios.delete(API_URL + "/place",{data:{id}});
        return response.data;
    }
    await deleteData();
    dispatch(fetchPlaces());
    
    dispatch(tourAction.setNotification({
      "message":"Deleted tour successfully.",
      "variant":"danger"
    }))

  }
}

export const uploadImage  = (file,place_id) => {

  return async (dispatch) => {
    const update = async () => {
        const formData = new FormData();
        formData.append( 
            "file", 
            file, 
            file.name 
        );
        formData.append("place_id",place_id);
        let response = await axios.post(API_URL + '/upload-place-cover',formData)
        return response.data;
        
    }
    let response = await update();
    dispatch(placeAction.setPlaces(response))
  }
}
export const updatePlace = (place) => {

  return async (dispatch) => {
      const update = async () => {
          let response;
          if(place.id)
            response = await axios.put(API_URL + "/place",place);
          else
            response = await axios.post(API_URL + "/place",place);
          
          return response.data;
      }
      let response = await update();
      if(place.id){
        dispatch(placeAction.setPlaces(response))
        dispatch(tourAction.setNotification({
          "message":"Updated tour successfully.",
          "variant":"primary"
        }))
      }
        
      else{
        dispatch(placeAction.addPlace(response));
        dispatch(placeAction.setPlaceId(response.place.id))
        dispatch(tourAction.setNotification({
          "message":"Created new tour successfully.",
          "variant":"primary"
        }))
      } 
        

  }
}
export const placeAction = placeSlice.actions;

export default placeSlice;