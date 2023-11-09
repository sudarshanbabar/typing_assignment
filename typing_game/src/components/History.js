// History.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getHistory = async () => {
    // let data = JSON.stringify({});

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "http://localhost:8080/api/history/" +
        window.sessionStorage.getItem("acccountId"),
      headers: {
        "Content-Type": "application/json",
      },
      // data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let res = response.data;
        if (res.status_cd === "1") {
          console.log("History recieved");
          setHistory(res.historyList);
          // navigate("/");
        } else {
          setError(res.usr_msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password.");
      });
  };
  useEffect(() => {
    getHistory();
  }, []);

  // return "hwllo";

  return (
    <div className="container custom-container">
      <h2 className="text-center">Typing History</h2>
      <br />
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>WPM</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td className="text-success">{data.correct}</td>
                  <td className="text-danger">{data.inCorrect}</td>
                  <td className="text-info"> {data.wpm}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", fontSize: "large" }}
              >
                No Typing History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-6 text-center">
              <button
                className="btn btn-primary custom-btn"
                style={{ width: "150px", margin: "0 10px" }}
                onClick={() => {
                  navigate("/typinggame");
                }}
              >
                Start Typing
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default History;
