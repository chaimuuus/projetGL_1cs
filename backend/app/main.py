from fastapi import FastAPI, Depends, HTTPException,Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from app.routers import example ,user ,artisan,editArtisanProfile,editUserProfile,ArtisanPortfolio,ArtisanCertificat

from starlette.middleware.sessions import SessionMiddleware

from typing import Optional


app = FastAPI()

app.include_router(example.router)
app.include_router(user.router)
app.include_router(artisan.router)
app.include_router(editUserProfile.router)
app.include_router(editArtisanProfile.router)
app.include_router(ArtisanPortfolio.router)
app.include_router(ArtisanCertificat.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


app.add_middleware(SessionMiddleware, secret_key="projet1cssecretpassword" ) 


@app.get("/")
def home():
    return {"message ":"hello"}

