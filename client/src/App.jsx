import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-20 px-10 py-5">
        <Outlet />
      </div>
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
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    // {
    //   path: "/",
    //   element: <AuthMiddleware component={AppLayout} />,
    //   children: [
    //     {
    //       path: "librarian",
    //       children: [
    //         {
    //           path: "dashboard",
    //           element: <Auth component={LibrarianAdminDashboard} />,
    //         },
    //         {
    //           path: "books",
    //           element: <Auth component={Books} />,
    //         },
    //         {
    //           path: "borrows",
    //           element: <Auth component={Borrow} />,
    //         },
    //         {
    //           path: "profile",
    //           element: <Auth component={Profile} />,
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  return <RouterProvider router={routing} />;
}
