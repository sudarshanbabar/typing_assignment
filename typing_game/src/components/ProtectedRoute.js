import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [canAccess, setCanAccess] = useState(false);
  const checkUserAccess = () => {
    const userRole = window.sessionStorage.getItem("authenticate");

    const tempcanAccess = userRole && userRole === "1" ? true : false;

    if (!tempcanAccess) {
      return navigate("/");
    }
    setCanAccess(tempcanAccess);
  };
  useEffect(() => {
    checkUserAccess();
  }, [canAccess]);
  return <React.Fragment>{canAccess ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
