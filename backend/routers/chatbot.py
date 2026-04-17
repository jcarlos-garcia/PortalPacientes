from fastapi import APIRouter, HTTPException
from openai import AzureOpenAI

from core.config import settings
from schemas.chatbot import ChatRequest, ChatResponse

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

# Prompt de sistema: define el rol y límites del asistente
_SISTEMA_PROMPT = (
    "Eres un asistente virtual especializado en diabetes y salud. "
    "Responde siempre en español de forma clara, empática y concisa. "
    "Proporciona información general sobre diabetes, hábitos saludables, "
    "alimentación y ejercicio físico. "
    "Cuando el usuario comparta métricas (glucosa, HbA1c, IMC, etc.), "
    "explícalas en lenguaje sencillo. "
    "Recuerda siempre al usuario que consulte a su médico para diagnósticos "
    "o decisiones clínicas concretas."
)


def _cliente_openai() -> AzureOpenAI:
    """Crea y devuelve un cliente de Azure OpenAI configurado desde las variables de entorno."""
    return AzureOpenAI(
        azure_endpoint=settings.azure_openai_endpoint,
        api_key=settings.azure_openai_key,
        api_version="2024-02-01",
    )


@router.post("/chat", response_model=ChatResponse)
def chat(peticion: ChatRequest):
    """
    Recibe el historial de mensajes del usuario y devuelve la respuesta
    generada por el modelo GPT desplegado en Azure OpenAI.
    """
    # Construir la lista de mensajes incluyendo el prompt de sistema al inicio
    mensajes = [{"role": "system", "content": _SISTEMA_PROMPT}]
    mensajes += [{"role": m.role, "content": m.content} for m in peticion.mensajes]

    try:
        cliente = _cliente_openai()
        respuesta = cliente.chat.completions.create(
            model=settings.azure_openai_deployment,
            messages=mensajes,
            max_tokens=800,
            temperature=0.7,
        )
        texto = respuesta.choices[0].message.content
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Error al contactar con el modelo de IA: {str(e)}",
        )

    return ChatResponse(respuesta=texto)
