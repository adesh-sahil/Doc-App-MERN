import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctors,doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div
        className="card m-3 p-3"
        style={{ cursor: "pointer", width: "18rem" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <img src={doctor.image || "/No-avatar.png"} alt="Doctor" className="card-img-top"
          style={{ width: '50%', height: 'auto', objectFit: 'cover' }}/>
          <h5 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h5>
          
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
          <p>
            <b>Address</b> {doctor.address}
          </p>
      </div> */}
     <div className="container mt-5 mb-5 p-4">
  <h2 className="font-weight-bold text-center">Popular Doctors</h2>
  <div className="row">
    {doctors && doctors.map((doctor) => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100">
          <img src={doctor.image || "No-avatar.png"} className="card-img-top" alt="Doctor" style={{ height: "300px", objectFit: "cover" }} />
          <div className="card-body d-flex flex-column ">
            <span className="badge bg-primary mb-2 d-inline-block align-self-start">{doctor.specialization}</span>
            <h5 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h5>
            <p className="card-text text-primary">{doctor.experience} Years</p>
            <p className="card-text text-gray-400">₹{doctor.feesPerCunsaltation}</p>
            <p className="card-text text-muted">{doctor.address}</p>
            <button className="btn btn-outline-primary mt-auto"  onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>Book Now</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default DoctorList;
