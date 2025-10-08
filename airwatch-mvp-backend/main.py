import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
import os

# --- 1. Load the Model ---
MODEL_PATH = "xgboost_air_quality_model.joblib"

# Check if the model file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model file not found at: {MODEL_PATH}. "
        "Please ensure 'xgboost_air_quality_model.joblib' is in the same directory."
    )

try:
    # Load the trained model using joblib
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully!")
except Exception as e:
    raise RuntimeError(f"Failed to load the model: {e}")


# --- 2. Define the FastAPI Application ---
app = FastAPI(
    title="Air Quality Prediction API",
    description="API for predicting 6 air pollutants based on Latitude and Longitude using an XGBoost Multi-Output Regressor.",
    version="1.0.0"
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- 3. Define Input Data Structure (Pydantic Schema) ---
class PredictionInput(BaseModel):
    """Schema for a single location input."""
    Latitude: float = Field(..., description="Geographic Latitude of the monitoring station.")
    Longitude: float = Field(..., description="Geographic Longitude of the monitoring station.")

class PredictionOutput(BaseModel):
    """
    REVISED Schema for a single prediction output.
    AQI, PM2_5, PM10, O3, NO2 are int. CO and SO2 remain float for one decimal precision.
    """
    AQI: int = Field(..., description="Predicted AQI value (integer).")
    PM2_5: int = Field(..., description="Predicted PM2.5 concentration (ug/m3, integer).")
    PM10: int = Field(..., description="Predicted PM10 concentration (ug/m3, integer).")
    O3: int = Field(..., description="Predicted Ozone concentration (ppb, integer).")
    NO2: int = Field(..., description="Predicted Nitrogen Dioxide concentration (ppb, integer).")
    CO: float = Field(..., description="Predicted Carbon Monoxide concentration (ppm, 1 decimal float).")
    SO2: float = Field(..., description="Predicted Sulfur Dioxide concentration (ppb, 1 decimal float).")

class PredictionBatchInput(BaseModel):
    """Schema for batch prediction input (a list of locations)."""
    locations: List[PredictionInput]


# --- 4. Define API Endpoints ---
@app.post("/predict", response_model=List[PredictionOutput])
async def predict_air_quality(data: PredictionBatchInput):
    """
    Accepts a list of Latitude/Longitude pairs and returns the predicted
    concentrations for 6 air pollutants for each location.
    """
    try:
        # Convert list of Pydantic models to a DataFrame
        input_data = [loc.dict() for loc in data.locations]
        X_df = pd.DataFrame(input_data)

        # Ensure the columns match the training features
        if list(X_df.columns) != ['Latitude', 'Longitude']:
            raise ValueError("Input data must contain 'Latitude' and 'Longitude' columns.")

        # Make the prediction
        predictions_array = model.predict(X_df)

        # Define the order of the predicted output columns
        output_targets = ['AQI', 'PM2_5', 'PM10', 'O3', 'NO2', 'CO', 'SO2']

        # Format the predictions into the Pydantic output schema
        results = []
        for pred in predictions_array:
            # Create a dictionary mapping the output target names to the predicted values
            prediction_dict = dict(zip(output_targets, pred.tolist()))

            # Apply the required type conversions and rounding
            
            # 1. Round and convert to int for AQI, PM2_5, PM10, O3, NO2
            prediction_dict['AQI'] = int(round(prediction_dict['AQI']))
            prediction_dict['PM2_5'] = int(round(prediction_dict['PM2_5']))
            prediction_dict['PM10'] = int(round(prediction_dict['PM10']))
            prediction_dict['O3'] = int(round(prediction_dict['O3']))
            prediction_dict['NO2'] = int(round(prediction_dict['NO2']))
            
            # 2. Round to 1 decimal place for CO and SO2
            prediction_dict['CO'] = round(prediction_dict['CO'], 1)
            prediction_dict['SO2'] = round(prediction_dict['SO2'], 1)

            results.append(PredictionOutput(**prediction_dict))

        return results

    except Exception as e:
        # Catch any modeling or data processing errors
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
