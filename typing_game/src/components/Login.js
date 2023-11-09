// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateLogin = async () => {
    let data = JSON.stringify({
      userId: username,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let res = response.data;
        if (res.status_cd === "1") {
          window.sessionStorage.setItem("authenticate", "1");
          window.sessionStorage.setItem("acccountId", res.acccountId);

          navigate("/typinggame");
        } else {
          setError(res.usr_msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password.");
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill all required details.");
      return;
    }
    validateLogin();
  };

  return (
    <div>
      <div className="container login-container ">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Login Form</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group text-danger">{error ? error : ""}</div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
              <div className="form-group">
                <a
                  href="#"
                  className="ForgetPwd"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Don't have an account? Signup
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
