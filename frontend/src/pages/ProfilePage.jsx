import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { useEmail } from "../hooks/useEmail";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const diabetesRiskData = [
  { date: "Ene", historico: 18 },
  { date: "Feb", historico: 17 },
  { date: "Mar", historico: 16 },
  { date: "Abr", historico: 15 },
  { date: "May", historico: 17 },
  { date: "Jun", historico: 16 },
  { date: "Jul", historico: 18 },
  { date: "Ago", historico: 22, prediccion: 22 },
  { date: "Sep", prediccion: 24 },
  { date: "Oct", prediccion: 26 },
  { date: "Nov", prediccion: 28 },
  { date: "Dic", prediccion: 29 }
];

const weightEvolution = [
  { mes: "E", value: 75.2 },
  { mes: "F", value: 74.8 },
  { mes: "M", value: 74.1 },
  { mes: "A", value: 73.5 },
  { mes: "M", value: 73.0 },
  { mes: "J", value: 71 }
];

const bpEvolution = [
  { mes: "E", sistolica: 118, diastolica: 78 },
  { mes: "F", sistolica: 120, diastolica: 79 },
  { mes: "M", sistolica: 122, diastolica: 80 },
  { mes: "A", sistolica: 123, diastolica: 81 },
  { mes: "M", sistolica: 124, diastolica: 82 },
  { mes: "J", sistolica: 125, diastolica: 82 }
];

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [glucoseEvolution, setGlucoseEvolution] = useState([]);
  // const [weightEvolution, setWeightEvolution] = useState([]);
  const [dietQuality, setDietQuality] = useState([]);

  const email = useEmail();

  useEffect(() => {
    if (!email) return;

    async function fetchStats() {
      try {
        // const email = "irene.alonso@inetum.com";
        const res = await fetch(`http://localhost:8000/stats/user/${email}`);
        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error cargando datos del backend:", error);
      }
    }

    async function fetchGlucoseEvolution() {
      try {
        // const email = "irene.alonso@inetum.com";
        const res = await fetch(`http://localhost:8000/stats/glucose-evolution/${email}`);
        const data = await res.json();
        setGlucoseEvolution(data);
      } catch (error) {
        console.error("Error cargando evolución de glucosa:", error);
      }
    }

    // async function fetchWeightEvolution() {
    //   try {
    //     // const email = "irene.alonso@inetum.com";
    //     const res = await fetch(`http://localhost:8000/stats/weight-evolution/${email}`);
    //     const data = await res.json();
    //     setWeightEvolution(data);
    //   } catch (error) {
    //     console.error("Error cargando evolución de peso:", error);
    //   }
    // }

    async function fetchDietQuality() {
      try {
        // const email = "irene.alonso@inetum.com";
        const res = await fetch(`http://localhost:8000/stats/diet-quality/${email}`);
        const data = await res.json();
        setDietQuality(data);
      } catch (error) {
        console.error("Error cargando calidad de dieta:", error);
      }
    }

    fetchGlucoseEvolution();
    // fetchWeightEvolution();
    fetchStats();
    fetchDietQuality();
  }, [email]);

  if (!profileData) {
    return <p className="loading">Cargando datos...</p>;
  }

  return (
    <div className="profile-container">

      {/* Datos personales */}
      <div className="card personal-card">
        <div className={`personal-icon ${profileData.gender === "Female" ? "Female" : "Male"}`}>
          {profileData.gender === "Female" ? "♀️" : "♂️"}
        </div>
        {/* <div className="personal-icon">👤</div> */}

        <div>
          <h2 className="card-title">{profileData.full_name}</h2>
          <p className="card-subtitle">
            {/* ID: 12345678 | Edad: {profileData.age} años | Altura: 175 cm */}
          </p>

          <div className="personal-stats">
            {/* <span>Peso actual: <strong>{profileData.peso} kg</strong></span> */}
            {/* <span>IMC: <strong>24.5</strong></span> */}
            <span>IMC: <strong>{profileData.bmi}</strong></span>
            <span>Última visita: <strong>15/03/2026</strong></span>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="metrics-grid">

        <div className="card metric-card">
          <p className="metric-label">Glucosa</p>
          {/* <h3 className="metric-value">96.8 mg/dL</h3> */}
          <h3 className="metric-value">{profileData.blood_glucose_level} mg/dL</h3>
          <p className="metric-status green">✔ Dentro del rango</p>
        </div>

        <div className="card metric-card">
          <p className="metric-label">Peso</p>
          <h3 className="metric-value">{profileData.peso} kg</h3>
          {/* <p className="metric-status blue">🎯 -2 kg restante</p> */}
        </div>

        <div className="card metric-card">
          <p className="metric-label">Actividad Semanal</p>
          {/* <h3 className="metric-value">4.5 h</h3> */}
          <h3 className="metric-value">
            {(profileData.sport_minutes / 60).toFixed(1)} h
          </h3>
          <p className="metric-status green">
            🚶 {profileData.steps.toLocaleString()} pasos
          </p>
          <p className="metric-status green">🏃 Meta alcanzada</p>
        </div>

        <div className="card metric-card">
          <p className="metric-label">Frecuencia Cardíaca</p>
          {/* <h3 className="metric-value">72 bpm</h3> */}
          <h3 className="metric-value">{profileData.heart_rate} bpm</h3>
          <p className="metric-status green">❤️ Normal</p>
        </div>

      </div>

      {/* Gráficos pequeños */}
      <div className="small-charts-grid">

        <div className="card">
          <h3 className="section-title">Evolución de Glucosa</h3>
          <div className="chart-container small">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[90, 115]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Evolución de Peso</h3>
          <div className="chart-container small">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[72, 76]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Presión Arterial</h3>
          <div className="chart-container small">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[70, 130]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sistolica" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="diastolica" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Calidad de la dieta */}
      <div className="card full-width">
        <h3 className="section-title">Calidad de la Dieta</h3>
        <p className="section-subtitle">Puntuación diaria (0-10)</p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dietQuality}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip formatter={(value, name, props) => props.payload.label} />
              <Legend />
              <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
            {/* <BarChart data={dietQuality}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart> */}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Riesgo de diabetes */}
      <div className="card full-width">
        <h3 className="section-title">Probabilidad de Desarrollar Diabetes</h3>
        <p className="section-subtitle">Análisis de riesgo actual, histórico y predicción futura</p>

        <div className="chart-container large">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={diabetesRiskData}>
              <defs>
                <linearGradient id="colorRiesgo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area type="monotone" dataKey="historico" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
              {/* <Area type="monotone" dataKey="actual" stroke="#0ea5e9" fill="url(#colorRiesgo)" /> */}
              <Area type="monotone" dataKey="prediccion" stroke="#ea7575" fill="#ea7575" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="alert-box">
          <div className="alert-icon">⚠️</div>
          <div>
            <h4 className="alert-title">Riesgo Moderado Detectado</h4>
            <p className="alert-text">
              Tu riesgo actual es del 22%. Se recomienda mantener hábitos saludables y realizar seguimiento periódico.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
