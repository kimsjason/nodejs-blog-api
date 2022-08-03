import { useEffect } from "react";
import BlogCard from "./BlogCard";
import Masonry from "masonry-layout";
import "../styles/Blogs.css";

const Blogs = ({ blogs }) => {
  useEffect(() => {
    const grid = document.querySelector(".section-blogs .blogs");
    new Masonry(grid, {
      gutter: 25,
      fitWidth: true,
    });
  });

  return (
    <div className="section-blogs">
      <h1>Blogs</h1>
      <div className="blogs">
        {blogs.map((blog) => {
          return <BlogCard key={blog._id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Blogs;
