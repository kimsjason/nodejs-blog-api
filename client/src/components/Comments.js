import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../styles/Comments.css";
import { authContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Comments = ({ blog }) => {
  const { auth } = useContext(authContext);

  return (
    <div className="blog-comments">
      <h2>Comments</h2>

      {auth.data.isAuthenticated ? (
        <CommentForm blog={blog} />
      ) : (
        <p className="log-in">
          <a href="/login">Log in</a> to leave a comment.
        </p>
      )}
      <div className="comments">
        {blog.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
