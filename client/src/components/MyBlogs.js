import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import Masonry from "masonry-layout";
import BlogCard from "./BlogCard";
import "../styles/MyBlogs.css";

const MyBlogs = () => {
  const { auth } = useContext(authContext);
  const [myBlogs, setMyBlogs] = useState({ published: [], drafts: [] });
  const [blogType, setBlogType] = useState("published");

  useEffect(() => {
    const grid = document.querySelector(".my-blogs .blogs");

    grid &&
      new Masonry(grid, {
        gutter: 25,
        fitWidth: true,
      });
  });

  useEffect(() => {
    // fetch user's blogs from database
    const fetchMyBlogs = async () => {
      await fetch(`/api/blogs/user/${auth.data.user._id}`)
        .then((res) => res.json())
        .then((res) => {
          setMyBlogs({
            published: res.blogs.filter((blog) => blog.published === true),
            drafts: res.blogs.filter((blog) => blog.published === false),
          });
        })

        .catch((err) => console.error("Error: ", err));
    };

    fetchMyBlogs();
  }, []);

  return (
    <div className="my-blogs">
      <h1>My Blogs</h1>
      <div className="blog-type">
        <div
          style={
            blogType === "published"
              ? {
                  background: "#eee",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  pointerEvents: "none",
                }
              : null
          }
          className="published"
          onClick={() => {
            setBlogType("published");
          }}
        >
          Published
        </div>
        <div
          style={
            blogType === "drafts"
              ? {
                  background: "#eee",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  pointerEvents: "none",
                }
              : null
          }
          className="drafts"
          onClick={() => {
            setBlogType("drafts");
          }}
        >
          Drafts
        </div>
      </div>
      {myBlogs[blogType].length ? (
        <div className="blogs">
          {myBlogs[blogType].map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p>
          No blogs to show. Create a <a href="/blogs/blog-form">new blog</a>.
        </p>
      )}
    </div>
  );
};

export default MyBlogs;
