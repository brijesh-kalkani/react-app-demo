import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const setState = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    console.log(registerData);
  };

  const loginUser = () => {
    axios
      .post(
        "http://restapi.adequateshop.com/api/authaccount/login",
        registerData
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data.Token, res.data.data.Email);
        localStorage.setItem("token", res.data.data.Token);
        localStorage.setItem("email", res.data.data.Email);
        navigate("/dashboard");
      });
  };

  return (
    <div className="w-100vw h-100vh d-f a-i-c j-c-c">
      <Box
        sx={{
          width: 400,
          height: 500,
          padding: 5,
          backgroundColor: "#f2f2f2",
        }}
      >
        <h1 className="t-a-c m-b-8rem pri-col">Login</h1>
        <div className="m-b-1rem">
          <TextField
            className="w-100"
            label="Emai"
            variant="filled"
            name="email"
            onChange={(e) => setState(e)}
          />
        </div>
        <div className="m-b-1rem">
          <TextField
            className="w-100"
            label="Password"
            variant="filled"
            name="password"
            onChange={(e) => setState(e)}
          />
        </div>
        <div className="m-t-4rem t-a-c">
          <Button variant="outlined" onClick={loginUser}>
            Login
          </Button>
        </div>
        {/* color="warning" color="secondary"  color="success"*/}
        <div className="m-t-2rem">
          <Link href="/register">If you don't have account</Link>
        </div>
      </Box>
    </div>
  );
}

export default Login;
