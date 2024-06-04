import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./Routes";
function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home.name} element={ROUTES.home.component} />
          <Route path={ROUTES.login.name} element={ROUTES.login.component} />
          <Route
            path={ROUTES.register.name}
            element={ROUTES.register.component}
          />
          <Route path={ROUTES.quiz.name} element={ROUTES.quiz.component} />
          <Route
            path={ROUTES.quizResult.name}
            element={ROUTES.quizResult.component}
          />
          <Route
            path={ROUTES.userRecords.name}
            element={ROUTES.userRecords.component}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Navigation;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import ROUTES from "./Routes";

// function Navigation() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     let id = localStorage.getItem("id");
//     if (id) setUser({ id: id });
//     console.log(user);
//   }, []);

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path={ROUTES.home.name}
//             element={user ? ROUTES.home.component : <Navigate to="/login" />}
//           />
//           <Route path={ROUTES.login.name} element={ROUTES.login.component} />
//           <Route
//             path={ROUTES.register.name}
//             element={ROUTES.register.component}
//           />
//           <Route
//             path={ROUTES.quiz.name}
//             element={user ? ROUTES.quiz.component : <Navigate to="/login" />}
//           />
//           <Route
//             path={ROUTES.quizResult.name}
//             element={
//               user ? ROUTES.quizResult.component : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path={ROUTES.userRecords.name}
//             element={
//               user ? ROUTES.userRecords.component : <Navigate to="/login" />
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default Navigation;
