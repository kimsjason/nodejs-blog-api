import { ReactComponent as Logo } from "../assets/cubes-solid.svg";
import "../styles/Nav.css";

const Nav = () => {
  // const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  const logout = () => {
    fetch("http://localhost:9000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("isAuthenticated", res.isAuthenticated);
        // redirect to home page
        window.location.href = "http://localhost:3000/";
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
          <li className="bloggers">
            <a href="/bloggers">Bloggers</a>
          </li>
        </ul>
        {isAuthenticated ? (
          <ul className="your-account">
            <li className="create-blog">
              <a href="/blogs/create-blog">Create Blog</a>
            </li>
            <li className="your-blogs">
              <a href="/blogs/create-blog">My Blogs</a>
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
