import React, { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import {
  Container,
  Button,
  Grid,
  TextField,
  FormControl,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const WORKOUTS = gql`
  query GetWorkouts {
    workoutsForTable {
      id
      name
    }
  }
`;

export default function WorkoutPage() {
  const [addWorkout, setAddWorkout] = useState(false);

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
        {addWorkout && (
          <div className="pb-4">
            <Grid
              container
              gap={isSmallScreen ? 1 : 2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid lg={6} xs={12}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid lg={6} xs={12}>
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={data.workoutsForTable}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select an exerecise"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div className="pt-4">
              <Button
                variant="contained"
                onClick={() => {
                  setAddWorkout(false);
                }}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </Container>
    );
  }
}
