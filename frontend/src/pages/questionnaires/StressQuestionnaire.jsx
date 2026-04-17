import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function StressQuestionnaire() {
  const [form, setForm] = useState({
    stressLevel: "",
    triggers: "",
    coping: "",
    symptoms: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    alert("Cuestionario enviado correctamente");
  };

  return (
    <div className="questionnaire-container">
      <h2 className="form-title">Cuestionario de Nivel de Estrés</h2>
      <p className="form-subtitle">
        Evalúe su bienestar emocional y manejo del estrés
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Nivel de estrés */}
        <label className="form-label">Nivel de estrés esta semana</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="stressLevel"
              value="bajo"
              onChange={handleChange}
            />
            Bajo
          </label>

          <label>
            <input
              type="radio"
              name="stressLevel"
              value="moderado"
              onChange={handleChange}
            />
            Moderado
          </label>

          <label>
            <input
              type="radio"
              name="stressLevel"
              value="alto"
              onChange={handleChange}
            />
            Alto
          </label>
        </div>

        {/* Desencadenantes */}
        <label className="form-label">Principales desencadenantes</label>
        <input
          type="text"
          name="triggers"
          className="form-input"
          placeholder="Ej: trabajo, familia, estudios..."
          value={form.triggers}
          onChange={handleChange}
        />

        {/* Manejo del estrés */}
        <label className="form-label">¿Cómo ha manejado el estrés esta semana?</label>
        <select
          name="coping"
          className="form-select"
          value={form.coping}
          onChange={handleChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="ejercicio">Ejercicio</option>
          <option value="relajacion">Técnicas de relajación</option>
          <option value="hablar">Hablar con alguien</option>
          <option value="descanso">Descanso</option>
          <option value="ninguno">No he realizado estrategias</option>
        </select>

        {/* Síntomas */}
        <label className="form-label">Síntomas o molestias recientes</label>
        <textarea
          name="symptoms"
          className="form-textarea"
          placeholder="Describa cualquier síntoma físico o emocional..."
          value={form.symptoms}
          onChange={handleChange}
        />

        {/* Notas */}
        <label className="form-label">Notas adicionales</label>
        <textarea
          name="notes"
          className="form-textarea"
          placeholder="Incluya cualquier detalle adicional relevante..."
          value={form.notes}
          onChange={handleChange}
        />

        {/* Botón */}
        <button className="submit-button" type="submit">
          Enviar Cuestionario
        </button>
      </form>
    </div>
  );
}
