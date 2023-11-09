// TypingGame.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeElapsed from "./TimeElapsed";
import { useNavigate } from "react-router-dom";

const TypingGame = () => {
  const [text, setText] = useState("Type this sample text here");
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [wpm, setWPM] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://baconipsum.com/api/?type=nature"
      );
      console.log(response);
      setText(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const saveHistory = async () => {
    let data = JSON.stringify({
      accountId: window.sessionStorage.getItem("acccountId"),
      correct: correct,
      inCorrect: incorrect,
      wpm: wpm,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/history",
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
          console.log("History save");
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
    fetchData();
  }, []);

  useEffect(() => {
    if (gameEnd) {
      saveHistory();
    }
  }, [gameEnd]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    let correctCount = 0;
    let incorrectCount = 0;

    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    setCorrect(correctCount);
    setIncorrect(incorrectCount);
  };

  const handleStartGame = () => {
    setStartTime(Date.now());
    setShowButton(false);
    setDisabled(false);
  };

  const handleEndGame = () => {
    let endTime = Date.now();
    const minutes = (endTime - startTime) / 60000; // convert to minutes
    const typedWords = text.split(" ").length;
    const wpmValue = Math.round(typedWords / minutes);
    console.log(minutes, typedWords, wpmValue);
    setWPM(wpmValue);
    setGameEnd(true);
    setDisabled(true);
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (input.length >= text.length) {
      handleEndGame();
    }
  }, [input, text]);

  return (
    <div className="container custom-container">
      <h2 className="text-center">Typing Game</h2>
      <br />
      <p className="text-center">{text}</p>
      <textarea
        className="form-control custom-input"
        value={input}
        placeholder="Click on Start Game and Start Typing"
        onChange={handleInputChange}
        onPaste={handlePaste}
        disabled={disabled}
      />
      <br />
      {startTime ? (
        <>
          <p className="text-success">Correct: {correct}</p>
          <p className="text-danger">Incorrect: {incorrect}</p>
          {wpm > 0 ? <p className="text-info">WPM: {wpm}</p> : <TimeElapsed />}
        </>
      ) : (
        ""
      )}

      {showButton ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col-6 text-center">
                <button
                  className="btn btn-success custom-btn"
                  style={{ width: "150px", margin: "0 10px" }}
                  onClick={handleStartGame}
                >
                  Start Game
                </button>
              </div>
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary custom-btn"
                  style={{ width: "150px", margin: "0 10px" }}
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-6 text-center">
            <div className="form-group text-danger">{error ? error : ""}</div>
          </div>
        </div>
      </div>
      {gameEnd ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col-6 text-center">
                <button
                  className="btn btn-success custom-btn"
                  style={{ width: "150px", margin: "0 10px" }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  New Game
                </button>
              </div>
              <div className="col-6 text-center">
                <button
                  className="btn btn-primary custom-btn"
                  style={{ width: "150px", margin: "0 10px" }}
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TypingGame;
