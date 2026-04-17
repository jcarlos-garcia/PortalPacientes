import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function TobaccoQuestionnaire() {
  const [form, setForm] = useState({
    smoked: "",
    cigarettesPerDay: "",
    triggers: "",
    quitAttempt: "",
    smoking_history: ""
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
      <h2 className="form-title">Cuestionario de Hábito de Fumar</h2>
      <p className="form-subtitle">
        Registre su consumo de tabaco esta semana
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Situación */}
        <label className="form-label">Historial de consumo de tabaco</label>
        <select
            name="smoking_history"
            className="form-select"
            value={form.smoking_history}
            onChange={handleChange}
        >
            <option value="">Seleccione una opción</option>
            <option value="no_info">Sin información</option>
            <option value="current">Fumador actual</option>
            <option value="ever">Ha fumado alguna vez</option>
            <option value="former">Exfumador</option>
            <option value="never">Nunca ha fumado</option>
            <option value="not_current">No fumador actualmente</option>
        </select>

        {/* Ha fumado */}
        <label className="form-label">¿Ha fumado esta semana?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="smoked"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="smoked"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Cigarrillos por día */}
        {form.smoked === "si" && (
          <>
            <label className="form-label">Cigarrillos promedio por día</label>
            <input
              type="number"
              name="cigarettesPerDay"
              className="form-input"
              value={form.cigarettesPerDay}
              onChange={handleChange}
            />

            {/* Desencadenantes */}
            <label className="form-label">Principales desencadenantes</label>
            <input
              type="text"
              name="triggers"
              className="form-input"
              placeholder="Ej: estrés, social, después de comer..."
              value={form.triggers}
              onChange={handleChange}
            />
          </>
        )}

        {/* Intento de dejar de fumar */}
        <label className="form-label">¿Ha intentado dejar de fumar esta semana?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="quitAttempt"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="quitAttempt"
              value="no"
              onChange={handleChange}
            />
            No
          </label>

          <label>
            <input
              type="radio"
              name="quitAttempt"
              value="considerando"
              onChange={handleChange}
            />
            Lo estoy considerando
          </label>
        </div>

        {/* Botón */}
        <button className="submit-button" type="submit">
          Enviar Cuestionario
        </button>
      </form>
    </div>
  );
}
