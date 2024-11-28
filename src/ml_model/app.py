from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os

# Initialize FastAPI
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check the current working directory and available files
print("Current working directory:", os.getcwd())
print("Files in the current directory:", os.listdir(os.getcwd()))

# Load the ML model
try:
    model = joblib.load("C:/Users/anilp/Desktop/Nextjs-Login/src/ml_model/model.joblib")
  # Replace with the correct path if needed
except FileNotFoundError:
    print("Error: The model file 'model.joblib' was not found. Please check the path.")
    raise  # Optional: raise the error again after logging

# Define the input data model
class ModelInput(BaseModel):
    feature1: float
    feature2: float
    # Add more fields as needed

# Define the prediction endpoint
@app.post("/predict")
async def predict(input_data: ModelInput):
    data = [[input_data.feature1, input_data.feature2]]  # Adjust based on model requirements
    prediction = model.predict(data)
    return {"prediction": prediction[0]}
