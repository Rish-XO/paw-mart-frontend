import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
// import Button from "@mui/material/Button";
import Home from "./pages/Home";
import Root from "./pages/Root";
import PostsPage from "./pages/Posts";
import PostsRootLayout from "./pages/PostsRootLayout";
import New from "./pages/New";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/Login";
import Show from "./pages/Show";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        element: <PostsRootLayout />,   //included the navbar for every page under posts
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: "new",
            id: "new",
            element: <New />
          },
          {
            path: ":id",
            children:[
              {
                index:true,
                element: <Show />
              },
              {
                path: "edit",
                id: "edit",
                element: <Edit />
              }
            ]
          }
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ],
  },
]);

function App() {
  try {
    
  } catch (error) {
    
  }
  return <RouterProvider router={router} />;
}

export default App;
