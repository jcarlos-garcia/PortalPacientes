from pydantic import BaseModel
from typing import List


class Mensaje(BaseModel):
    """Un turno del historial de conversación."""
    role: str     # "user" o "assistant"
    content: str


class ChatRequest(BaseModel):
    """Petición al endpoint de chat; incluye el historial completo."""
    mensajes: List[Mensaje]


class ChatResponse(BaseModel):
    """Respuesta que devuelve el backend con el texto generado por el modelo."""
    respuesta: str
