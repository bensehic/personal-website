import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container
} from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Container className="w-5/6 sm:w-2/5">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Test
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            This will be updated
          </Typography>
          <Typography variant="body2">
            Some stuff here
            <br />
            More stuff
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">CLICK ME!</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
