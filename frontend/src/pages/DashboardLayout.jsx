// import { useMsal } from "@azure/msal-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/DashboardLayout.css";

export default function DashboardLayout() {
  const location = useLocation();
  // const { instance } = useMsal();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // instance.logoutRedirect().catch(err => console.error(err));
    navigate("/");
  };

  const navItems = [
    {
      path: "/dashboard/profile",
      label: "Perfil",
      icon: "bi bi-person",
      iconActive: "bi bi-person-fill"
    },
    {
      path: "/dashboard/questionnaires",
      label: "Cuestionarios",
      icon: "bi bi-clipboard2-pulse",
      iconActive: "bi bi-clipboard2-pulse-fill"
    },
    {
      path: "/dashboard/chatbot",
      label: "Chatbot",
      icon: "bi bi-chat-left-dots",
      iconActive: "bi bi-chat-left-dots-fill"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="header-icon">❤</div>
          <div className="titulo">
            <h1 className="header-title">Portal del Paciente</h1>
            <p className="header-subtitle">Sistema de Gestión de Salud</p>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Cerrar sesión
        </button>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/dashboard" &&
              item.path === "/dashboard/profile");

          return (
            <Link key={item.path} to={item.path} className="nav-link">
              <button className={`nav-button ${isActive ? "active" : ""}`} >
                <i className={isActive ? item.iconActive : item.icon}></i>
                {item.label}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
