import { useNavigate } from "react-router-dom";
import { getTimeAgo } from "../helpers/helper";
import "../styles/BlogQuickview.css";

const BlogQuickview = ({ blog }) => {
  const navigate = useNavigate();

  const timeAgo = getTimeAgo(blog.createdAt);

  return (
    <div
      className="blog-quickview"
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/blogs/blog/${blog._id}`);
      }}
    >
      <p className="date-posted">{timeAgo}</p>
      <p className="title">
        {blog.title.length > 25 ? blog.title.slice(0, 20) + "..." : blog.title}
      </p>
      <p className="text">{blog.text.slice(0, 50)}...</p>
    </div>
  );
};

export default BlogQuickview;
