import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function QuizResult() {
  const navigate = useNavigate();
  const queryParams = useQuery();
  return (
    <div>
      <h2>Your Score {queryParams.get("score")}</h2>
      <button
        onClick={() => {
          navigate(ROUTES.home.name);
        }}
        className="btn btn-warning"
      >
        Back To Home
      </button>
    </div>
  );
}
export default QuizResult;
