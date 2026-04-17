from sqlalchemy import Column, Integer, String, Float
from db.database import Base

class UserStats(Base):
    __tablename__ = "registro_pacientes"
    __table_args__ = {"schema": "gold"}

    # id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    email = Column(String, primary_key=True)
    year = Column(Integer)
    gender = Column(String)
    age = Column(Integer)
    location = Column(String)
    hypertension = Column(Integer)
    heart_disease = Column(Integer)
    smoking_history = Column(String)
    bmi = Column(Float)
    hba1c_level = Column(Float)
    blood_glucose_level = Column(Float)
    diabetes = Column(Integer)
    race = Column(String)
    sun_exposure = Column(String)
    oxygen_level = Column(Float)
    heart_rate = Column(Integer)
    kcal_burned = Column(Integer)
    sport_minutes = Column(Integer)
    steps = Column(Integer)
    sleep_hours = Column(Float)


class Questionnaire(Base):
    __tablename__ = "questionnaire"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)

    location = Column(String)
    smoking_history = Column(String)
    diabetic_history = Column(String)
    sun_exposure = Column(String)
    current_medication = Column(String)
    diet = Column(String)
    fecha = Column(String)
