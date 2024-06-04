// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ROUTES from "../navigations/Routes";

// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

// function Timer({ startTime, onTimeout, resetTimer }) {
//   const [seconds, setSeconds] = useState(10);

//   useEffect(() => {
//     if (resetTimer) {
//       setSeconds(10);
//     }

//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds > 0) {
//           return prevSeconds - 1;
//         } else {
//           clearInterval(interval);
//           onTimeout();
//           return 10;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startTime, onTimeout, resetTimer]);

//   return <div>Time Left: {seconds} seconds</div>;
// }

// function Quiz() {
//   const queryParams = useQuery();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [startTime, setStartTime] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [canTakeQuiz, setCanTakeQuiz] = useState(true);
//   const [recordSaved, setRecordSaved] = useState(false);
//   const [resetTimer, setResetTimer] = useState(false);
//   const [refreshTime, setRefreshTime] = useState(0);

//   useEffect(() => {
//     const start = Math.floor(Date.now() / 1000);
//     setStartTime(start);

//     // window.addEventListener("beforeunload", handlePageLeave);

//     // return () => {
//     //   window.removeEventListener("beforeunload", handlePageLeave);
//     // };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       checkCanTakeQuiz();
//       getQuestionsByCategoryId();
//     };
//   }, []);
//   const handleBeforeUnload = (event) => {
//     // event.preventDefault = () => {
//     //   alert("You dont have the permission to refresh the page");
//     // };
//     event.preventDefault();
//     alert("You dont have the access to refresh the page");
//   };
//   function handlePageLeave(event) {
//     debugger;
//     saveTestRecord();
//     navigateToQuizResult();
//   }

//   function navigateToQuizResult() {
//     debugger;
//     const endTime = Math.floor(Date.now() / 1000);
//     const timeSpent = endTime - startTime;
//     navigate(`${ROUTES.quizResult.name}?score=${score}&time=${timeSpent}`);
//   }

//   function checkCanTakeQuiz() {
//     debugger;
//     const userId = localStorage.getItem("id");
//     const categoryId = queryParams.get("id");
//     axios
//       .get(
//         `https://localhost:7278/Quiz/CanTakeQuiz?userId=${userId}&categoryId=${categoryId}`
//       )
//       .then((response) => {
//         setCanTakeQuiz(response.data.canTakeQuiz);
//       })
//       .catch((error) => {
//         console.error("Error checking quiz eligibility:", error);
//       });
//   }

//   function submitAnswers() {
//     try {
//       let _questionId = JSON.parse(localStorage.getItem("questionsIds"));
//       axios
//         .post("https://localhost:7278/Quiz/Answere", _questionId)
//         .then((response) => {
//           localStorage.setItem("answers", JSON.stringify(response.data));
//         })
//         .catch((error) => {
//           console.error("Error fetching answers:", error);
//         });
//     } catch (e) {
//       alert("error");
//     }
//   }

//   function saveTestRecord() {
//     debugger;
//     const endTime = Math.floor(Date.now() / 1000);
//     const timeSpent = endTime - startTime;
//     const scoreData = {
//       score: score,
//       categoryId: JSON.parse(localStorage.getItem("QuizzId")),
//       applicationUserID: localStorage.getItem("id"),
//       timeSpent: timeSpent,
//     };

//     if (!localStorage.getItem("recordSaved")) {
//       axios
//         .post("https://localhost:7278/Score/SaveData", scoreData)
//         .then((response) => {
//           console.log("Test record saved successfully:", response.data);
//           localStorage.setItem("recordSaved", true);
//           localStorage.removeItem("recordSaved");
//         })
//         .catch((error) => {
//           console.error("Error saving test record:", error);
//         });
//     }
//   }

//   function getQuestionsByCategoryId() {
//     debugger;
//     const categoryId = queryParams.get("id");
//     let url = "";
//     switch (categoryId) {
//       case "1":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=1";
//         break;
//       case "2":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=2";
//         break;
//       case "3":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=3";
//         break;
//       default:
//         alert("Unable to find the CategoryID");
//         return;
//     }
//     debugger;
//     axios
//       .get(url)
//       .then((response) => {
//         setQuestions(response.data);
//         localStorage.setItem("questions", JSON.stringify(response.data));
//         const ids = response.data.map((question) => question.questionId);
//         localStorage.setItem("questionsIds", JSON.stringify(ids));
//         setRefreshTime(refreshTime + 1);
//       })
//       .catch((error) => {
//         console.error("Error fetching questions:", error);
//       });
//   }

//   function handleAnswerSelection(selectedIndex) {
//     debugger;
//     setSelectedOption(selectedIndex);
//     setResetTimer(false);
//   }

//   function handleNext() {
//     debugger;
//     const currentQuestion = questions[currentQuestionIndex];
//     const correctAnswerIndex = currentQuestion.answere;
//     const isCorrect = selectedOption === correctAnswerIndex;

//     if (selectedOption === "") {
//       alert("Please select an option before moving to the next question.");
//       return;
//     }

//     if (isCorrect) {
//       setScore(score + 1);
//     }

//     setAnswers([
//       ...answers,
//       {
//         questionId: currentQuestion.questionId,
//         selectedAnswerIndex: selectedOption,
//         isCorrect,
//       },
//     ]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption("");
//       setResetTimer(true);
//     } else {
//       if (!localStorage.getItem("recordSaved")) {
//         // submitAnswers();
//         saveTestRecord();
//         localStorage.setItem("recordSaved", true);
//       }
//       navigate(
//         ROUTES.quizResult.name +
//           "?score=" +
//           (score + (isCorrect ? 1 : 0)) +
//           "&time=" +
//           (Math.floor(Date.now() / 1000) - startTime)
//       );
//       checkCanTakeQuiz();
//     }
//   }

//   function handleTimeout() {
//     debugger;
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption("");
//       setResetTimer(true);
//     } else {
//       // submitAnswers();
//       saveTestRecord();
//       navigate(
//         ROUTES.quizResult.name +
//           "?score=" +
//           score +
//           "&time=" +
//           (Math.floor(Date.now() / 1000) - startTime)
//       );
//       checkCanTakeQuiz();
//     }
//   }

//   return (
//     <div className="container mt-5">
//       {canTakeQuiz ? (
//         <>
//           <Timer
//             startTime={startTime}
//             onTimeout={handleTimeout}
//             resetTimer={resetTimer}
//           />
//           {questions.length > 0 && (
//             <>
//               <h2>Question {currentQuestionIndex + 1}</h2>
//               <h3>{questions[currentQuestionIndex].questionText}</h3>
//               <ul>
//                 {questions[currentQuestionIndex].options.map(
//                   (option, index) => (
//                     <li
//                       style={{ listStyleType: "none" }}
//                       className="mt-5"
//                       key={index}
//                     >
//                       <input
//                         type="radio"
//                         id={`option-${index}`}
//                         name="options"
//                         value={index}
//                         checked={selectedOption === index}
//                         onChange={() => handleAnswerSelection(index)}
//                       />
//                       <label htmlFor={`option-${index}`}>{option}</label>
//                     </li>
//                   )
//                 )}
//               </ul>
//               <button className="btn btn-primary" onClick={handleNext}>
//                 Next
//               </button>
//             </>
//           )}
//         </>
//       ) : (
//         <div>
//           <h2>
//             You have already given the quiz recently.Please try again after some
//             time
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Quiz;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ROUTES from "../navigations/Routes";

// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

// function Timer({ startTime, onTimeout, resetTimer }) {
//   const [seconds, setSeconds] = useState(10);

//   useEffect(() => {
//     if (resetTimer) {
//       setSeconds(10);
//     }

//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds > 0) {
//           return prevSeconds - 1;
//         } else {
//           clearInterval(interval);
//           onTimeout();
//           return 10;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startTime, onTimeout, resetTimer]);

//   return <div>Time Left: {seconds} seconds</div>;
// }

// function Quiz() {
//   const queryParams = useQuery();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [startTime, setStartTime] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [canTakeQuiz, setCanTakeQuiz] = useState(true);
//   const [recordSaved, setRecordSaved] = useState(false);
//   const [resetTimer, setResetTimer] = useState(false);

//   useEffect(() => {
//     const start = Math.floor(Date.now() / 1000);
//     setStartTime(start);
//     checkCanTakeQuiz();
//     var num = JSON.parse(localStorage.getItem("number"));
//     if (num === 0) {
//       getQuestionsByCategoryId();
//     } else {
//       alert("You are not Allowed to refresh the Page");
//       setQuestions(JSON.parse(localStorage.getItem("questions")));
//       questions;
//     }
//   }, []);

//   function getQuestionByIndex() {}
//   // useEffect(() => {
//   //   const start = Math.floor(Date.now() / 1000);
//   //   const storedQuestionIndex = JSON.parse(
//   //     localStorage.getItem("currentQuestionIndex")
//   //   );
//   //   setCurrentQuestionIndex(
//   //     storedQuestionIndex !== null ? storedQuestionIndex : 0
//   //   );
//   //   checkCanTakeQuiz();
//   //   var num = JSON.parse(localStorage.getItem("number"));
//   //   if (num === 0) {
//   //     getQuestionsByCategoryId();
//   //   } else {
//   //     alert("You are not Allowed to refresh the Page");
//   //     setQuestions(JSON.parse(localStorage.getItem("questions")));
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   localStorage.setItem(
//   //     "currentQuestionIndex",
//   //     JSON.stringify(currentQuestionIndex)
//   //   );
//   // }, [currentQuestionIndex]);

//   function checkCanTakeQuiz() {
//     const userId = localStorage.getItem("id");
//     const categoryId = queryParams.get("id");
//     axios
//       .get(
//         `https://localhost:7278/Quiz/CanTakeQuiz?userId=${userId}&categoryId=${categoryId}`
//       )
//       .then((response) => {
//         setCanTakeQuiz(response.data.canTakeQuiz);
//       })
//       .catch((error) => {
//         console.error("Error checking quiz eligibility:", error);
//       });
//   }

//   function submitAnswers() {
//     try {
//       let _questionId = JSON.parse(localStorage.getItem("questionsIds"));
//       axios
//         .post("https://localhost:7278/Quiz/Answere", _questionId)
//         .then((response) => {
//           localStorage.setItem("answers", JSON.stringify(response.data));
//         })
//         .catch((error) => {
//           console.error("Error fetching answers:", error);
//         });
//     } catch (e) {
//       alert("error");
//     }
//   }

//   function saveTestRecord() {
//     const endTime = Math.floor(Date.now() / 1000);
//     const timeSpent = endTime - startTime;
//     const scoreData = {
//       score: score,
//       categoryId: JSON.parse(localStorage.getItem("QuizzId")),
//       applicationUserID: localStorage.getItem("id"),
//       timeSpent: timeSpent,
//     };

//     if (!localStorage.getItem("recordSaved")) {
//       axios
//         .post("https://localhost:7278/Score/SaveData", scoreData)
//         .then((response) => {
//           console.log("Test record saved successfully:", response.data);
//           localStorage.setItem("recordSaved", true);
//           localStorage.removeItem("recordSaved");
//         })
//         .catch((error) => {
//           console.error("Error saving test record:", error);
//         });
//     }
//   }

//   function getQuestionsByCategoryId() {
//     const categoryId = queryParams.get("id");
//     let url = "";
//     switch (categoryId) {
//       case "1":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=1";
//         break;
//       case "2":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=2";
//         break;
//       case "3":
//         url = "https://localhost:7278/Quiz/GetQuiz?categoryId=3";
//         break;
//       default:
//         alert("Unable to find the CategoryID");
//         return;
//     }
//     axios
//       .get(url)
//       .then((response) => {
//         setQuestions(response.data);
//         localStorage.setItem("questions", JSON.stringify(response.data));
//         const ids = response.data.map((question) => question.questionId);
//         localStorage.setItem("questionsIds", JSON.stringify(ids));
//         localStorage.setItem("number", JSON.stringify(1));
//       })
//       .catch((error) => {
//         console.error("Error fetching questions:", error);
//       });
//   }

//   function handleAnswerSelection(selectedIndex) {
//     // debugger;
//     setSelectedOption(selectedIndex);
//     setResetTimer(false);
//   }

//   function handleNext() {
//     const currentQuestion = questions[currentQuestionIndex];
//     const correctAnswerIndex = currentQuestion.answere;
//     const isCorrect = selectedOption === correctAnswerIndex;

//     if (selectedOption === "") {
//       alert("Please select an option before moving to the next question.");
//       return;
//     }

//     if (isCorrect) {
//       setScore(score + 1);
//     }

//     setAnswers([
//       ...answers,
//       {
//         questionId: currentQuestion.questionId,
//         selectedAnswerIndex: selectedOption,
//         isCorrect,
//       },
//     ]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption("");
//       setResetTimer(true);
//     } else {
//       if (!localStorage.getItem("recordSaved")) {
//         // submitAnswers();
//         saveTestRecord();
//         localStorage.setItem("recordSaved", true);
//       }
//       navigate(
//         ROUTES.quizResult.name +
//           "?score=" +
//           (score + (isCorrect ? 1 : 0)) +
//           "&time=" +
//           (Math.floor(Date.now() / 1000) - startTime)
//       );
//       checkCanTakeQuiz();
//     }
//   }

//   function handleTimeout() {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption("");
//       setResetTimer(true);
//     } else {
//       // submitAnswers();
//       saveTestRecord();
//       navigate(
//         ROUTES.quizResult.name +
//           "?score=" +
//           score +
//           "&time=" +
//           (Math.floor(Date.now() / 1000) - startTime)
//       );
//       checkCanTakeQuiz();
//     }
//   }
//   return (
//     <div className="container mt-5">
//       {canTakeQuiz ? (
//         <>
//           <Timer
//             startTime={startTime}
//             onTimeout={handleTimeout}
//             resetTimer={resetTimer}
//           />
//           {questions.length > 0 && (
//             <>
//               <h2>Question {currentQuestionIndex + 1}</h2>
//               <h3>{questions[currentQuestionIndex].questionText}</h3>
//               <ul>
//                 {questions[currentQuestionIndex].options.map(
//                   (option, index) => (
//                     <li
//                       style={{ listStyleType: "none" }}
//                       className="mt-5"
//                       key={index}
//                     >
//                       <input
//                         type="radio"
//                         id={`option-${index}`}
//                         name="options"
//                         value={index}
//                         checked={selectedOption === index}
//                         onChange={() => handleAnswerSelection(index)}
//                       />
//                       <label htmlFor={`option-${index}`}>{option}</label>
//                     </li>
//                   )
//                 )}
//               </ul>
//               <button className="btn btn-primary" onClick={handleNext}>
//                 Next
//               </button>
//             </>
//           )}
//         </>
//       ) : (
//         <div>
//           <h2>
//             You have already given the quiz recently. Please try again after
//             some time
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Quiz;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Timer({ startTime, onTimeout, resetTimer }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (resetTimer) {
      setSeconds(10);
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          onTimeout();
          return 10;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, onTimeout, resetTimer]);

  return <div>Time Left: {seconds} seconds</div>;
}
// const [startTime, setStartTime] = useState(() => {
//   const storedStartTime = localStorage.getItem("startTime");
//   console.log("Stored start time:", storedStartTime);
//   return storedStartTime ? parseInt(storedStartTime, 10) : 0;
// });
function Quiz() {
  const queryParams = useQuery();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore ? parseInt(storedScore, 10) : 0;
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);
  const [startTime, setStartTime] = useState(() => {
    const storedStartTime = localStorage.getItem("startTime");
    return storedStartTime ? parseInt(storedStartTime, 10) : 0;
  });

  // var title = Model.ID != 0 ? "Edit Category" : "New Category";
  // var saveupdate = Model.ID != 0 ? "Update" : "Save";

  useEffect(() => {
    const start = Math.floor(Date.now() / 1000);
    setStartTime(start);
    if (!localStorage.getItem("timeStarted")) {
      JSON.stringify(localStorage.setItem("timeStarted", start));
    }
    const storedQuestionIndex = JSON.parse(
      localStorage.getItem("currentQuestionIndex")
    );
    setCurrentQuestionIndex(
      storedQuestionIndex !== null ? storedQuestionIndex : 0
    );
    checkCanTakeQuiz();
    const num = JSON.parse(localStorage.getItem("number"));
    if (num === 0) {
      getQuestionsByCategoryId();
    } else {
      alert("You are not Allowed to refresh the Page");
      setQuestions(JSON.parse(localStorage.getItem("questions")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
    localStorage.setItem("score", score);
  }, [currentQuestionIndex, score]);

  function saveTestRecord() {
    const endTime = Math.floor(Date.now() / 1000);
    const timeSpent = endTime - JSON.parse(localStorage.getItem("timeStarted"));
    const scoreData = {
      score: score,
      categoryId: JSON.parse(localStorage.getItem("QuizzId")),
      applicationUserID: localStorage.getItem("id"),
      timeSpent: Math.floor(Date.now() / 1000) - startTime,
    };
    axios
      .post("https://localhost:7278/Score/SaveData", scoreData)
      .then((response) => {
        localStorage.removeItem("score");
        localStorage.removeItem("timeStarted");
        console.log("Test record saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving test record:", error);
      });
  }

  function checkCanTakeQuiz() {
    const userId = localStorage.getItem("id");
    const categoryId = queryParams.get("id");
    axios
      .get(
        `https://localhost:7278/Quiz/CanTakeQuiz?userId=${userId}&categoryId=${categoryId}`
      )
      .then((response) => {
        setCanTakeQuiz(response.data.canTakeQuiz);
      })
      .catch((error) => {
        console.error("Error checking quiz eligibility:", error);
      });
  }

  function getQuestionsByCategoryId() {
    const categoryId = queryParams.get("id");
    let url = "";
    switch (categoryId) {
      case "1":
        url = "https://localhost:7278/Quiz/GetQuiz?categoryId=1";
        break;
      case "2":
        url = "https://localhost:7278/Quiz/GetQuiz?categoryId=2";
        break;
      case "3":
        url = "https://localhost:7278/Quiz/GetQuiz?categoryId=3";
        break;
      default:
        alert("Unable to find the CategoryID");
        return;
    }
    axios
      .get(url)
      .then((response) => {
        setQuestions(response.data);
        localStorage.setItem("questions", JSON.stringify(response.data));
        localStorage.setItem("number", JSON.stringify(1));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }

  function handleAnswerSelection(selectedIndex) {
    setSelectedOption(selectedIndex);
    setResetTimer(false);
  }

  function handleNext() {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.answere;
    const isCorrect = selectedOption === correctAnswerIndex;

    if (selectedOption === "") {
      alert("Please select an option before moving to the next question.");
      return;
    }

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const updatedQuestions = questions.filter(
      (_, index) => index !== currentQuestionIndex
    );

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setResetTimer(true);
    } else {
      saveTestRecord();
      navigate(
        ROUTES.quizResult.name +
          "?score=" +
          score +
          "&time=" +
          (Math.floor(Date.now() / 1000) - startTime)
      );
      checkCanTakeQuiz();
    }
  }

  function handleTimeout() {
    const updatedQuestions = questions.filter(
      (_, index) => index !== currentQuestionIndex
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setResetTimer(true);
    } else {
      saveTestRecord();
      navigate(
        ROUTES.quizResult.name +
          "?score=" +
          score +
          "&time=" +
          (Math.floor(Date.now() / 1000) -
            JSON.parse(localStorage.getItem("timeStarted")))
      );
      checkCanTakeQuiz();
    }
  }

  return (
    <div className="container mt-5">
      {canTakeQuiz ? (
        <>
          <Timer
            startTime={startTime}
            onTimeout={handleTimeout}
            resetTimer={resetTimer}
          />
          {questions.length > 0 && (
            <>
              <h3>{questions[currentQuestionIndex].questionText}</h3>
              <ul>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <li
                      style={{ listStyleType: "none" }}
                      className="mt-5"
                      key={index}
                    >
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="options"
                        value={index}
                        checked={selectedOption === index}
                        onChange={() => handleAnswerSelection(index)}
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </li>
                  )
                )}
              </ul>
              <button className="btn btn-primary" onClick={handleNext}>
                {" "}
                Next{" "}
              </button>
            </>
          )}
        </>
      ) : (
        <div>
          <h2>
            {" "}
            You have already given the quiz recently. Please try again after
            some time{" "}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Quiz;
