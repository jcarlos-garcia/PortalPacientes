from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import questionnaire, stats, chatbot

app = FastAPI(title="Portal del paciente API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(questionnaire.router)
app.include_router(stats.router)
app.include_router(chatbot.router)