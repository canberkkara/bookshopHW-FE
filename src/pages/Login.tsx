import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginButtonClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/users");
    if (response.ok) {
      const credentials = await response.json();
      const user = credentials.find(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      );
      if (user) {
        navigate("/anasayfa", { state: username });
      } else {
        alert("Invalid email or password.");
      }
    } else {
      console.error("Failed to fetch user credentials.");
    }

    //navigate('/anasayfa', { state: username });
  };

  const onSignUpButtonClick = async (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.fname !== "" &&
      formData.lname !== "" &&
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      const response = await fetch("http://localhost:8080/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User added successfully!");
        alert("E-mail registered!");
        setUsername("");
        setPassword("");
        setFormData({
          email: "",
          password: "",
          fname: "",
          lname: "",
          username: "",
        });
      } else {
        console.error("Failed to add user.");
        alert("Couldn't register!");
      }
    } else alert("Fill the form!");
    const isValidPassword = passwordValidation.every(
      (criteria) => criteria.isValid
    );

    // if (!isValidPassword) {
    //   alert("Password does not meet the requirements.");
    //   return;
    // } else navigate("/anasayfa", { state: username });
  };

  interface PasswordValidationCriteria {
    label: string;
    isValid: boolean;
  }

  const [passwordValidation, setPasswordValidation] = useState<
    PasswordValidationCriteria[]
  >([
    { label: "Must contain at least 1 uppercase letter", isValid: false },
    { label: "Must contain at least 1 lowercase letter", isValid: false },
    {
      label: "Must contain at least 1 special character (! @ # $ % ^ & *)",
      isValid: false,
    },
    { label: "Must be at least 8 characters", isValid: false },
  ]);

  const validatePassword = (password: string) => {
    const updatedPasswordValidation = passwordValidation.map((criteria) => {
      switch (criteria.label) {
        case "Must contain at least 1 uppercase letter":
          criteria.isValid = /[A-Z]/.test(password);
          break;
        case "Must contain at least 1 lowercase letter":
          criteria.isValid = /[a-z]/.test(password);
          break;
        case "Must contain at least 1 special character (! @ # $ % ^ & *)":
          criteria.isValid = /[!@#$%^&*]/.test(password);
          break;
        case "Must be at least 8 characters":
          criteria.isValid = password.length >= 8;
          break;
        default:
          break;
      }
      return criteria;
    });

    setPasswordValidation(updatedPasswordValidation);
  };

  return (
    <div className="loginPage">
      <div className="topBar">
        <img src="/src/assets/KitAppLogo.png" alt="Icon" className="icon" />
        <h1>KitApp</h1>
      </div>
      <div className="loginGrid">
        <form className="loginSide" onSubmit={onLoginButtonClick}>
          <h2>Login</h2>
          <div className="shortInputLogin">
            <input
              value={username}
              type="text"
              className="loginInput"
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
              required
            />
          </div>
          <div className="shortInputLogin">
            <input
              value={password}
              type="password"
              className="loginInput"
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginButton">
            Log in
          </button>
        </form>
        <form className="signupSide" onSubmit={onSignUpButtonClick}>
          <h2>Sign Up</h2>
          <div className="shortInputSignUp">
            <input
              value={formData.fname}
              type="text"
              name="fname"
              className="loginInputShort"
              placeholder="Your first name"
              onChange={handleChange}
              required
            />
            <input
              value={formData.lname}
              type="text"
              name="lname"
              className="loginInputShort"
              placeholder="Your last name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            value={formData.username}
            type="text"
            name="username"
            className="loginInput"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            value={formData.email}
            type="email"
            name="email"
            className="loginInput"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
          <input
            value={formData.password}
            type="password"
            name="password"
            className="loginInput"
            placeholder="Pick a password"
            onChange={handleChange}
            required
          />
          <div>
            <ul className="passwordCriteria">
              {passwordValidation.map((criteria, index) => (
                <li
                  key={index}
                  className={
                    criteria.isValid ? "text-green-500" : "text-gray-400"
                  }
                >
                  {criteria.isValid ? (
                    <span>&#10003;&nbsp;</span>
                  ) : (
                    <span>&#8226;&nbsp;</span>
                  )}
                  {criteria.label}
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="signUpButton">
            Sign up for KitApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
