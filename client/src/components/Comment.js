import { useContext, useEffect, useState } from "react";
import { decodeHTML, getTimeAgo } from "../helpers/helper";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import "../styles/Comment.css";
import { authContext } from "../contexts/AuthContext";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  const { auth } = useContext(authContext);

  useEffect(() => {
    fetch(`http://localhost:9000/users/user/${comment.author}`)
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);

  const deleteComment = (blog, comment) => {
    fetch(`http://localhost:9000/blogs/blog/${blog}/comment/${comment}`, {
      method: "DELETE",
    }).catch((err) => console.err(err));
  };

  return (
    <div className="comment">
      {auth.data.user && auth.data.user._id === comment.author ? (
        <DeleteIcon
          className="delete-comment"
          onClick={(event) => {
            event.stopPropagation();
            deleteComment(comment.blog, comment._id);
            window.location.reload();
          }}
        />
      ) : null}
      <div className="user">
        <img
          src={`http://localhost:9000/avatars/${user.avatar}`}
          className="avatar"
          alt="user avatar"
        />
        <a href={`/users/user/${user._id}`}>
          <p className="user">{user.username}</p>
        </a>
      </div>
      <div className="text"> {decodeHTML(comment.text)}</div>
      <div className="created-at">{getTimeAgo(comment.createdAt)}</div>
    </div>
  );
};

export default Comment;
