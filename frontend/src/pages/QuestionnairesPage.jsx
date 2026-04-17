import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuestionnairesPage.css";

const questionnaires = [
  {
    id: "general-health",
    title: "Salud General",
    description: "Registra tus mediciones y estado general de salud",
    icon: "🩺",
    color: "#14b8a6",
    questions: 10
  },
  {
    id: "nutrition",
    title: "Alimentación",
    description: "Evalúa tus hábitos alimenticios y consumo de nutrientes",
    icon: "🍽️",
    color: "#f59e0b",
    questions: 12
  },
  {
    id: "physical-activity",
    title: "Actividad Física",
    description: "Analiza tu nivel de ejercicio y actividad diaria",
    icon: "🏃",
    color: "#0ea5e9",
    questions: 10
  },
  {
    id: "tobacco",
    title: "Consumo de Tabaco",
    description: "Registra tu historial y hábitos relacionados con el tabaco",
    icon: "🚬",
    color: "#64748b",
    questions: 8
  },
  {
    id: "alcohol",
    title: "Consumo de Alcohol",
    description: "Evalúa la frecuencia y cantidad de consumo de alcohol",
    icon: "🍷",
    color: "#8b5cf6",
    questions: 9
  },
  {
    id: "sleep",
    title: "Calidad del Sueño",
    description: "Analiza tus patrones de sueño y descanso",
    icon: "🌙",
    color: "#6366f1",
    questions: 11
  },
  {
    id: "family-history",
    title: "Antecedentes Familiares",
    description: "Registra el historial médico familiar de diabetes",
    icon: "👨‍👩‍👧‍👦",
    color: "#ec4899",
    questions: 7
  },
  {
    id: "stress",
    title: "Nivel de Estrés",
    description: "Evalúa tu bienestar emocional y manejo del estrés",
    icon: "🧠",
    color: "#f59e0b",
    questions: 10
  }
];

export default function QuestionnairesPage() {
  const navigate = useNavigate();

  return (
    <div className="questionnaires-container">

      {/* Encabezado */}
      <div className="header-section">
        <h2 className="header-title">Cuestionarios de Salud</h2>
        <p className="header-subtitle">
          Completa los cuestionarios para obtener una evaluación personalizada de tu riesgo
        </p>
      </div>

      {/* Tarjetas */}
      <div className="cards-grid">
        {questionnaires.map((q) => (
          <div key={q.id} className="card questionnaire-card">

            <div className="card-top">
              <div className="icon-wrapper" style={{ backgroundColor: `${q.color}20` }}>
                <span className="icon" style={{ color: q.color }}>{q.icon}</span>
              </div>

              <span className="questions-badge">
                {q.questions} preguntas
              </span>
            </div>

            <div className="card-body">
              <h3 className="card-title">{q.title}</h3>
              <p className="card-description">{q.description}</p>
            </div>

            <button
              className="start-button"
              style={{ borderColor: q.color, color: q.color }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = q.color;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = q.color;
              }}
              onClick={() => navigate(`/dashboard/questionnaires/${q.id}`)}
            >
              Comenzar →
            </button>

          </div>
        ))}
      </div>

      {/* Sección informativa */}
      <div className="info-card">
        <div className="info-icon">📊</div>

        <div>
          <h3 className="info-title">¿Por qué completar los cuestionarios?</h3>
          <p className="info-text">
            Los cuestionarios nos ayudan a entender mejor tu estilo de vida y factores de riesgo.
            Esta información es esencial para calcular con precisión tu probabilidad de desarrollar
            diabetes y proporcionarte recomendaciones personalizadas.
          </p>

          <ul className="info-list">
            <li>Evaluación personalizada de riesgo</li>
            <li>Recomendaciones adaptadas a tu perfil</li>
            <li>Seguimiento de evolución a lo largo del tiempo</li>
          </ul>
        </div>
      </div>

    </div>
  );
}

