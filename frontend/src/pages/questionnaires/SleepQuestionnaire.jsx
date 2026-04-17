import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function SleepQuestionnaire() {
  const [form, setForm] = useState({
    hours: "",
    quality: "",
    difficulties: "",
    awakenings: "",
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
      <h2 className="form-title">Cuestionario de Calidad del Sueño</h2>
      <p className="form-subtitle">
        Analice sus patrones de sueño y descanso
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Horas de sueño */}
        <label className="form-label">Horas de sueño promedio por noche</label>
        <select
          name="hours"
          className="form-select"
          value={form.hours}
          onChange={handleChange}
        >
          <option value="">Seleccione horas de sueño</option>
          <option value="menos-5">Menos de 5 horas</option>
          <option value="5-6">5–6 horas</option>
          <option value="7-8">7–8 horas</option>
          <option value="mas-8">Más de 8 horas</option>
        </select>

        {/* Calidad del sueño */}
        <label className="form-label">Calidad del sueño</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="quality"
              value="buena"
              onChange={handleChange}
            />
            Buena
          </label>

          <label>
            <input
              type="radio"
              name="quality"
              value="regular"
              onChange={handleChange}
            />
            Regular
          </label>

          <label>
            <input
              type="radio"
              name="quality"
              value="mala"
              onChange={handleChange}
            />
            Mala
          </label>
        </div>

        {/* Dificultades */}
        <label className="form-label">¿Ha tenido dificultades para conciliar el sueño?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="difficulties"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="difficulties"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Despertares */}
        <label className="form-label">¿Se ha despertado varias veces durante la noche?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="awakenings"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="awakenings"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Notas */}
        <label className="form-label">Notas adicionales</label>
        <textarea
          name="notes"
          className="form-textarea"
          placeholder="Describa cualquier detalle adicional sobre su descanso..."
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
