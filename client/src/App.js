import { useEffect, useState } from "react";
import "./App.css";

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
        });
    };

    fetchUsers();
    fetchBlogs();
  }, []);

  return <div className="App"></div>;
}

export default App;
