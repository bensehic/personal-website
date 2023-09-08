import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/error-page.jsx";
import GymPage from "./pages/gym-page.jsx";
import ExercisePage from "./pages/exercise-page.jsx";
import WorkoutPage from "./pages/workout-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "gym",
        element: <GymPage />,
        children: [
          {
            path: "exercises",
            element: <ExercisePage />,
          },
          {
            path: "workouts",
            element: <WorkoutPage />,
          },
          {
            // TODO: implement the element
            path: "record-workout",
            element: <></>,
          },
          {
            // TODO: implement the element
            path: "report",
            element: <></>,
          },
        ],
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
