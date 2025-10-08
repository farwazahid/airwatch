# AirWatch - Machine Learning Model  
**2025 NASA Space Apps Challenge | Challenge 15: From EarthData to Action**

AirWatch is a machine learning-powered system developed for NASA’s Tropospheric Emissions: Monitoring of Pollution (TEMPO) mission. It forecasts air quality by combining satellite, ground-based, and spatial data to predict cleaner, safer skies through AI-driven insights.

---

## Challenge Context  
**Theme:** From EarthData to Action - Cloud Computing with Earth Observation Data for Predicting Cleaner, Safer Skies  

NASA’s TEMPO mission is transforming air quality monitoring across North America.  
Our objective was to develop a web-based application that predicts and visualizes real-time air quality using:  
- NASA TEMPO satellite data  
- Ground-based AirNow data  
- Weather and spatial information  

The project was built within 48 hours during the 2025 NASA Space Apps Challenge.

---

## Machine Learning Overview  
We developed a Spatial Multi-Output Regression model using XGBoost to predict seven pollutants simultaneously based on latitude and longitude data.

### Predicted Parameters  
| Pollutant | Description |
|------------|--------------|
| AQI | Air Quality Index |
| PM2.5 | Fine particulate matter |
| PM10 | Coarse particulate matter |
| O3 | Ozone |
| NO2 | Nitrogen Dioxide |
| CO | Carbon Monoxide |
| SO2 | Sulphur Dioxide |

---

## Model Architecture  

We used MultiOutputRegressor with an XGBoost base model.  
Each pollutant has its own regression sub-model trained on geospatial features.

## Input Features

- Latitude  
- Longitude  

---

## Target Variables

- AQI  
- PM2.5  
- PM10  
- O3  
- NO2  
- CO  
- SO2  

---

## Model Evaluation

Each pollutant was evaluated using R², RMSE, and MAE metrics.

**Example Output:**
Model Evaluation (Test Set):
AQI -> R²: 0.91, RMSE: 5.62, MAE: 3.18
PM2.5 -> R²: 0.88, RMSE: 3.42, MAE: 2.01
O3 -> R²: 0.89, RMSE: 2.98, MAE: 1.75


---

## Example Prediction
new_locations = pd.DataFrame({
    'Latitude': [44.0],
    'Longitude': [-63.5]
})
predictions = model.predict(new_locations)


| Latitude | Longitude | AQI | PM2.5 | PM10 | O3 | NO2 | CO | SO2 |
|-----------|------------|-----|-------|------|----|-----|----|-----|
| 44.0 | -63.5 | 52 | 12.5 | 25.8 | 18 | 8 | 0.1 | 0.3 |

## Backend Integration

The trained model (`xgboost_air_quality_model.joblib`) was deployed using a FastAPI service hosted on Render.com, enabling real-time predictions through API endpoints.

**Example:**
| Latitude | Longitude | AQI | PM2.5 | PM10 | O3 | NO2 | CO | SO2 |
|-----------|------------|-----|-------|------|----|-----|----|-----|
| 44.0 | -63.5 | 52 | 12.5 | 25.8 | 18 | 8 | 0.1 | 0.3 |

## Backend Integration

The trained model (`xgboost_air_quality_model.joblib`) was deployed using a FastAPI service hosted on Render.com, enabling real-time predictions through API endpoints.

**Example:**
POST /predict
{
  "Latitude": 44.0,
  "Longitude": -63.5
}


---

## Tech Stack

| Category | Tools Used |
|-----------|-------------|
| Data | AirNow (Ground Data) |
| ML Framework | XGBoost, scikit-learn |
| API | FastAPI |
| Cloud | Render.com |
| Visualization | Mapbox, Next.js Frontend |
| Collaboration | GitHub, Google Colab |

---

## Future Work

- Integrate NASA TEMPO hourly NO₂ and O₃ data for temporal modeling  
- Use Prophet for AQI time-series forecasting  
- Add Kriging or Graph Neural Networks for improved spatial interpolation  
- Build a mobile-first version of the dashboard  

---

## Team AirWatch

Developed during the NASA Space Apps Challenge 2025 (48-hour hackathon)

| Name | Role | Contribution |
|------|------|---------------|
| Farwa Zahid | Machine Learning & Data Science | Data preprocessing, feature engineering, model training, and evaluation |
| Khawaja Azfar Asif | Machine Learning & Data Science | FastAPI setup, API integration, Render deployment |
| Tayyab Saeed | Full Stack Engineer | Frontend (Next.js), UI/UX, Mapbox visualization |
| Mohammad Nawal Ali | Software Engineer | CI/CD, documentation, architecture setup |

---

## Project Links

- **Frontend (Live):** [airwatch.health](https://www.airwatch.health/)  
- **Project details:** [Nasa Space Apps Challenge Details](https://www.spaceappschallenge.org/2025/find-a-team/thunders/?tab=project0)
- **Demo Video:** [Demo Video here](https://drive.google.com/file/d/1wenIBjF6wWF6EAM3gaUe4VN70b1P4hv4/view?usp=sharing)

---

## Summary

AirWatch connects Earth observation and machine learning to deliver real-time air quality forecasting.  
By using satellite and ground data, it predicts pollutant levels, visualizes AQI dynamically, and helps individuals and cities make informed, health-driven decisions.


