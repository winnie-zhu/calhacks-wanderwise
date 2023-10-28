import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Planning from "./pages/Planning";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/planning",
      element: <Planning />,
    },
    {
      path: "/results",
      element: <Results />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
