import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Container, Button } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const WORKOUTS = gql`
  query GetWorkouts {
    workoutsForTable {
      id
      name
    }
  }
`;

export default function WorkoutPage() {
  const [addWorkout, setAddWorkout] = React.useState(false);

  const { loading, error, data } = useQuery(WORKOUTS);

  const isSmallScreen = window.innerWidth <= 640;

  if (loading) {
    return <LoadingScreen loading={loading} />;
  } else {
    return (
      <Container maxWidth="md">
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Workouts</h1>
        </div>
        <div className="pb-4">
          <Button
            variant="outlined"
            startIcon={addWorkout ? <RemoveIcon /> : <AddIcon />}
            onClick={() => setAddWorkout(!addWorkout)}
          >
            Add Workout
          </Button>
        </div>
      </Container>
    );
  }
}
