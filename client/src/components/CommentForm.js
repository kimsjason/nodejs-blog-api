import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import "../styles/CommentForm.css";

const CommentForm = ({ blog }) => {
  const { auth } = useContext(authContext);
  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const newComment = {
      blog: blog._id,
      author: auth.data.user._id,
      text: comment,
    };

    fetch(`http://localhost:9000/blogs/blog/${blog._id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="comment-form" onSubmit={handleSubmitComment}>
      <form>
        <div className="user">
          <img
            src={`http://localhost:9000/avatars/${auth.data.user.avatar}`}
            className="avatar"
            alt="user avatar"
          />
          <a href={`/users/user/${auth.data.user._id}`}>
            {auth.data.user.username}
          </a>
        </div>
        <textarea
          className="comment-text"
          name="comment"
          placeholder="Leave a comment..."
          onChange={handleInputChange}
        />
        <div className="buttons">
          <button
            id="cancel"
            type="button"
            onClick={() => {
              document.querySelector(".comment-form form").reset();
            }}
          >
            Cancel
          </button>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
