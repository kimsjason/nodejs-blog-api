import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    fetch("http://localhost:9000/users/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setErrorMessages(res.errors);
        } else {
          navigate("/login");
        }
      });

    event.preventDefault();
  };

  // filter for field specific validation errors
  const getErrors = (inputName) => {
    return errorMessages
      .filter((errorMessage) => errorMessage.param === inputName)
      .map((errorMessage) => {
        return (
          <div key={errorMessage.msg} className="error">
            {errorMessage.msg}
          </div>
        );
      });
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          name="firstName"
          onChange={handleInputChange}
          required
        />
        {errorMessages && (
          <div className="errors">{getErrors("firstName")}</div>
        )}

        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          name="lastName"
          onChange={handleInputChange}
          required
        />
        {errorMessages && <div className="errors">{getErrors("lastName")}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleInputChange}
          required
        />
        {errorMessages && <div className="errors">{getErrors("email")}</div>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleInputChange}
          required
        />
        {errorMessages && <div className="errors">{getErrors("username")}</div>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        />
        {errorMessages && <div className="errors">{getErrors("password")}</div>}

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          required
        />
        {errorMessages && (
          <div className="errors">{getErrors("confirmPassword")}</div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
