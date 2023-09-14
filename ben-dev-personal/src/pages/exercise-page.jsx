import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, TextField, Button, Container } from "@mui/material";
import ExerciseTable from "../components/ExerciseTable";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import LoadingScreen from "../components/LoadingScreen";
import { useForm, Controller } from "react-hook-form";

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

  const isSmallScreen = window.innerWidth <= 640;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      noSets: "",
      noReps: "",
    },
  });
  const onSubmit = (data) => {
    // TODO: Implement logic to actually save the data
    console.log(data);
    reset();
    setAddExercise(false);
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <Grid
                container
                gap={isSmallScreen ? 1 : 1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid lg={12} xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                    name="name"
                    control={control}
                    rules={{
                      required: "Name is required",
                      maxLength: {
                        value: 256,
                        message: "Name cannot exceed 256 characters",
                      },
                    }}
                  />
                </Grid>
                <Grid lg={5.9} xs={5.8}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Number of Sets"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.noSets}
                        helperText={errors.noSets?.message}
                      />
                    )}
                    name="noSets"
                    control={control}
                    rules={{
                      required: "Number of sets is required",
                      maxLength: {
                        value: 3,
                        message: "Number of sets cannot exceed 999",
                      },
                    }}
                  />
                </Grid>
                <Grid lg={5.9} xs={5.8}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Number of Reps"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.noReps}
                        helperText={errors.noReps?.message}
                      />
                    )}
                    name="noReps"
                    control={control}
                    rules={{
                      required: "Number of reps is required",
                      maxLength: {
                        value: 3,
                        message: "Number of reps cannot exceed 999",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        )}
        <div className="pb-4">
          <h1 className="text-xl text-bold">List of Exercises</h1>
        </div>
        <ExerciseTable data={data} />
      </Container>
    );
  }
}
