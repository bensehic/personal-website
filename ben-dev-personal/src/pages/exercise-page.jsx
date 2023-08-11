import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Grid,
  TextField,
  Button,
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
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
              justifyContent="center"
              alignItems="center"
            >
              <Grid>
                <TextField id="name" label="Name" variant="outlined" />
              </Grid>
              <Grid>
                <TextField
                  id="noSets"
                  label="Number of Sets"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <TextField
                  id="noReps"
                  label="Number of Reps"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">No. of Sets</TableCell>
                <TableCell align="right">No. of Reps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.exercisesForTable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.sets}</TableCell>
                  <TableCell align="right">{row.reps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}
