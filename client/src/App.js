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
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";
import User from "./components/User";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch blogs from database
    const fetchBlogs = async () => {
      await fetch("/api/blogs")
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
            path="/blogs/blog-form"
            element={
              <PrivateRoute>
                <BlogForm />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/edit-blog/:id"
            element={
              <PrivateRoute>
                <BlogForm />
              </PrivateRoute>
            }
          />
          <Route path="/users" element={<Users blogs={blogs} />} />
          <Route path="/users/user/:id" element={<User blogs={blogs} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
