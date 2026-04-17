from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.azure_oauth import get_current_user
from db.database import SessionLocal
from db.crud import get_user_stats, get_glucose_evolution, get_diet_quality, get_weight_evolution

router = APIRouter(prefix="/stats")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{email}")
def get_stats(email: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if email != user["email"]:
        raise HTTPException(403, "No puedes acceder a datos de otro usuario")

    return get_user_stats(db, email)

from db.crud import get_user_stats_by_id

@router.get("/user/{email}")
def get_stats_by_email(email: str, db: Session = Depends(get_db)):
    return get_user_stats_by_id(db, email)

@router.get("/glucose-evolution/{email}")
def glucose_evolution(email: str, db=Depends(get_db)):
    return get_glucose_evolution(db, email)

@router.get("/weight-evolution/{email}")
def weight_evolution(email: str, db=Depends(get_db)):
    return get_weight_evolution(db, email)

@router.get("/diet-quality/{email}")
def diet_quality(email: str, db=Depends(get_db)):
    return get_diet_quality(db, email)

