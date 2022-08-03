import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Blogs from "./components/Blogs";

function App() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch users from database
    const fetchUsers = async () => {
      await fetch("http://localhost:9000/users")
        .then((res) => res.json())
        .then((res) => {
          const users = res.users;
          setUsers(users);
        })
        .catch((err) => console.error("Error: ", err));
    };

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

    fetchUsers();
    fetchBlogs();
  }, []);

  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path={"/blogs"} element={<Blogs blogs={blogs} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
