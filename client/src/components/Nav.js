import "../styles/Nav.css";
import { ReactComponent as Logo } from "../assets/cubes-solid.svg";

const Nav = () => {
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
        <ul className="site-access">
          <li className="login">
            <a href="/login">Log In</a>
          </li>
          <li className="signup">
            <a href="/signup">Sign Up</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
