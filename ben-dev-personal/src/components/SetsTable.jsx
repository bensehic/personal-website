import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function SetsTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Workout ID</TableCell>
            <TableCell>Exercise ID</TableCell>
            <TableCell>Set Number</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Reps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.setsForTable.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.workout_id}
              </TableCell>
              <TableCell>{row.exercise_id}</TableCell>
              <TableCell>{row.set_number}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.reps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SetsTable;
