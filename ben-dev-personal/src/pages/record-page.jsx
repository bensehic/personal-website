import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Container, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoadingScreen from "../components/LoadingScreen";
import SetsTable from "../components/SetsTable";
import SetForm from "../components/SetForm";

const SETS = gql`
  query GetSets {
    setsForTable {
      workout_id {
        id
        name
      }
      exercise_id {
        id
        name
      }
      set_number
      weight
      reps
    }
  }
`;

const WORKOUTS = gql`
  query GetWorkouts {
    workoutsForTable {
      id
      name
      date
    }
  }
`;

const EXERCISES = gql`
  query GetExercises {
    exercisesForTable {
      id
      name
      rep_lower_limit
      rep_upper_limit
    }
  }
`;

export default function RecordPage() {
  const [addSet, setAddSet] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");

  const handleSelectedWorkout = (event) => {
    setSelectedWorkout(event.name);

    // Can now do stuff with the event object such as get the ID, etc.
  };

  const handleSelectedExercise = (event) => {
    setSelectedExercise(event.name);
    
    // Can now do stuff with the event object such as get the ID, etc.
  };

  const {
    loading: loadingSets,
    error: errorSets,
    data: dataSets,
    refetch,
  } = useQuery(SETS);
  const {
    loading: loadingWorkouts,
    error: errorWorkouts,
    data: dataWorkouts,
  } = useQuery(WORKOUTS);
  const {
    loading: loadingExercises,
    error: errorExercises,
    data: dataExercises,
  } = useQuery(EXERCISES);

  const isSmallScreen = window.innerWidth <= 640;

  if (loadingSets || loadingWorkouts || loadingExercises) {
    return <LoadingScreen loading={true} />;
  } else {
    return (
      <Container maxWidth="md">
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Sets</h1>
        </div>
        <div className="pb-4">
          <Button
            variant="outlined"
            startIcon={addSet ? <RemoveIcon /> : <AddIcon />}
            onClick={() => setAddSet(!addSet)}
          >
            Add Set
          </Button>
        </div>
        {addSet && (
          <SetForm
            isSmallScreen={isSmallScreen}
            workoutData={dataWorkouts}
            exerciseData={dataExercises}
            selectedExercise={selectedExercise}
            onExerciseChange={handleSelectedExercise}
            selectedWorkout={selectedWorkout}
            onWorkoutChange={handleSelectedWorkout}
          />
        )}
        <div className="pb-4">
          <h1 className="text-xl text-bold">List of Sets</h1>
        </div>

        {/* <SetsTable data={data} /> */}
      </Container>
    );
  }
}
