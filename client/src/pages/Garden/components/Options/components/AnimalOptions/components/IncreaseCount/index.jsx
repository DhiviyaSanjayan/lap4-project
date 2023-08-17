import { useState } from "react";
import { useGarden } from "../../../../../../contexts";
import styles from "./style.module.css";

import axiosConfig from "../../../../../../../../utils/axiosConfig";
import axios from "axios";

export default function IncreaseCount({ animal_id, animal_type, count }) {
  const { setAnimals, setUser, user } = useGarden();
  const [input, setInput] = useState(0);
  const [cost, setCost] = useState(0);
  const COST_FOR_1 = 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(0);
    const increaseCount = async () => {
      try {
        const body1 = {
          count: count + +input,
        };
        const { data: data1 } = await axios.patch(
          `${import.meta.env.VITE_SERVER}/animals/${animal_id}`,
          body1,
          axiosConfig()
        );

        const body2 = {
          coins: user.coins - +cost,
        };
        const { data: data2 } = await axios.patch(
          `${import.meta.env.VITE_SERVER}/users/update`,
          body2,
          axiosConfig()
        );
        console.log(data1);
        setAnimals((animals) => {
          const index = animals.findIndex(
            (animal) => animal.animal_id == animal_id
          );
          animals[index] = data1;
          return animals;
        });

        setUser(data2);
      } catch (error) {
        console.log(error);
      }
    };

    increaseCount();
  };

  return (
    <div className={styles["container"]}>
      <div>Increase the number of {animal_type} you have</div>
      <form className={styles["inner-container"]} onSubmit={handleSubmit}>
        <input
          type="number"
          name="count"
          min={0}
          value={input}
          data-testid="count-input"
          onChange={(e) => {
            setInput(e.target.value);
            setCost(e.target.value * COST_FOR_1);
          }}
        />
        <div className={styles["cost"]}>
          <h4>Cost</h4>
          <div className={styles["coin"]}>{cost}</div>
        </div>
        <button
          className={styles["submit"]}
          disabled={user.coins < cost}
          type="submit"
        >
          Increase Count
        </button>
      </form>
    </div>
  );
}

// Anastasia for testing
// import React from "react";
// import { describe, it, expect, afterEach, beforeEach } from "vitest";
// import { render, cleanup } from "@testing-library/react";
// import IncreaseCount from "./index";
// import { GardenProvider } from "../../../../contexts";

// describe("IncreaseCount component", () => {
//   beforeEach(() => {
//     // Mocking the GardenProvider might be necessary depending on the implementation
//     // You can also mock other parts like axios if you don't want to test them here
//     render(
//       <GardenProvider>
//         <IncreaseCount animal_id="test-id" count={5} />
//       </GardenProvider>
//     );
//   });

//   afterEach(() => {
//     cleanup();
//   });

//   it("should render an 'Increase Count' button", () => {
//     const increaseButton = document.querySelector("button");
//     expect(increaseButton).toBeTruthy();
//     expect(increaseButton.textContent).toBe("Increase Count");
//   });
// });
