import { useNavigate } from "react-router-dom";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      className="blog-card"
      onClick={() => navigate(`/blogs/blog/${blog._id}`)}
    >
      <img src={require("../assets/javascript.png")} alt="blog img" />
      <div className="info">
        <div className="created-at">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="title">{blog.title}</div>
        <div className="author">
          by {`${blog.author.firstName} ${blog.author.lastName}`}
        </div>
        <div className="text">{blog.text.slice(0, 250)}...</div>
        <a href={`/blogs/blog/${blog._id}`} className="read-more">
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
