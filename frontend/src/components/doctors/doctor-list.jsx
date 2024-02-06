import React from "react";
import { doctors } from "../../assets/data/doctors.js";
import DoctorCard from "./doctor-card.jsx";

const DoctorList = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]   ">
        {
            doctors.map((doctor)=>(
                <DoctorCard doctors={doctor} key={doctor.id} />
            ))
        }
      </div>
    </>
  );
};

export default DoctorList;
