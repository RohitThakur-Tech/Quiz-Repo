import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7278/api/Authentication/login",
        form
      );
      const { role, id } = response.data;
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);
      navigate(ROUTES.home.name);
    } catch (error) {
      alert("Wrong Username/Password");
    }
  };
  return (
    <div>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-info text-white">
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Login Form</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your Information!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="userName"
                        id="typeNameX"
                        class="form-control form-control-lg"
                        name="userName"
                        onChange={onChangeHandler}
                      />
                      <label class="form-label" for="typeNameX">
                        UserName
                      </label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password"
                        class="form-control form-control-lg"
                        onChange={onChangeHandler}
                      />
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <p class="mb-0">
                      Don't have account Yet?{" "}
                      <button
                        onClick={() => {
                          navigate(ROUTES.register.name);
                        }}
                        class="text-dark-50 fw-bold btn btn-success"
                      >
                        Sign Up
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

export default Login;
