import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
from fastapi import FastAPI
from pydantic import BaseModel
from inference.predict import predict_emotion
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ThoughtRequest(BaseModel):
    thought:str

@app.get("/")
def root():
    return {"message": "API running"}

@app.post("/predict")
def predict(request:ThoughtRequest):
    result = predict_emotion(request.thought)
    return result