import React from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ExercisePage() {
  const [addExercise, setAddExercise] = React.useState(false);

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
            {/* TODO: Add data here */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
