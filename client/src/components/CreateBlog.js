import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    author: "",
    text: "",
    published: false,
    comments: [],
  });

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    fetch("http://localhost:9000/blogs/blog", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    });
    event.preventDefault();

    navigate("/blogs");
    window.location.reload();
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

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          type="text"
          name="text"
          onChange={handleInputChange}
          required
        />

        <button id="publish" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
