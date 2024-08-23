import React, { useState } from "react";
import validator from "validator";
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './App.css';
import "@fontsource/poppins";
const App = () => {
  const [mssg, setMssg] = useState("");
  const [color, setColor] = useState("");
  const [emailValid, setEmailValid] = useState(null); // State to track email validity
  const [password, setPassword] = useState(""); // State to manage password input

  const checkMail = (event) => {
    const valueMail = event.target.value;
    if (validator.isEmail(valueMail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const checkPass = (event) => {
    const value = event.target.value;
    setPassword(value); // Update password state

    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setMssg("Strong ");
      setColor("green");
    } else if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setMssg("Fair ");
      setColor("gold");
    } else {
      setMssg("Weak ");
      setColor("red");
    }
  };

  return (
    <>
      <div className="container">
        <h1>🔑Pass-Check</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="email....."
            className="email"
            onChange={checkMail}
            style={{ paddingRight: "50px" }} // Add padding to avoid text overlap with icon
          />
          {emailValid !== null && (
            <span style={{ position: "absolute", right: "15px", top: "55%", transform: "translateY(-50%)" }}>
              {emailValid ? (
                <DoneOutlineRoundedIcon style={{ color: "green" }} />
              ) : (
                <CloseRoundedIcon style={{ color: "red" }} />
              )}
            </span>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="password....."
            className="password"
            value={password} // Set the value of the input field
            onChange={checkPass}
            style={{ paddingRight: "78px" }} // Add padding to avoid text overlap with icon
          />
          <span
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: color
            }}
          >
            {mssg}
          </span>
        </div>
      </div>
    </>
  );
};

export default App;
