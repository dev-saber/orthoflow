import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Sidebar from "./components/molecules/sideBar";
import Appointments from "./pages/Appointments";
import AuthMiddleware from "./middleware/AuthMiddleware";
import Patients from "./pages/Patients";
import Stock from "./pages/Stock";
import Bills from "./pages/Bills";
import MedicalHistory from "./pages/MedicalHistory";
import PurchaseHistory from "./pages/PurchaseHistory";
import Settings from "./pages/Settings";

const AppLayout = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div className="flex">
      <Sidebar />
      <motion.div
        className="flex flex-col flex-grow"
        initial={false}
        animate={{
          marginLeft: isOpen ? "256px" : "64px",
          width: isOpen ? "calc(100% - 256px)" : "calc(100% - 64px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mt-20 px-6 py-5">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const routing = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <AuthMiddleware component={AppLayout} />,
      children: [
        {
          path: "appointments",
          element: <Appointments />,
        },
        {
          path: "patients",
          element: <Patients />,
        },
        {
          path: "stock",
          element: <Stock />,
        },
        {
          path: "bills",
          element: <Bills />,
        },
        {
          path: "medical-history",
          element: <MedicalHistory />,
        },
        {
          path: "purchase-history",
          element: <PurchaseHistory />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routing} />;
}
