import { useEffect, useState } from "react";
import { getTimeAgo } from "../helpers/helper";
import "../styles/Comment.css";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9000/users/user/${comment.author}`)
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);

  return (
    <div className="comment">
      <div className="user">
        <img
          src={`/avatars/${user.avatar}`}
          className="avatar"
          alt="user avatar"
        />
        <a href={`/users/user/${user._id}`}>
          <p className="user">{user.username}</p>
        </a>
      </div>
      <div className="text"> {comment.text}</div>
      <div className="created-at">{getTimeAgo(comment.createdAt)}</div>
    </div>
  );
};

export default Comment;
