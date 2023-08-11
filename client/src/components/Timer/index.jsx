import React, { useState, useEffect } from "react";

function CountdownTimer({ plant, setPlant }) {
  //This function will update the React state/context so that UI will change to reflect the passage of time.
  // Will not update the API, done by the mega update function

  const countdownInterval = 10; //in seconds, 60 minutes * 60 seconds = 1 hour
  const [countdown, setCountdown] = useState(countdownInterval);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        // Reduce water and nutrient satisfaction by a set amount
        const waterReduction = 5;
        const nutrientReduction = 10;

        const updatedPlant = plant.map((plantObj) => {
          const newWaterSatisfaction = Math.max(
            0,
            plantObj.soil_moisture - waterReduction
          );
          const newNutrientSatisfaction = Math.max(
            0,
            plantObj.soil_fertility - nutrientReduction
          );
          return {
            ...plantObj,
            soil_moisture: newWaterSatisfaction,
            soil_fertility: newNutrientSatisfaction,
          };
        });
        setPlant(updatedPlant);
        setCountdown(countdownInterval);
      }
    }, 1000); // Interval in milliseconds (1000 ms = 1 second)

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
    
  }, [countdown]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time remaining: {formatTime(countdown)}</p>
    </div>
  );
}

export default CountdownTimer;
