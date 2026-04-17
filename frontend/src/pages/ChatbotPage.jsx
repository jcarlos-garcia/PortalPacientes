import React, { useState } from "react";
import "../styles/ChatBotPage.css";

// URL base del backend; en desarrollo apunta al servidor local de FastAPI
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const initialMessages = [
  {
    id: 1,
    type: "assistant",
    content:
      "¡Hola! Soy tu asistente virtual de salud. Estoy aquí para ayudarte con información sobre diabetes y hábitos saludables.",
    timestamp: "10:30",
  },
  {
    id: 2,
    type: "assistant",
    content: "¿En qué puedo ayudarte hoy?",
    timestamp: "10:30",
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || cargando) return;

    const ahora = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: ahora,
    };

    const historialActualizado = [...messages, userMessage];
    setMessages(historialActualizado);
    setInputValue("");
    setCargando(true);

    // Construir el historial en el formato que espera el backend (solo turnos user/assistant)
    const historialParaApi = historialActualizado
      .filter((m) => m.type === "user" || m.type === "assistant")
      .map((m) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.content,
      }));

    try {
      const respuesta = await fetch(`${API_URL}/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: historialParaApi }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      const datos = await respuesta.json();

      const botMessage = {
        id: historialActualizado.length + 1,
        type: "assistant",
        content: datos.respuesta,
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch  {
      const errorMessage = {
        id: historialActualizado.length + 1,
        type: "assistant",
        content:
          "Lo siento, no he podido conectar con el asistente en este momento. Por favor, inténtalo de nuevo.",
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">

      {/* Encabezado */}
      <div className="header-section">
        <h2 className="header-title">Asistente Virtual</h2>
        <p className="header-subtitle">
          Consulta con nuestro asistente sobre diabetes y hábitos saludables
        </p>
      </div>

      {/* Banner informativo */}
      <div className="banner">
        <div className="banner-icon">✨</div>

        <div className="banner-content">
          <div className="banner-title-row">
            <h3 className="banner-title">Próximamente: Análisis Inteligente de Riesgo</h3>
            <span className="beta-tag">Beta</span>
          </div>

          <p className="banner-text">
            El asistente pronto podrá analizar automáticamente tus respuestas a los cuestionarios
            y tus métricas de salud para detectar patrones de riesgo elevado de desarrollar diabetes.
          </p>

          <div className="banner-features">
            <div className="feature-item">⚠️ Detección de riesgo en tiempo real</div>
            <div className="feature-item">🤖 Recomendaciones personalizadas</div>
          </div>
        </div>
      </div>

      {/* Chat principal */}
      <div className="chat-card">

        {/* Cabecera del chat */}
        <div className="chat-header">
          <div className="chat-header-icon">🤖</div>
          <div>
            <h3 className="chat-header-title">Asistente de Diabetes</h3>
            <div className="chat-status">
              <span className="status-dot"></span>
              <span className="status-text">En línea</span>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.type === "user" ? "reverse" : ""}`}
            >
              <div className={`avatar ${msg.type === "assistant" ? "assistant" : "user"}`}>
                {msg.type === "assistant" ? "🤖" : "🧑"}
              </div>

              <div className={`message-content ${msg.type}`}>
                <div className="bubble">{msg.content}</div>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="chat-input-section">
          <input
            type="text"
            placeholder={cargando ? "El asistente está escribiendo..." : "Escribe tu mensaje..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chat-input"
            disabled={cargando}
          />

          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim() || cargando}
          >
            {cargando ? "..." : "➤ Enviar"}
          </button>
        </div>

        <p className="chat-disclaimer">
          Este asistente proporciona información general. Consulta a tu médico para diagnósticos.
        </p>
      </div>

      {/* Tarjetas inferiores */}
      <div className="info-grid">
        <div className="info-card">
          {/* <div className="info-dot green"></div> */}
          <h4>🟢 Información General</h4>
          <p>Obtén respuestas sobre diabetes, síntomas y prevención</p>
        </div>

        <div className="info-card">
          {/* <div className="info-dot blue"></div> */}
          <h4>🔵 Hábitos Saludables</h4>
          <p>Consejos sobre alimentación, ejercicio y estilo de vida</p>
        </div>

        <div className="info-card">
          {/* <div className="info-dot yellow"></div> */}
          <h4>🟠 Interpretación de Métricas</h4>
          <p>Entiende tus valores de glucosa, HbA1c y otros parámetros</p>
        </div>
      </div>
    </div>
  );
}
