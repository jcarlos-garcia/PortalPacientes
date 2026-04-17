from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.azure_oauth import get_current_user
from db.crud import create_questionnaire
from db.database import SessionLocal
from schemas.questionnaire import QuestionnaireCreate

router = APIRouter(prefix="/questionnaire")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def save_questionnaire(data: QuestionnaireCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):

    if data.user_id != user["oid"]:
        raise HTTPException(403, "No puedes guardar datos de otro usuario")

    return create_questionnaire(db, data)
