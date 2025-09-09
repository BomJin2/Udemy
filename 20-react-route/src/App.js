import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Root from "./pages/Root";
import ProductsDetailPage from "./pages/ProductsDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductsDetailPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
