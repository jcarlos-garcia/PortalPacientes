import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function PhysicalActivityQuestionnaire() {
  const [form, setForm] = useState({
    days: "",
    type: "",
    duration: "",
    intensity: "",
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
      <h2 className="form-title">Cuestionario de Actividad Física</h2>
      <p className="form-subtitle">
        Registre su actividad física de esta semana
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Días de ejercicio */}
        <label className="form-label">¿Cuántos días ha hecho ejercicio esta semana?</label>
        <select
          name="days"
          className="form-select"
          value={form.days}
          onChange={handleChange}
        >
          <option value="">Seleccione número de días</option>
          <option value="0">0 días</option>
          <option value="1">1 día</option>
          <option value="2">2 días</option>
          <option value="3">3 días</option>
          <option value="4">4 días</option>
          <option value="5">5 días</option>
          <option value="6">6 días</option>
          <option value="7">7 días</option>
        </select>

        {/* Tipo de ejercicio */}
        <label className="form-label">Tipo de ejercicio principal</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="type"
              value="cardio"
              onChange={handleChange}
            />
            Cardio (correr, nadar, bici)
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="fuerza"
              onChange={handleChange}
            />
            Fuerza (pesas, gimnasio)
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="flexibilidad"
              onChange={handleChange}
            />
            Flexibilidad (yoga, pilates)
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="mixto"
              onChange={handleChange}
            />
            Mixto
          </label>
        </div>

        {/* Duración */}
        <label className="form-label">Duración promedio por sesión (minutos)</label>
        <input
          type="number"
          name="duration"
          className="form-input"
          value={form.duration}
          onChange={handleChange}
        />

        {/* Intensidad */}
        <label className="form-label">Intensidad percibida</label>
        <select
          name="intensity"
          className="form-select"
          value={form.intensity}
          onChange={handleChange}
        >
          <option value="">Seleccione intensidad</option>
          <option value="baja">Baja</option>
          <option value="moderada">Moderada</option>
          <option value="alta">Alta</option>
        </select>

        {/* Exposición al sol */}
        <label className="form-label">¿Cuánto tiempo ha estado expuesto al sol?</label>
        <select
          name="sun"
          className="form-select"
          value={form.days}
          onChange={handleChange}
        >
          <option value="">Seleccione duración</option>
          <option value="<10 min">Menos de 10 min</option>
          <option value="10-30 min">10-13 min</option>
          <option value="30-60 min">30-60 min</option>
          <option value="1-2h">1-2 h</option>
          <option value=">2h">Más de 2h</option>
        </select>

        {/* Notas */}
        <label className="form-label">Notas adicionales</label>
        <textarea
          name="notes"
          className="form-textarea"
          placeholder="Describa cualquier detalle adicional sobre su actividad física..."
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
