// import React from "react";
import { Link } from "react-router-dom";

const Minifooter = () => {
  return (
    <div className="  text-teal-900 flex justify-center items-center p-4 rounded-md">
      <Link to="/TermsConditions" className="mx-2">
        <p className="m-0">TermsConditions</p>
      </Link>
      <Link to="/PrivacyPolicy" className="mx-2">
        <p className="m-0">PrivacyPolicy</p>
      </Link>
    </div>
  );
};

export default Minifooter;
