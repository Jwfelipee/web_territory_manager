import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { User } from "react-feather";

export function DefaultLayout() {
  return (
    <div className="min-h-screen w-screen bg-white relative text-gray-700">
      <div
        className={clsx(
          "absolute top-2 right-2 bg-gray-400 flex items-center justify-center rounded-full p-2"
        )}
      >
        <User />
      </div>
      <Outlet />
    </div>
  );
}
