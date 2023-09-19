import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

function FormComponent({
  isSmallScreen,
  workoutData,
  exerciseData,
  selectedExercise,
  onExerciseChange,
  selectedWorkout,
  onWorkoutChange,
}) {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-4">
        <Grid
          container
          gap={isSmallScreen ? 1 : 2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={5.8} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Workout</InputLabel>
              <Controller
                name="workout"
                control={control}
                defaultValue={selectedWorkout}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select Workout"
                    onChange={(e) => {
                        field.onChange(e);
                        const selectedObject =
                          workoutData.workoutsForTable.find(
                            (option) => option.name === e.target.value
                          );
                        onWorkoutChange(selectedObject);
                      }}
                  >
                    {workoutData.workoutsForTable.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={5.8} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Exercise</InputLabel>
              <Controller
                name="exercise"
                control={control}
                defaultValue={selectedExercise}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select Exercise"
                    onChange={(e) => {
                      field.onChange(e);
                      const selectedObject =
                        exerciseData.exercisesForTable.find(
                          (option) => option.name === e.target.value
                        );
                      onExerciseChange(selectedObject);
                    }}
                  >
                    {exerciseData.exercisesForTable.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item >
            
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default FormComponent;
