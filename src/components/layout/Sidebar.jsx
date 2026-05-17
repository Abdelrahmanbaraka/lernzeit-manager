import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBullseye,
  FaCalendarAlt,
  FaChartBar,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2>Lernzeit</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/goals" className="nav-item">
          <FaBullseye />
          <span>Ziele</span>
        </NavLink>

        <NavLink to="/planning" className="nav-item">
          <FaCalendarAlt />
          <span>Lernplan</span>
        </NavLink>

        <NavLink to="/progress" className="nav-item">
          <FaChartBar />
          <span>Fortschritt</span>
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          <FaUser />
          <span>Profil</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;