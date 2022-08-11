import { useNavigate } from "react-router-dom";
import BlogQuickview from "./BlogQuickview";
import "../styles/UserCard.css";

const UserCard = ({ user, blogs }) => {
  const navigate = useNavigate();

  const userBlogs = blogs.filter((blog) => blog.author._id === user._id);

  return (
    <div
      className="user-card"
      onClick={() => navigate(`/users/user/${user._id}`)}
    >
      <div className="profile">
        <img src="#" className="profile-avatar" alt="profile avatar" />
        <div className="info">
          <div className="username">{user.username}</div>
        </div>
      </div>
      <span className="divider"></span>
      <div className="recent-activity">
        <h4>Recent Activity</h4>
        <div className="blog-posts">
          <h5>Blog Posts</h5>
          <div className="blogs">
            {userBlogs.length ? (
              userBlogs
                .slice(0, 2)
                .map((blog) => <BlogQuickview key={blog._id} blog={blog} />)
            ) : (
              <p>This user has not published any blogs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
