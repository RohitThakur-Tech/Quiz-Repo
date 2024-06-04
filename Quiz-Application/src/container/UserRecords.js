import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";

function UserRecords() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getScoreDataFromUserId();
    console.log(userData);
  }, []);

  const renderUsers = () => {
    return userData.map((item) => (
      <tr key={item.id}>
        <td>{item.applicationUser.userName}</td>
        <td>{item.category.categoryName}</td>
        <td>{item.score}</td>
        <td>{item.timeSpent}</td>
        <td>{item.attemptTime}</td>
      </tr>
    ));
  };

  function getScoreDataFromUserId() {
    axios
      .get(
        `https://localhost:7278/Score/GetScore?userId=${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        alert("Unable to fetch the data");
      });
  }

  return (
    <div>
      {userData.length === 0 ? (
        <p>You don't have any records yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quiz Topic</th>
              <th>Score</th>
              <th>Time Spent Per Quiz</th>
              <th>Attempt Time</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      )}
      <button
        onClick={() => {
          navigate(ROUTES.home.name);
        }}
        className="btn btn-warning form-control"
      >
        Back To Home
      </button>
    </div>
  );
}

export default UserRecords;
