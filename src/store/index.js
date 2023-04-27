import { configureStore } from '@reduxjs/toolkit';

import placeSlice from './place-slice';
import tourSlice from './tour-slice';

const store = configureStore({
  reducer: { place: placeSlice.reducer ,tour:tourSlice.reducer},
});

export default store;
