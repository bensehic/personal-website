import { Outlet } from "react-router-dom";

export default function GymPage() {
  return (
    <>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}
