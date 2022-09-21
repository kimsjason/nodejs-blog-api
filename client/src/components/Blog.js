import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import "../styles/Blog.css";
import { decodeHTML } from "../helpers/helper";

const Blog = () => {
  const blogID = useParams().id;
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    image: "",
    text: "",
    published: "",
    comments: [],
  });

  useEffect(() => {
    // fetch blog from database
    const fetchBlog = async () => {
      await fetch(`/api/blogs/blog/${blogID}`)
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
      <p className="author">
        by{" "}
        <Link
          to={`/users/user/${blog.author._id}`}
        >{`${blog.author.firstName} ${blog.author.lastName}`}</Link>
      </p>
      <h1 className="title">{decodeHTML(blog.title)}</h1>
      <img
        src={`/api/images/${blog.image}`}
        className="main-image"
        alt="main blog img"
      />
      <div className="text">{decodeHTML(blog.text)}</div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
