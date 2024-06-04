import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function RegisterUser() {
    try {
      debugger;
      axios
        .post("https://localhost:7278/api/Authentication/register", form)
        .then((response) => {
          alert(response.data.message);
          navigate(ROUTES.login.name);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(`Server error: ${error.response.data.message}`);
          } else if (error.request) {
            alert("No response received from the server");
          } else {
            alert(`Error: ${error.message}`);
          }
        });
    } catch (error) {
      alert("Unable to register user");
    }
  }

  function onUserSubmit() {
    let errors = false;
    let error = {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
    if (form.userName.trim().length == 0) {
      errors = true;
      error = { ...error, userName: "Enter your user name" };
    }
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Enter your email id" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Enter your password" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      RegisterUser();
    }
  }
  return (
    <div>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-info text-white">
                <div class="card-body p-5 text-center">
                  <div class=" mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">
                      Registration Form
                    </h2>
                    <p class="text-white-50 mb-5">
                      Please enter your Information!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="userName"
                        id="typeNameX"
                        class="form-control form-control-lg"
                        name="userName"
                        onChange={changeHandler}
                      />
                      <p className="text-danger">{formError.userName}</p>
                      <label class="form-label" for="typeNameX">
                        UserName
                      </label>
                    </div>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        name="email"
                        class="form-control form-control-lg"
                        onChange={changeHandler}
                      />
                      <p className="text-danger">{formError.email}</p>
                      <label class="form-label" for="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password"
                        class="form-control form-control-lg"
                        onChange={changeHandler}
                      />
                      <p className="text-danger">{formError.password}</p>
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={onUserSubmit}
                    >
                      Register
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      navigate(ROUTES.home.name);
                    }}
                    class="text-dark-50 fw-bold btn btn-warning mb-3 "
                  >
                    Go to HomePage
                  </button>
                  <div>
                    <p class="mb-0">
                      Already have an account ?{" "}
                      <button
                        onClick={() => {
                          navigate(ROUTES.login.name);
                        }}
                        class="text-dark-50 fw-bold btn btn-success"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
