import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

/* ---------------------- MODAL DE PREDICCIÓN ---------------------- */
function PredictionModal({ open, onClose, prediction }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Resultado de la Predicción</h3>

        <p className="prediction-text">
          {prediction || "No se pudo obtener la predicción"}
        </p>

        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

/* ---------------------- FORMULARIO PRINCIPAL ---------------------- */
export default function GeneralHealthQuestionnaire() {
  const [form, setForm] = useState({
    weight: "",
    glucose: "",
    systolic: "",
    diastolic: "",
    sleepHours: "",
    stress: "",
    symptoms: "",
    sun_exposure: "",
    current_medication: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://localhost:8000/predict", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form)
      // });

      // const data = await res.json();

      setPrediction('70%');
      // setPrediction(data.prediction); // <-- lo que devuelva tu backend
      setModalOpen(true);             // <-- abrir modal

    } catch (error) {
      console.error("Error enviando cuestionario:", error);
      setPrediction("Error al obtener la predicción");
      setModalOpen(true);
    }
  };

  return (
    <div className="questionnaire-container">
      <h2 className="form-title">Cuestionario de Salud General</h2>
      <p className="form-subtitle">
        Registre sus mediciones y estado general de salud
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Peso */}
        <label className="form-label">Peso (kg)</label>
        <input
          type="number"
          name="weight"
          className="form-input"
          value={form.weight}
          onChange={handleChange}
        />

        {/* Glucosa */}
        <label className="form-label">Glucosa (mg/dL)</label>
        <input
          type="number"
          name="glucose"
          className="form-input"
          value={form.glucose}
          onChange={handleChange}
        />

        {/* Presión arterial */}
        <label className="form-label">Presión Arterial - Sistólica</label>
        <input
          type="number"
          name="systolic"
          className="form-input"
          value={form.systolic}
          onChange={handleChange}
        />

        <label className="form-label">Presión Arterial - Diastólica</label>
        <input
          type="number"
          name="diastolic"
          className="form-input"
          value={form.diastolic}
          onChange={handleChange}
        />

        {/* Horas de sueño */}
        <label className="form-label">Horas de sueño promedio por noche</label>
        <select
          name="sleepHours"
          className="form-select"
          value={form.sleepHours}
          onChange={handleChange}
        >
          <option value="">Seleccione horas de sueño</option>
          <option value="menos-5">Menos de 5 horas</option>
          <option value="5-6">5–6 horas</option>
          <option value="7-8">7–8 horas</option>
          <option value="mas-8">Más de 8 horas</option>
        </select>

        {/* Estrés */}
        <label className="form-label">Nivel de estrés esta semana</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="stress" value="bajo" onChange={handleChange} />
            Bajo
          </label>
          <label>
            <input type="radio" name="stress" value="moderado" onChange={handleChange} />
            Moderado
          </label>
          <label>
            <input type="radio" name="stress" value="alto" onChange={handleChange} />
            Alto
          </label>
        </div>

        {/* Exposición al sol */}
        <label className="form-label">Exposición al sol esta semana</label>
        <select
          name="sun_exposure"
          className="form-select"
          value={form.sun_exposure}
          onChange={handleChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="<10">Menos de 10 min</option>
          <option value="10-30">10–30 min</option>
          <option value="30-60">30–60 min</option>
          <option value="1-2h">1–2 horas</option>
          <option value=">2h">Más de 2 horas</option>
        </select>

        {/* Medicación actual */}
        <label className="form-label">Medicación actual</label>
        <select
          name="current_medication"
          className="form-select"
          value={form.current_medication}
          onChange={handleChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="metformina">Metformina</option>
          <option value="ieca">IECA</option>
          <option value="betabloqueantes">Betabloqueantes</option>
          <option value="insulina">Insulina</option>
          <option value="estatinas">Estatinas</option>
          <option value="ninguna">Ninguna</option>
        </select>

        {/* Síntomas */}
        <label className="form-label">Síntomas o molestias recientes</label>
        <textarea
          name="symptoms"
          className="form-textarea"
          placeholder="Describa cualquier síntoma, dolor o molestia..."
          value={form.symptoms}
          onChange={handleChange}
        />

        {/* Botón */}
        <button className="submit-button" type="submit">
          Enviar Cuestionario
        </button>
      </form>

      {/* MODAL */}
      <PredictionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        prediction={prediction}
      />
    </div>
  );
}
