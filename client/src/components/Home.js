import { ReactComponent as Logo } from "../assets/cubes-solid.svg";
import BlogCard from "./BlogCard";
import "../styles/Home.css";

const Home = ({ blogs }) => {
  const handleScrollDown = () => {
    document
      .querySelector(".highlights")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      <div className="brand" onClick={handleScrollDown}>
        <Logo className="logo" />
        <h1>Building Blogs</h1>
      </div>
      <div className="highlights">
        <div className="featured-blogs">
          <h2>Featured Blogs</h2>
          <div className="blogs">
            {blogs.slice(0, 3).map((blog) => {
              return <BlogCard key={blog._id} blog={blog} />;
            })}
          </div>
        </div>
      </div>

      <div className="actions">
        <div className="start-reading">
          <h2>Start reading.</h2>
          <p>
            Explore the endless possibilities. See what your favorite bloggers
            have to say.
          </p>
          <div className="buttons">
            <a href="/blogs" className="users-link button">
              All Blogs
            </a>
            <a href="/users" className="users-link button">
              All Bloggers
            </a>
          </div>
        </div>
        <div className="start-writing">
          <h2>Start writing.</h2>
          <p>Write and publish your blog within seconds.</p>
          <a href="/blogs/create-blog" className="blog-generator button">
            Blog Generator
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
