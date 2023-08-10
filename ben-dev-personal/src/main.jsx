import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./pages/error-page.jsx";
import GymPage from "./pages/gym-page.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExercisePage from "./pages/exercise-page.jsx";

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
            element: <ExercisePage />
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
