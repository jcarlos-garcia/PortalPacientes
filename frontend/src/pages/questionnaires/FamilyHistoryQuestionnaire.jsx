import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function FamilyHistoryQuestionnaire() {
  const [form, setForm] = useState({
    hasFamilyHistory: "",
    relativeType: "",
    diagnosisAge: "",
    otherConditions: "",
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
      <h2 className="form-title">Cuestionario de Antecedentes Familiares</h2>
      <p className="form-subtitle">
        Registre el historial médico familiar relacionado con la diabetes
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Antecedentes familiares */}
        <label className="form-label">¿Tiene familiares con diabetes?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasFamilyHistory"
              value="si"
              onChange={handleChange}
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              name="hasFamilyHistory"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Si tiene antecedentes, mostrar más campos */}
        {form.hasFamilyHistory === "si" && (
          <>
            {/* Tipo de familiar */}
            <label className="form-label">¿Qué familiar(es)?</label>
            <select
              name="relativeType"
              className="form-select"
              value={form.relativeType}
              onChange={handleChange}
            >
              <option value="">Seleccione un familiar</option>
              <option value="padre">Padre</option>
              <option value="madre">Madre</option>
              <option value="hermano">Hermano/a</option>
              <option value="abuelo">Abuelo/a</option>
              <option value="tio">Tío/a</option>
              <option value="otro">Otro</option>
            </select>

            {/* Edad de diagnóstico */}
            <label className="form-label">Edad aproximada de diagnóstico</label>
            <input
              type="number"
              name="diagnosisAge"
              className="form-input"
              value={form.diagnosisAge}
              onChange={handleChange}
            />

            {/* Otras condiciones */}
            <label className="form-label">¿Tienen otras condiciones relacionadas?</label>
            <input
              type="text"
              name="otherConditions"
              className="form-input"
              placeholder="Ej: hipertensión, obesidad, colesterol alto..."
              value={form.otherConditions}
              onChange={handleChange}
            />
          </>
        )}

        {/* Notas */}
        <label className="form-label">Notas adicionales</label>
        <textarea
          name="notes"
          className="form-textarea"
          placeholder="Incluya cualquier información relevante sobre su historial familiar..."
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
