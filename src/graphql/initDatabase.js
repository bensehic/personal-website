import { Exercise } from "./connectors.js";

Exercise.create({ name: "Deadlift", rep_lower_limit: 5, rep_upper_limit: 5 })
  .then((record) => {
    console.log("Record created: ", record);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });