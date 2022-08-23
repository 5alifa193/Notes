import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Login() {
  const [responceMessage, setMessage] = useState("");
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  function sendLoginData(eve) {
    let newData = { ...userData };

    newData[eve.target.id] = eve.target.value;
    setData(newData);
  }

  async function postData(eve) {
    eve.preventDefault();
    let responce = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      userData
    );

    if (responce.data.message === "success") {
      setMessage("");
      navigateToHome();
      localStorage.setItem("user", responce.data.token);
      let userID = jwtDecode(responce.data.token);
      localStorage.setItem("id", userID._id);
    } else {
      setMessage(responce.data.message);
    }
  }

  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }

  return (
    <>
      <div className="container">
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <form action="" type="submit" className="col-md-6">
            <div className="row gy-3">
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                id="email"
                onChange={(eve) => {
                  sendLoginData(eve);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                onChange={(eve) => {
                  sendLoginData(eve);
                }}
              />
              <p className="text-danger">{responceMessage}</p>
              <button
                type="submit"
                className="my-btn w-100 p-2 btn btn-outline-info"
                onClick={(eve) => {
                  postData(eve);
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
