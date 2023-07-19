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
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler, verifyHandler } from "./utils/store/authSlice";
import Chat from "./pages/Chat";
import CustomizedSnackbars from "./components/snackbar/Snackbar";
import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnBZ3Q0nERoATGyl9VAJForKc_6wQW6pk",
  authDomain: "paw-mart-87d49.firebaseapp.com",
  projectId: "paw-mart-87d49",
  storageBucket: "paw-mart-87d49.appspot.com",
  messagingSenderId: "127877811269",
  appId: "1:127877811269:web:b7ae10ebd03fac59f3272c",
  measurementId: "G-V0M0L79EFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <CustomizedSnackbars />
        <Root />
      </>
    ),
    id: "root",
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        element: <PostsRootLayout />, //included the navbar for every page under posts
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: "new",
            id: "new",
            element: <New />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <Show />,
              },
              {
                path: "edit",
                id: "edit",
                element: <Edit />,
              },
            ],
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "chat",
        children: [
          {
            index: true,
            element: <Chat />,
          },
          {
            path: ":roomID",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const isVerified = useSelector((state) => state.authHandler.isVerified);
  const user_id = useSelector((state) => state.authHandler.user_id);
  console.log("verification :" + isVerified);
  const checkAuthenticated = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:5000/is-verify", null, {
        headers: {
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "jababa",
        },
      });

      const parseRes = res.data;
      console.log(parseRes);
      parseRes.status === true
        ? dispatch(verifyHandler({ status: parseRes.status, id: parseRes.id }))
        : dispatch(logoutHandler());
    } catch (err) {
      dispatch(logoutHandler());
      console.log(err.message);
    }
  }, [dispatch]);

  console.log(isVerified, user_id);
  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  return <RouterProvider router={router} />;
}

export default App;
