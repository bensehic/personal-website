import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
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
      rep_lower_limit
      rep_upper_limit
    }
  }
`;

const ADD_EXERCISE = gql`
  mutation AddExercise(
    $name: String!
    $rep_lower_limit: Int!
    $rep_upper_limit: Int!
  ) {
    addExercise(
      name: $name
      rep_lower_limit: $rep_lower_limit
      rep_upper_limit: $rep_upper_limit
    ) {
      id
      name
      rep_lower_limit
      rep_upper_limit
    }
  }
`;

export default function ExercisePage() {
  const [addExercise, setAddExercise] = React.useState(false);

  const { loading, error, data, refetch } = useQuery(EXERCISES);

  const isSmallScreen = window.innerWidth <= 640;

  const [addExerciseEntry] = useMutation(ADD_EXERCISE);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      rep_lower_limit: "",
      rep_upper_limit: "",
    },
  });
  const onSubmit = async (data) => {
    data.rep_lower_limit = parseInt(data.rep_lower_limit, 10);
    data.rep_upper_limit = parseInt(data.rep_upper_limit, 10);

    await addExerciseEntry({ variables: data });

    refetch();

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
                <Grid item lg={12} xs={12}>
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
                <Grid item lg={5.9} xs={5.8}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Lower Limit of Reps"
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth
                        error={!!errors.noSets}
                        helperText={errors.noSets?.message}
                      />
                    )}
                    name="rep_lower_limit"
                    control={control}
                    rules={{
                      required: "Lower limit of reps is required",
                      maxLength: {
                        value: 3,
                        message: "Number of sets cannot exceed 999",
                      },
                    }}
                  />
                </Grid>
                <Grid item lg={5.9} xs={5.8}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Upper Limit of Reps"
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth
                        error={!!errors.noReps}
                        helperText={errors.noReps?.message}
                      />
                    )}
                    name="rep_upper_limit"
                    control={control}
                    rules={{
                      required: "Upper limit of reps is required",
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
