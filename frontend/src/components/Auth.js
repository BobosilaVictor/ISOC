import React, { useState } from "react"
import { useNavigate } from "react-router";
import { setToken, fetchToken } from "../Helper";
import axios from "axios";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [first_name, setFirstName] = useState("")
  let [last_name, setLastName] = useState("")
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  const handleSubmit = event => {
    event.preventDefault();
  
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": email,
      "password_hash": password,
      'first_name': first_name,
      'last_name': last_name
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

  
    fetch("http://44.204.42.126:8080/api/v1/users", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


  };
  
  const handleSignIN = event => {
    console.log('handleSubmit ran');
    event.preventDefault();
    console.log(process.env.REAC_APP_URL)
  
    setEmail('');
    setPassword('');

    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'password': password,
      'username': email 
    });
    var config = {
      method: 'post',
      url: 'http://44.204.42.126:8080/api/v1/users/login',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      if (response.data.access_token) {
        setToken(response.data.access_token);
        navigate("/redirect");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSignIN}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="First Name"
              onChange={event => setFirstName(event.target.value)}
              value={first_name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Last Name"
              onChange={event => setLastName(event.target.value)}
              value={last_name}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
