import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Blog.css";

const Blog = () => {
  const blogID = useParams().id;
  const [blog, setBlog] = useState({});

  useEffect(() => {
    // fetch blog from database
    const fetchBlog = async () => {
      await fetch(`http://localhost:9000/blogs/blog/${blogID}`)
        .then((res) => res.json())
        .then((res) => setBlog(res.blog))
        .catch((err) => console.error("Error: ", err));
    };

    fetchBlog();
  }, []);

  return (
    <div className="blog">
      <p className="publish-date">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="author">by {blog.author}</p>
      <h1>{blog.title}</h1>
      <div className="text">{blog.text}</div>
    </div>
  );
};

export default Blog;
