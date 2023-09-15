import React, { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import LoadingScreen from "../components/LoadingScreen";
import { Container, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery, gql, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import { useForm, Controller } from "react-hook-form";
import WorkoutTable from "../components/WorkoutTable";


const WORKOUTS = gql`
  query GetWorkouts {
    workoutsForTable {
      id
      name
      date
    }
  }
`;

const ADD_WORKOUT = gql`
  mutation AddWorkout($name: String!, $date: String!) {
    addWorkout(name: $name, date: $date) {
      id
      name
      date
    }
  }
`;

export default function WorkoutPage() {
  const [addWorkout, setAddWorkout] = useState(false);

  const { loading, error, data, refetch } = useQuery(WORKOUTS);

  const isSmallScreen = window.innerWidth <= 640;

  const [addWorkoutEntry] = useMutation(ADD_WORKOUT);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      date: dayjs(),
    },
  });

  const onSubmit = async (data) => {
    await addWorkoutEntry({ variables: data });

    refetch();

    reset();
    setAddWorkout(false);
  };

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
        {addWorkout && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <Grid
                container
                gap={isSmallScreen ? 1 : 2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item lg={6} xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
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
                        value: 255,
                        message: "Name cannot exceed 255 characters",
                      },
                    }}
                  />
                </Grid>
                <Grid item lg={5.7} xs={12}>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                        <DatePicker
                          wrapperClassName="w-full"
                          label="Date"
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          onBlur={() => field.onBlur()}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
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
          <h1 className="text-xl text-bold">List of Workouts</h1>
        </div>
        <WorkoutTable data={data}/>
      </Container>
    );
  }
}
