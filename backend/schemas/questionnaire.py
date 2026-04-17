from pydantic import BaseModel

class QuestionnaireBase(BaseModel):
    location: str
    smoking_history: str
    diabetic_history: str
    sun_exposure: str
    current_medication: str
    diet: str
    fecha: str

class QuestionnaireCreate(QuestionnaireBase):
    user_id: str

class QuestionnaireOut(QuestionnaireBase):
    id: int
    user_id: str

    class Config:
        orm_mode = True