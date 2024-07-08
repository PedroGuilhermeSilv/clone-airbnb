import datetime as time
import logging
from datetime import datetime, timedelta
from typing import Any

from django.conf.global_settings import settings
from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

logging.getLogger("passlib").setLevel(logging.ERROR)

ALGORITHM = settings.ALGORITHM


def create_access_token(subject: str | Any, expires_delta: int) -> str:
    expire = datetime.now(time.UTC) + timedelta(minutes=expires_delta)
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> str| None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except jwt.JWTError:
        return None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str | None) -> str | None:
    if not password:
        return None
    return pwd_context.hash(password)
