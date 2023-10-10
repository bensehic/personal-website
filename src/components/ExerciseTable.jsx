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

function ExerciseTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Lower Limit of Reps</TableCell>
            <TableCell align="right">Upper Limit of Reps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.exercisesForTable.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.rep_lower_limit}</TableCell>
              <TableCell align="right">{row.rep_upper_limit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExerciseTable;
