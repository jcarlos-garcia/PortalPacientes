from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer
import jwt
from jwt.algorithms import RSAAlgorithm
import requests
from core.config import settings

bearer = HTTPBearer()

def get_public_keys():
    url = f"https://login.microsoftonline.com/{settings.azure_tenant_id}/discovery/v2.0/keys"
    return requests.get(url).json()["keys"]

public_keys = get_public_keys()

def validate_jwt(token: str):
    try:
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header["kid"]

        key_data = next(k for k in public_keys if k["kid"] == kid)

        public_key = RSAAlgorithm.from_jwk(key_data)

        decoded = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=settings.azure_api_audience,
            options={"verify_exp": True}
        )

        return decoded
    except Exception:
        raise HTTPException(401, "Token inválido")

def get_current_user(token=Security(bearer)):
    jwt_data = validate_jwt(token.credentials)
    return jwt_data
