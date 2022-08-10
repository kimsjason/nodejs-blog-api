import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  const { auth } = useContext(authContext);

  const navigate = useNavigate();

  const deleteBlog = (blog) => {
    fetch(`http://localhost:9000/blogs/blog/${blog}`, {
      method: "DELETE",
    }).catch((err) => console.err(err));
  };

  return (
    <div
      className="blog-card"
      onClick={() => navigate(`/blogs/blog/${blog._id}`)}
    >
      <img src={require("../assets/javascript.png")} alt="blog img" />
      <div className="info">
        {auth.data.user && auth.data.user._id === blog.author._id ? (
          <DeleteIcon
            className="delete-blog"
            onClick={(event) => {
              event.stopPropagation();
              deleteBlog(blog._id);
              navigate(0, {
                state: { blogType: blog.published ? "published" : "drafts" },
              });
            }}
          />
        ) : null}
        <div className="created-at">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="title">{blog.title}</div>
        <div className="author">
          by {`${blog.author.firstName} ${blog.author.lastName}`}
        </div>
        <div className="text">{blog.text.slice(0, 100)}...</div>
        <a href={`/blogs/blog/${blog._id}`} className="read-more">
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
