import Masonry from "masonry-layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/User.css";
import BlogCard from "./BlogCard";

const User = ({ blogs }) => {
  const userID = useParams().id;
  const [user, setUser] = useState({});
  const usersBlogs = blogs.filter((blog) => blog.author._id === userID);

  useEffect(() => {
    const grid = document.querySelector(".user .blogs");

    grid &&
      new Masonry(grid, {
        gutter: 25,
        fitWidth: true,
      });
  });

  useEffect(() => {
    const fetchUser = () => {
      fetch(`http://localhost:9000/users/user/${userID}`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => setUser(res.user));
    };

    fetchUser();
  }, []);

  return (
    <div className="user">
      <div className="info">
        <img
          src={`/avatars/${user.avatar}`}
          className="user-avatar"
          alt="user avatar"
        />
        <h2>{user.username}</h2>
      </div>
      <div className="user-blogs">
        <h1>Blogs</h1>
        <div className="blogs">
          {usersBlogs.length ? (
            usersBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p>This user has not published any blogs.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default User;
