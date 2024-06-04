// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ROUTES from "../navigations/Routes";
// import Header from "../components/Header";
// import Login from "./login/Login";

// function Home() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [user, setUser] = useState({ id: null });

//   useEffect(() => {
//     getAllCategories();
//     JSON.stringify(localStorage.setItem("number", 0));
//     let id = localStorage.getItem("id");
//     if (id) setUser({ id: id });
//     console.log(data);
//   }, []);
//   function getAllCategories() {
//     axios.get("https://localhost:7278/Category/GetAllCategory").then((d) => {
//       setData(d.data);
//     });
//   }

//   const renderQuizzes = () => {
//     return data.map((item) => (
//       <div className="row col-6 offset-4 mt-5">
//         <div key={item.id} className="col-lg-3 col-md-6">
//           <div className="row p-2">
//             <div
//               className="col-12  p-1"
//               style={{ border: "1px solid #008cba", borderRadius: "10px" }}
//             >
//               <div className="card" style={{ border: "0px", padding: "10px" }}>
//                 <a
//                   className="homeAnchor"
//                   onClick={() => {
//                     navigate(
//                       ROUTES.quiz.name +
//                         "?id=" +
//                         item.id +
//                         "&topic=" +
//                         item.categoryName
//                     );
//                     localStorage.setItem("QuizzId", item.id);
//                   }}
//                 >
//                   {item.categoryName}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ));
//   };
//   function Auth() {
//     if (user?.id) {
//       return renderQuizzes();
//     } else {
//       return <h2>Please Login First to Start The Quiz</h2>;
//     }
//   }

//   return (
//     <div>
//       <Header />
//       {Auth()}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/Slices";
import { useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.quizss.categories);
  const status = useSelector((state) => state.quizss.status);

  useEffect(() => {
    debugger;
    JSON.stringify(localStorage.setItem("number", 0));
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  const renderQuizzes = () => {
    return categories.map((item) => (
      <div className="row col-6 offset-4 mt-5">
        <div key={item.id} className="col-lg-3 col-md-6">
          <div className="row p-2">
            <div
              className="col-12  p-1"
              style={{ border: "1px solid #008cba", borderRadius: "10px" }}
            >
              <div className="card" style={{ border: "0px", padding: "10px" }}>
                <a
                  className="homeAnchor"
                  onClick={() => {
                    navigate(
                      ROUTES.quiz.name +
                        "?id=" +
                        item.id +
                        "&topic=" +
                        item.categoryName
                    );
                    localStorage.setItem("QuizzId", item.id);
                  }}
                >
                  {item.categoryName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <Header />
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error fetching data</div>}
      {status === "succeeded" && categories.length === 0 && (
        <div>No data available</div>
      )}
      {status === "succeeded" && categories.length > 0 && renderQuizzes()}
    </div>
  );
}
export default Home;
