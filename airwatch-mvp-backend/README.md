# 🌍 Air Quality Prediction API

This FastAPI app predicts AQI pollutants (`PM2.5`, `PM10`, `O3`, `NO2`, `CO`, `SO2`)  
based on **Latitude** and **Longitude**.

## 🚀 Endpoints
- `/` — health check  
- `/predict` — POST endpoint for predictions

### Example request:
```json
{
  "locations": [
    {"Latitude": 33.6844, "Longitude": 73.0479}
  ]
}
