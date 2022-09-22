import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { decodeHTML, publishBlog } from "../helpers/helper";
import "../styles/BlogCard.css";

const BlogCard = ({ blog }) => {
  const { auth } = useContext(authContext);

  const navigate = useNavigate();

  const deleteBlog = (blog) => {
    fetch(`/api/blogs/blog/${blog}`, {
      method: "DELETE",
    }).catch((err) => console.err(err));
  };

  return (
    <div
      className="blog-card"
      onClick={() => navigate(`/blogs/blog/${blog._id}`)}
    >
      <div className="image-container">
        <img
          src={`https://building-blogs.s3.amazonaws.com/images/${blog.image}`}
          alt="blog img"
        />
        {auth.data.user && auth.data.user._id === blog.author._id ? (
          <div className="buttons">
            <button
              className="edit-blog"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/blogs/edit-blog/${blog._id}`);
              }}
            >
              Edit Blog
            </button>
            <button
              className={blog.published ? "unpublish" : "publish"}
              onClick={(event) => {
                event.stopPropagation();
                publishBlog(blog);
                navigate(`/blogs/blog/${blog._id}`);
              }}
            >
              {blog.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        ) : null}
      </div>

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
        <div className="title">{decodeHTML(blog.title)}</div>
        <div className="author">by {`${blog.author.username}`}</div>
        <div className="text">{decodeHTML(blog.text.slice(0, 100))}...</div>
        <a href={`/blogs/blog/${blog._id}`} className="read-more">
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
