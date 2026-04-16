import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div style={{ padding: "20px", width: "220px", background: "#f4f4f4", minHeight: "100vh" }}>
      <h2>Admin Panel</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/analytics">Analytics</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;