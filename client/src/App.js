import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import MyBlogs from "./components/MyBlogs";
import CreateBlog from "./components/CreateBlog";
import Users from "./components/Users";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch blogs from database
    const fetchBlogs = async () => {
      await fetch("http://localhost:9000/blogs")
        .then((res) => res.json())
        .then((res) => {
          const blogs = res.blogs;
          setBlogs(blogs);
        })
        .catch((err) => console.error("Error: ", err));
    };

    fetchBlogs();
  }, []);

  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs blogs={blogs} />} />
          <Route path="/blogs/blog/:id" element={<Blog blogs={blogs} />} />
          <Route
            path="/blogs/my-blogs"
            element={
              <PrivateRoute>
                <MyBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route path="/users" element={<Users blogs={blogs} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
