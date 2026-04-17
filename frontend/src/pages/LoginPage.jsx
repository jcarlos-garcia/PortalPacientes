import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const { instance } = useMsal();
  
  const handleMicrosoftLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login redirect error", error);
    }
  };
 
  return (
    <div className="cuerpo">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="icon-wrapper">
              <div className="icon-circle">
                <span className="pulse-icon">❤</span>
              </div>
            </div>

            <h1 className="login-title">Portal del Paciente</h1>
            <p className="login-description">
              Accede a tu información de salud de forma segura
            </p>
          </div>

          <div className="login-content">
            <button className="login-button" onClick={handleMicrosoftLogin}>
              <svg
                className="ms-icon"
                viewBox="0 0 23 23"
              >
                <path d="M0 0H11V11H0V0Z" fill="#F35325" />
                <path d="M12 0H23V11H12V0Z" fill="#81BC06" />
                <path d="M0 12H11V23H0V12Z" fill="#05A6F0" />
                <path d="M12 12H23V23H12V12Z" fill="#FFBA08" />
              </svg>
              Iniciar sesión con Microsoft
            </button>

            <p className="login-note">
              Este portal está protegido y requiere autenticación
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
