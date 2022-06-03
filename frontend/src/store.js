import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newDoctorReducer,
  newReviewReducer,
  doctorDetailsReducer,
  doctorReducer,
  doctorReviewsReducer,
  doctorsReducer,
  reviewReducer,
} from "./reducers/doctorReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allAppointmentsReducer,
  myAppointmentsReducer,
  newAppointmentReducer,
  appointmentDetailsReducer,
  appointmentReducer,
} from "./reducers/appointmentReducer";

const reducer = combineReducers({
  doctors: doctorsReducer,
  doctorDetails: doctorDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newAppointment: newAppointmentReducer,
  myAppointments: myAppointmentsReducer,
  appointmentDetails: appointmentDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newDoctorReducer,
  doctor: doctorReducer,
  allAppointments: allAppointmentsReducer,
  appointment: appointmentReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  doctorReviews: doctorReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
