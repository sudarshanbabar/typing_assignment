import React, { useState, useEffect } from "react";

const TimeElapsed = (props) => {
  const [startTime, setStartTime] = useState(new Date()); // Replace with your own start time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeElapsed = () => {
    const difference = currentTime.getTime() - startTime.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);

    return `${minutes} minutes, ${seconds % 60} seconds`;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Time Elapsed</h2>
      <p className="text-center">{calculateTimeElapsed()}</p>
    </div>
  );
};

export default TimeElapsed;
