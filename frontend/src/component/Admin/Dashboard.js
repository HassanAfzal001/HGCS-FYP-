import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminDoctor } from "../../actions/doctorAction";
import { getAllAppointments } from "../../actions/appointmentAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { doctors } = useSelector((state) => state.doctors);

  const { appointments } = useSelector((state) => state.allAppointments);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  doctors &&
    doctors.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminDoctor());
    dispatch(getAllAppointments());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  appointments &&
    appointments.forEach((item) => {
      totalAmount += item.totalFee;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, doctors.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs  {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/doctors">
              <p>Doctor</p>
              <p>{doctors && doctors.length}</p>
            </Link>
            <Link to="/admin/appointments">
              <p>Appointments</p>
              <p>{appointments && appointments.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
