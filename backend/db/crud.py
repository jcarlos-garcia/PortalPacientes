from db.models import UserStats, Questionnaire
from sqlalchemy.orm import Session
from datetime import datetime

def get_user_stats(db: Session, email: str):
    return db.query(UserStats).filter(UserStats.email == email).all()

def create_questionnaire(db: Session, data):
    new_item = Questionnaire(**data.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

from sqlalchemy import text
def get_user_stats_by_id(db: Session, email: str):
    query = text("""
        SELECT email, blood_glucose_level, bmi, sport_minutes, steps, heart_rate, gender, full_name, peso
        FROM gold.registro_pacientes
        WHERE email = :email
        ORDER BY fecha DESC
        LIMIT 1
    """)

    result = db.execute(query, {"email": email}).fetchone()

    if not result:
        print("⚠️ No se encontraron estadísticas para el usuario:", email)
        return {}

    print("📊 Datos encontrados:", result)

    # edad = calcular_edad(result["birth_date"])

    return {
        "blood_glucose_level": result[1],
        "bmi": result[2],
        "sport_minutes": result[3],
        "steps": result[4],
        "heart_rate": result[5],
        "gender": result[6],
        "full_name": result[7],        
        "peso": result[8],
        # "age": edad
    }

def get_glucose_evolution(db, email):
    query = text("""
        SELECT fecha, blood_glucose_level
        FROM gold.registro_pacientes
        WHERE email = :email
        ORDER BY fecha DESC
        LIMIT 7
    """)

    rows = db.execute(query, {"email": email}).fetchall()

    if not rows:
        print("⚠️ No hay datos de glucosa para:", email)
        return []

    # Días abreviados
    dias = ["L", "M", "X", "J", "V", "S", "D"]

    # Convertimos a formato usable
    evolution = []
    for fecha, glucosa in rows[::-1]:  # orden cronológico
        dia_semana = dias[fecha.weekday()]
        evolution.append({
            "date": dia_semana,
            "value": glucosa
        })

    # 🔥 Reordenar para que termine en HOY
    hoy_idx = datetime.today().weekday()
    hoy_letra = dias[hoy_idx]

    # Buscar dónde está HOY en los datos
    pos_hoy = next((i for i, d in enumerate(evolution) if d["date"] == hoy_letra), None)

    if pos_hoy is not None:
        # Rotar la lista para que termine en hoy
        evolution = evolution[pos_hoy-6:] + evolution[:pos_hoy-6]

    print("📊 Evolución glucosa final:", evolution)
    return evolution

def get_weight_evolution(db, email):
    query = text("""
        SELECT fecha, peso
        FROM gold.registro_pacientes
        WHERE email = :email
        ORDER BY fecha DESC
        LIMIT 7
    """)

    rows = db.execute(query, {"email": email}).fetchall()

    if not rows:
        print("⚠️ No hay datos de peso para:", email)
        return []

    # Días abreviados
    dias = ["L", "M", "X", "J", "V", "S", "D"]

    # Convertimos a formato usable
    evolution = []
    for fecha, peso in rows[::-1]:  # orden cronológico
        dia_semana = dias[fecha.weekday()]
        evolution.append({
            "date": dia_semana,
            "value": peso
        })

    # 🔥 Reordenar para que termine en HOY
    hoy_idx = datetime.today().weekday()
    hoy_letra = dias[hoy_idx]

    # Buscar dónde está HOY en los datos
    pos_hoy = next((i for i, d in enumerate(evolution) if d["date"] == hoy_letra), None)

    if pos_hoy is not None:
        # Rotar la lista para que termine en hoy
        evolution = evolution[pos_hoy-6:] + evolution[:pos_hoy-6]

    print("📊 Evolución peso final:", evolution)
    return evolution

def get_diet_quality(db, email):
    query = text("""
        SELECT fecha, diet
        FROM gold.registro_pacientes
        WHERE email = :email
        ORDER BY fecha DESC
        LIMIT 7
    """)

    rows = db.execute(query, {"email": email}).fetchall()

    if not rows:
        print("⚠️ No hay datos de dieta para:", email)
        return []

    # Mapeo de categorías a puntuación
    mapping = {
        "saludable": 9,
        "moderada": 7,
        "rica en carbohidratos": 5,
        "rica en grasas": 4,
        "pobre": 2
    }

    dias = ["L", "M", "X", "J", "V", "S", "D"]

    evolution = []
    for fecha, diet in rows[::-1]:
        dia_semana = dias[fecha.weekday()]
        score = mapping.get(diet.lower(), 0)
        evolution.append({
            "day": dia_semana,
            "score": score,
            "label": diet
        })

    # Reordenar para que termine en HOY
    hoy_idx = datetime.today().weekday()
    hoy_letra = dias[hoy_idx]

    pos_hoy = next((i for i, d in enumerate(evolution) if d["day"] == hoy_letra), None)

    if pos_hoy is not None:
        evolution = evolution[pos_hoy-6:] + evolution[:pos_hoy-6]

    print("🥗 Diet evolution:", evolution)
    return evolution

def calcular_edad(birth_date_str):
    if not birth_date_str:
        return None

    try:
        # Ajusta el formato si tu fecha viene distinta
        birth_date = datetime.strptime(birth_date_str, "%Y-%m-%d").date()
    except ValueError:
        print("⚠️ Formato de fecha no válido:", birth_date_str)
        return None

    today = datetime.today().date()

    edad = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        edad -= 1

    return edad