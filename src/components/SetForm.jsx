import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function FormComponent({
  isSmallScreen,
  workoutData,
  exerciseData,
  selectedExercise,
  onExerciseChange,
  selectedWorkout,
  onWorkoutChange,
  dataToSave
}) {
  const [exerciseObject, setExerciseObject] = useState("");

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      workout: "",
      exercise: "",
      set: "",
      reps: "",
      weight: "",
    },
  });

  const onSubmit = async (data) => {
    const saveObject = {
      reps: Number(data.reps),
      set_number: Number(data.set),
      weight: Number(data.weight)
    }
    dataToSave(saveObject)

    // TODO: implement ability to only reset explicit fields (set, reps, weight)
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-4">
        <Grid
          container
          gap={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={5.8} xs={12}>
            <FormControl fullWidth error={errors.workout ? true : false}>
              <InputLabel>Select Workout</InputLabel>
              <Controller
                name="workout"
                control={control}
                defaultValue={selectedWorkout}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select Workout"
                    onChange={(e) => {
                      field.onChange(e);
                      const selectedObject = workoutData.workoutsForTable.find(
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
              {errors.workout ? (
                <FormHelperText>Workout is Required</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </Grid>
          <Grid item lg={5.8} xs={12}>
            <FormControl fullWidth error={errors.exercise ? true : false}>
              <InputLabel>Select Exercise</InputLabel>
              <Controller
                name="exercise"
                control={control}
                defaultValue={selectedExercise}
                rules={{ required: true }}
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
                      setExerciseObject(selectedObject);
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
              {errors.exercise ? (
                <FormHelperText>Exercise is Required</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </Grid>
          <Grid item lg={12} xs={12}>
            {(exerciseObject.rep_lower_limit ==
              exerciseObject.rep_upper_limit) &
            (exerciseObject != "") ? (
              <h3>
                <b>Exercise suggested reps:</b> {exerciseObject.rep_lower_limit}
              </h3>
            ) : (exerciseObject != "") & isSmallScreen ? (
              <h3>
                <b>Exercise suggested lower limit:</b>{" "}
                {exerciseObject.rep_lower_limit} <br />
                <b>Exercise suggested upper limit:</b>{" "}
                {exerciseObject.rep_upper_limit}
              </h3>
            ) : (exerciseObject != "") & !isSmallScreen ? (
              <h3>
                <b>Exercise suggested lower limit:</b>{" "}
                {exerciseObject.rep_lower_limit}
                <b className="ml-12">Exercise suggested upper limit:</b>{" "}
                {exerciseObject.rep_upper_limit}
              </h3>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item lg={3.8} xs={3.9}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Set Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.set}
                  helperText={errors.set?.message}
                  type="number"
                />
              )}
              name="set"
              control={control}
              rules={{
                required: "Set required",
                maxLength: {
                  value: 2,
                  message: "Set number cannot exceed 99",
                },
              }}
            />
          </Grid>
          <Grid item lg={3.8} xs={3.9}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of Reps"
                  variant="outlined"
                  fullWidth
                  error={!!errors.reps}
                  helperText={errors.reps?.message}
                  type="number"
                />
              )}
              name="reps"
              control={control}
              rules={{
                required: "Reps required",
                maxLength: {
                  value: 2,
                  message: "Number of reps cannot exceed 99",
                },
              }}
            />
          </Grid>
          <Grid item lg={3.8} xs={3}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Weight (kg)"
                  variant="outlined"
                  fullWidth
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                  type="number"
                />
              )}
              name="weight"
              control={control}
              rules={{
                maxLength: {
                  value: 3,
                  message: "Weight exceed 999",
                },
              }}
            />
          </Grid>
        </Grid>
        <div className="pt-4">
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormComponent;
