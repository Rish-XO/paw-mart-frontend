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
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await axios.post("http://localhost:5000/is-verify", null, {
        headers: {
          token: localStorage.getItem('token') ? localStorage.getItem('token') : 'jababa'
        }
      });
  
      const parseRes = res.data;
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (err) {
      setIsAuthenticated(false)
      console.log(err.message);
    }
  };
  
  console.log(isAuthenticated);
  useEffect(() => {
    checkAuthenticated();
  }, []);
  
  return <RouterProvider router={router} />;
}

export default App;
