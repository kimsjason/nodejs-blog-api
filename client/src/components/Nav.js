import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import { ReactComponent as Logo } from "../assets/cubes-solid.svg";
import "../styles/Nav.css";

const Nav = () => {
  const { auth, setAuth } = useContext(authContext);

  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAuth({
          loading: false,
          data: { user: res.user, isAuthenticated: res.isAuthenticated },
        });
        window.location.href = "/";
      });
  };

  return (
    <div>
      <nav>
        <ul className="page-navigation">
          <li className="home">
            <a href="/">
              <Logo className="logo" />
            </a>
          </li>
          <li className="blogs">
            <a href="/blogs">Blogs</a>
          </li>
          <li className="users-link">
            <a href="/users">Users</a>
          </li>
        </ul>
        {auth.data.isAuthenticated ? (
          <ul className="your-account">
            <li className="blog-form">
              <a href="/blogs/blog-form">New Blog</a>
            </li>
            <li className="my-blogs">
              <a href="/blogs/my-blogs">My Blogs</a>
            </li>
            <li className="logout">
              <a href="#" onClick={logout}>
                Log Out
              </a>
            </li>
          </ul>
        ) : (
          <ul className="site-access">
            <li className="login">
              <a href="/login">Log In</a>
            </li>
            <li className="signup">
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
