import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("interviewflowUser");
    navigate("/");
  };

  return (
    <aside className="app-sidebar">

      {/* LOGO */}
      <div className="app-sidebar-logo">
        InterviewFlow
      </div>

      {/* MAIN MENU */}
      <nav className="app-sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">▦</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/interviews"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">▤</span>
          <span>Interviews</span>
        </NavLink>

        <NavLink
          to="/preparation"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">◉</span>
          <span>Preparation</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">↗</span>
          <span>Progress</span>
        </NavLink>

      </nav>

      {/* BOTTOM MENU */}
      <div className="app-sidebar-bottom">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">↪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;