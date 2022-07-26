import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

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
    fetchUsers();
  }, []);

  return <div className="App"></div>;
}

export default App;
