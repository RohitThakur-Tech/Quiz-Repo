import Home from "../container/Home";
import Quiz from "../container/Quiz";
import QuizResult from "../container/QuizResult";
import UserRecords from "../container/UserRecords";
import Login from "../container/login/Login";
import Register from "../container/register/Register";

const ROUTES = {
  home: {
    name: "/",
    component: <Home />,
  },
  login: {
    name: "/login",
    component: <Login />,
  },
  register: {
    name: "/register",
    component: <Register />,
  },
  quiz: {
    name: "/quiz",
    component: <Quiz />,
  },
  quizResult: {
    name: "/quizresult",
    component: <QuizResult />,
  },
  userRecords: {
    name: "/userRecords",
    component: <UserRecords />,
  },
};

export default ROUTES;
