import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import DoctorCard from "./DoctorCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getDoctor } from "../../actions/doctorAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// const doctor = {
//   name: "Phsychatrist",
//   image: [{ url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fflat-online-doctor-internet-computer-health-vector-19747730&psig=AOvVaw1vuyOB7EkNulBoXqKopryx&ust=1652703733365000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCICMvqm_4fcCFQAAAAAdAAAAABAD"}],
//   Fees: "Free",
//   _id: "Hassan_Afzal"
// }; 

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getDoctor());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="HGCS" />

          <div className="banner">
            <p >Welcome to Health Guide Consulting System</p>
            <h1>FIND AMAZING SERVICES Here</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Doctors</h2>

          <div className="container" id="container">
            {/* <DoctorCard doctor={doctor} /> */}
            {doctors &&
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))} 
              
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
