import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const CreateBlog = () => {
  const { auth } = useContext(authContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    author: auth.data.user._id,
    text: "",
    published: false,
    comments: [],
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:9000/blogs/blog", {
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
          navigate("/blogs", { replace: true });
          window.location.reload();
        }
      });
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
    <div className="create-blog">
      <h1>New Blog</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={handleInputChange}
          required
        />

        {errorMessages && <div className="errors">{getErrors("title")}</div>}

        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          type="text"
          name="text"
          onChange={handleInputChange}
          required
        />

        {errorMessages && <div className="errors">{getErrors("text")}</div>}

        <button id="publish" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
