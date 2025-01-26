from fastapi import FastAPI, Depends, HTTPException,Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from app.routers import user ,artisan,editArtisanProfile,editUserProfile,ArtisanPortfolio,ArtisanCertificat,messages
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from typing import Optional
from .config import API_KEY,API_SECRET,CLOUD_NAME
import os
from dotenv import load_dotenv

load_dotenv()  

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)
app.include_router(artisan.router)
app.include_router(editUserProfile.router)
app.include_router(editArtisanProfile.router)
app.include_router(ArtisanPortfolio.router)
app.include_router(ArtisanCertificat.router)
app.include_router(messages.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


app.add_middleware(SessionMiddleware, secret_key="projet1cssecretpassword" ) 


@app.get("/")
def home():
    return {"message ":"hello"}

print(os.getenv("API_KEY"))