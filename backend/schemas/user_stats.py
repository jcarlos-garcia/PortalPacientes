from pydantic import BaseModel

class UserStatsOut(BaseModel):
    id: int
    user_id: str
    year: int
    gender: str
    age: int
    location: str
    hypertension: int
    heart_disease: int
    smoking_history: str
    bmi: float
    hba1c_level: float
    blood_glucose_level: float
    diabetes: int
    race: str
    sun_exposure: str
    oxygen_level: float
    heart_rate: int
    kcal_burned: int
    sport_minutes: int
    steps: int
    sleep_hours: float

    class Config:
        orm_mode = True