import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const [authType, setAuthType] = useState("login");

  const navigate = useNavigate();

  return (
    <div className="AuthenticatePage pt-6">
      {authType === "login" ? (
        <>
          <Login setAuthType={setAuthType} />
        </>
      ) : (
        <>
          <Register setAuthType={setAuthType} />
        </>
      )}
    </div>
  );
};

export default Authenticate;
