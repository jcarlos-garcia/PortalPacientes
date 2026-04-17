import React, { useState } from "react";
import "../../styles/QuestionnaireForm.css";

export default function NutritionQuestionnaire() {
  const [form, setForm] = useState({
    mealsPerDay: "",
    waterIntake: "",
    fruitsVeggies: "",
    processedFood: "",
    notes: "",
    diet: ""
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
      <h2 className="form-title">Cuestionario de Dieta</h2>
      <p className="form-subtitle">
        Registre sus hábitos alimenticios de esta semana
      </p>

      <form className="form-card" onSubmit={handleSubmit}>

        {/* Calidad de dieta */}
        <label className="form-label">¿Cómo definiría su dieta?</label>
        <select
            name="diet"
            className="form-select"
            value={form.diet}
            onChange={handleChange}
        >
            <option value="">Seleccione una opción</option>
            <option value="healthy">Saludable</option>
            <option value="high_carb">Alta en carbohidratos</option>
            <option value="high_fat">Alta en grasas</option>
            <option value="moderate">Moderada</option>
            <option value="poor">Pobre</option>
        </select>

        {/* Comidas por día */}
        <label className="form-label">Comidas principales por día</label>
        <select
          name="mealsPerDay"
          className="form-select"
          value={form.mealsPerDay}
          onChange={handleChange}
        >
          <option value="">Seleccione número de comidas</option>
          <option value="1">1 comida</option>
          <option value="2">2 comidas</option>
          <option value="3">3 comidas</option>
          <option value="4">4 comidas</option>
          <option value="5">5 comidas</option>
        </select>

        {/* Agua */}
        <label className="form-label">Consumo de agua diario (vasos)</label>
        <input
          type="number"
          name="waterIntake"
          className="form-input"
          value={form.waterIntake}
          onChange={handleChange}
        />

        {/* Frutas y verduras */}
        <label className="form-label">Porciones de frutas y verduras al día</label>
        <select
          name="fruitsVeggies"
          className="form-select"
          value={form.fruitsVeggies}
          onChange={handleChange}
        >
          <option value="">Seleccione porciones</option>
          <option value="1-2">1-2 porciones</option>
          <option value="3-4">3-4 porciones</option>
          <option value="5+">5 o más porciones</option>
        </select>

        {/* Procesados */}
        <label className="form-label">Consumo de alimentos procesados</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="processedFood"
              value="bajo"
              onChange={handleChange}
            />
            Bajo
          </label>

          <label>
            <input
              type="radio"
              name="processedFood"
              value="moderado"
              onChange={handleChange}
            />
            Moderado
          </label>

          <label>
            <input
              type="radio"
              name="processedFood"
              value="alto"
              onChange={handleChange}
            />
            Alto
          </label>
        </div>

        {/* Notas */}
        <label className="form-label">Observaciones sobre su alimentación</label>
        <textarea
          name="notes"
          className="form-textarea"
          placeholder="Describa su patrón alimenticio, cambios recientes, etc..."
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
