import { Outlet } from "react-router-dom";

export default function GymPage() {
  return (
    <>
      <h1> This is the gym page</h1>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}
