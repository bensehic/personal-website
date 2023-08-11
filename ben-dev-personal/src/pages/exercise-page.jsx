import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Grid,
  TextField,
  Button,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ExerciseTable from "../components/ExerciseTable";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";

const EXERCISES = gql`
  query GetExercises {
    exercisesForTable {
      id
      name
      reps
      sets
    }
  }
`;

export default function ExercisePage() {
  const [addExercise, setAddExercise] = React.useState(false);

  const { loading, error, data } = useQuery(EXERCISES);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md">
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Exercises</h1>
        </div>
        <div className="pb-4">
          <Button
            variant="outlined"
            startIcon={addExercise ? <RemoveIcon /> : <AddIcon />}
            onClick={() => setAddExercise(!addExercise)}
          >
            Add Exercise
          </Button>
        </div>
        {addExercise && (
          <div className="pb-4">
            <Grid
              container
              gap={4}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid xs={5}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid>
                <TextField
                  id="noSets"
                  label="Number of Sets"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid>
                <TextField
                  id="noReps"
                  label="Number of Reps"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            <div className="pt-4">
              <Button variant="contained" onClick={() => {setAddExercise(false)}} startIcon={<SaveIcon />}>
                Save
              </Button>
            </div>
          </div>
        )}
        <div className="pb-4">
          <h1 className="text-xl text-bold">List of Exercises</h1>
        </div>
        <ExerciseTable data={data} />
      </Container>
    );
  }
}
