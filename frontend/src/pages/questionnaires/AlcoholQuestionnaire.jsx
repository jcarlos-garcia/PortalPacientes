import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function AlcoholQuestionnaire() {
  const [form, setForm] = useState({
    frequency: "",
    amount: "",
    drinkType: "",
    binge: "",
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
      <h2 className="form-title">Cuestionario de Consumo de Alcohol</h2>
      <p className="form-subtitle">
        Evalúe su consumo de alcohol esta semana
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Frecuencia */}
        <label className="form-label">Frecuencia de consumo</label>
        <select
          name="frequency"
          className="form-select"
          value={form.frequency}
          onChange={handleChange}
        >
          <option value="">Seleccione frecuencia</option>
          <option value="nunca">Nunca</option>
          <option value="ocasional">Ocasional (1–2 veces/mes)</option>
          <option value="semanal">Semanal (1–3 veces/semana)</option>
          <option value="frecuente">Frecuente (4+ veces/semana)</option>
        </select>

        {/* Cantidad */}
        <label className="form-label">Cantidad promedio por ocasión (unidades)</label>
        <input
          type="number"
          name="amount"
          className="form-input"
          value={form.amount}
          onChange={handleChange}
        />

        {/* Tipo de bebida */}
        <label className="form-label">Tipo de bebida principal</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="drinkType"
              value="vino"
              onChange={handleChange}
            />
            Vino
          </label>

          <label>
            <input
              type="radio"
              name="drinkType"
              value="cerveza"
              onChange={handleChange}
            />
            Cerveza
          </label>

          <label>
            <input
              type="radio"
              name="drinkType"
              value="licores"
              onChange={handleChange}
            />
            Licores
          </label>

          <label>
            <input
              type="radio"
              name="drinkType"
              value="mixto"
              onChange={handleChange}
            />
            Mixto
          </label>
        </div>

        {/* Consumo elevado */}
        <label className="form-label">¿Ha tenido episodios de consumo elevado esta semana?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="binge"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="binge"
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
          placeholder="Describa cualquier detalle adicional sobre su consumo..."
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
