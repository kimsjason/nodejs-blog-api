import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Masonry from "masonry-layout";
import "../styles/Users.css";

const Users = ({ blogs }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const grid = document.querySelector(".users");
    new Masonry(grid, {
      gutter: 25,
      fitWidth: true,
    });
  });

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

  return (
    <div className="section-users">
      <h1>Users</h1>
      <div className="users">
        {users &&
          users.map((user) => {
            return <UserCard key={user._id} user={user} blogs={blogs} />;
          })}
      </div>
    </div>
  );
};

export default Users;
