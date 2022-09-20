import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import "../styles/BlogForm.css";

const CreateBlog = () => {
  const { auth } = useContext(authContext);
  const id = useParams().id;

  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    author: auth.data.user._id,
    text: "",
    published: false,
    image: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    // if id exists in url parameters, user edits an existing blog
    // otherwise, user creates a new blog
    if (id) {
      fetch(`http://localhost:9000/blogs/blog/${id}`)
        .then((res) => res.json())
        .then((res) => {
          const blog = res.blog;
          if (blog.author._id !== auth.data.user._id) {
            navigate(`/blogs/blog/${id}`);
          }
          setInput({
            title: blog.title,
            author: blog.author._id,
            text: blog.text,
            published: blog.published,
            image: blog.image,
          });
        });
    }
  }, []);

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleButtonClick = (event) => {
    event.target.id === "publish"
      ? setInput({ ...input, published: true })
      : setInput({ ...input, published: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();

    for (let key in input) {
      form.append(key, input[key]);
    }

    fetch(`http://localhost:9000/blogs/blog/${id ? id : ""}`, {
      method: id ? "PUT" : "POST",
      body: form,
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

  const generateBlog = (prompt) => {
    fetch(`http://localhost:9000/blogs/openai-blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((res) => res.json())
      .then((res) => setInput({ ...input, text: res.text }));
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
    <div className="blog-form">
      <h1>{id ? "Edit Blog" : "New Blog"}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Write a descriptive title..."
          value={input.title}
          onChange={handleInputChange}
          required
        />

        {errorMessages && <div className="errors">{getErrors("title")}</div>}

        <div className="generate-blog">
          <div
            className="toggle-tips"
            onClick={() =>
              document
                .querySelector(".generate-blog .tips")
                .classList.toggle("hidden")
            }
          >
            Blog Generation Tips
          </div>
          <div className="tips hidden">
            <ul>
              <li>
                Writing a more descriptive title will typically generate a
                longer and more interesting blog. You can always edit the title
                or blog text afterward.
              </li>
              <li>
                It may take a few seconds for the blog to load in the textbox.
              </li>
              <li>
                Clicking "Generate Blog" will overwrite any blog text, including
                previously auto-generated text. Make sure to save your work.
              </li>
            </ul>
          </div>

          <button
            onClick={(event) => {
              generateBlog(input.title);
            }}
            type="button"
          >
            Generate Blog
          </button>
        </div>
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          type="text"
          name="text"
          placeholder="Your blog goes here..."
          value={input.text}
          onChange={handleInputChange}
          required
        />

        {errorMessages && <div className="errors">{getErrors("text")}</div>}

        <label htmlFor="image-upload">Upload Image</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          required
        />

        <div className="buttons">
          <button id="save" type="submit" onClick={handleButtonClick}>
            Save
          </button>
          <button id="publish" onClick={handleButtonClick} type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
