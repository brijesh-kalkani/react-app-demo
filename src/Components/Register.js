import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setState = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    console.log(registerData);
  };

  const registerUser = () => {
    axios
      .post(
        "http://restapi.adequateshop.com/api/authaccount/registration",
        registerData
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="w-100vw h-100vh d-f a-i-c j-c-c">
      <Box
        sx={{
          width: 400,
          height: 600,
          padding: 5,
          backgroundColor: "#f2f2f2",
        }}
      >
        <h1 className="t-a-c m-b-8rem pri-col">Register</h1>
        <div className="m-b-1rem">
          <TextField
            className="w-100"
            label="Username"
            variant="filled"
            name="name"
            onChange={(e) => setState(e)}
          />
        </div>
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
          <Button variant="outlined" onClick={registerUser}>
            Register
          </Button>
        </div>
        {/* color="warning" color="secondary"  color="success"*/}
        <div className="m-t-3rem">
          <Link href="/login">If alredy have account</Link>
        </div>
      </Box>
    </div>
  );
}
