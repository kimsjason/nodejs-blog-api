import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  const [input, setInput] = useState({});
  const [errorMessages, setErrorMessages] = useState("");

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        const isAuthenticated = res.isAuthenticated;
        // login successful - redirect to home page
        if (isAuthenticated) {
          setAuth({
            loading: false,
            data: { user: res.user, isAuthenticated: res.isAuthenticated },
          });
          navigate("/", { replace: true });
        } else {
          setErrorMessages(res.error);
        }
      });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {errorMessages && <div className="errors">{errorMessages}</div>}
    </div>
  );
};

export default Login;
