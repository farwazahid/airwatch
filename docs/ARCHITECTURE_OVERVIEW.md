# AirWatch - Technical Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER DEVICE                          │
│                    (Web Browser / Mobile)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FRONTEND LAYER                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React.js Application                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Map View  │  │ Dashboard  │  │ Prediction │     │  │
│  │  │  (Leaflet) │  │  (Charts)  │  │   Panel    │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │        State Management (Context API)         │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │          API Service Layer (Axios)            │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Deployment: Vercel / Netlify                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (JSON)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    BACKEND LAYER                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              FastAPI Application                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │              API Endpoints                      │  │  │
│  │  │  • POST /predict/air-quality                    │  │  │
│  │  │  • POST /predict/aviation-safety                │  │  │
│  │  │  • GET  /historical-data                        │  │  │
│  │  │  • GET  /current-conditions                     │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         Business Logic Layer                    │  │  │
│  │  │  • Request validation                           │  │  │
│  │  │  • Data preprocessing                           │  │  │
│  │  │  • Response formatting                          │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │           ML Inference Engine                   │  │  │
│  │  │  ┌──────────────┐    ┌──────────────┐          │  │  │
│  │  │  │ Air Quality  │    │   Aviation   │          │  │  │
│  │  │  │    Model     │    │ Safety Model │          │  │  │
│  │  │  │  (XGBoost)   │    │  (Random F.) │          │  │  │
│  │  │  └──────────────┘    └──────────────┘          │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Deployment: Railway / Render                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      DATA LAYER                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    NASA      │  │    NASA      │  │   Sentinel   │     │
│  │    MODIS     │  │   MERRA-2    │  │  -5P (ESA)   │     │
│  │   (Aerosol)  │  │  (Weather)   │  │  (TROPOMI)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   OpenAQ     │  │ OpenWeather  │                        │
│  │     API      │  │     API      │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
│  Data Sources: Public APIs & NASA Earthdata                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### User Query → Prediction Flow

```
1. User selects location on map
           ↓
2. Frontend captures coordinates (lat, lon)
           ↓
3. API call: POST /predict/air-quality
   {
     "latitude": 40.7128,
     "longitude": -74.0060,
     "timestamp": "2025-10-04T15:00:00Z"
   }
           ↓
4. Backend receives request
           ↓
5. Preprocessing:
   - Validate coordinates
   - Extract temporal features (hour, day, season)
   - Fetch recent meteorological data
           ↓
6. ML Model Inference:
   - Load trained XGBoost model
   - Prepare feature vector
   - Generate prediction
   - Calculate confidence interval
           ↓
7. Post-processing:
   - Convert to AQI scale
   - Determine health category
   - Generate recommendations
           ↓
8. API response:
   {
     "pm25": 35.2,
     "no2": 28.4,
     "o3": 42.1,
     "aqi": 85,
     "status": "moderate",
     "confidence": 0.87,
     "health_advice": "Sensitive groups should reduce outdoor activity",
     "forecast": [...]
   }
           ↓
9. Frontend displays:
   - Update map overlay
   - Show AQI card with color coding
   - Display chart with forecast
   - Show health recommendations
```

---

## Component Breakdown

### Frontend Components (Next.js Structure)

```
frontend/
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── globals.css                  # Global styles
│   ├── providers.tsx                # Ant Design ConfigProvider
│   │
│   ├── dashboard/                   # Dashboard route
│   │   └── page.tsx
│   │
│   └── predictions/                 # Predictions route
│       └── page.tsx
│
└── src/
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx           # Navigation bar (Ant Design Layout.Header)
    │   │   ├── Sidebar.tsx          # Side menu (Ant Design Menu)
    │   │   └── Footer.tsx           # Footer
    │   │
    │   ├── map/
    │   │   ├── MapView.tsx          # Main map (dynamic import)
    │   │   ├── HeatmapLayer.tsx     # Air quality overlay
    │   │   ├── LocationMarker.tsx   # Custom markers
    │   │   └── SearchBox.tsx        # Location search (Ant Design AutoComplete)
    │   │
    │   ├── dashboard/
    │   │   ├── Dashboard.tsx        # Main dashboard
    │   │   ├── AirQualityCard.tsx   # Ant Design Card + Statistic
    │   │   ├── PredictionCard.tsx   # Ant Design Timeline
    │   │   ├── AlertBanner.tsx      # Ant Design Alert
    │   │   └── StatsSummary.tsx     # Ant Design Statistic
    │   │
    │   ├── charts/
    │   │   ├── TimeSeriesChart.tsx  # Recharts Line Chart
    │   │   ├── ForecastChart.tsx    # Recharts Area Chart
    │   │   └── ComparisonChart.tsx  # Recharts Bar Chart
    │   │
    │   └── common/
    │       ├── Loading.tsx          # Ant Design Spin
    │       └── ErrorMessage.tsx     # Ant Design Alert
    │
    ├── lib/
    │   ├── api.ts                   # API client (uses NEXT_PUBLIC_ env vars)
    │   └── dataTransform.ts         # Data utilities
    │
    ├── hooks/
    │   ├── useAirQuality.ts         # AQ data hook
    │   └── useGeolocation.ts        # Location hook
    │
    ├── types/
    │   ├── api.ts                   # API TypeScript types
    │   └── components.ts            # Component prop types
    │
    └── styles/
        └── leaflet.css              # Leaflet style overrides
```

### Backend Structure

```
backend/
├── main.py                         # FastAPI app entry
├── requirements.txt                # Dependencies
│
├── models/
│   ├── air_quality_model.pkl       # Trained AQ model
│   ├── aviation_model.pkl          # Trained aviation model
│   └── model_metadata.json         # Model info
│
├── routers/
│   ├── predictions.py              # Prediction endpoints
│   └── data.py                     # Data endpoints
│
├── services/
│   ├── ml_inference.py             # ML prediction logic
│   ├── data_fetcher.py             # Fetch NASA data
│   └── preprocessor.py             # Data preprocessing
│
├── schemas/
│   ├── requests.py                 # Request models
│   └── responses.py                # Response models
│
├── utils/
│   ├── aqi_calculator.py           # AQI conversion
│   ├── health_advisor.py           # Health recommendations
│   └── validators.py               # Input validation
│
├── data/
│   ├── raw/                        # Raw NASA data
│   ├── processed/                  # Cleaned data
│   └── cache/                      # Cached predictions
│
└── tests/
    ├── test_api.py                 # API tests
    └── test_models.py              # Model tests
```

---

## Machine Learning Pipeline

### Training Pipeline (Offline)

```
1. Data Collection
   ├── Download NASA MODIS data (AOD)
   ├── Download NASA MERRA-2 data (weather)
   ├── Download Sentinel-5P data (NO2, SO2)
   └── Fetch OpenAQ ground truth data

2. Data Preprocessing
   ├── Handle missing values (interpolation)
   ├── Remove outliers (IQR method)
   ├── Normalize features (StandardScaler)
   └── Create temporal features

3. Feature Engineering
   ├── Temporal: hour, day_of_week, month, season
   ├── Spatial: latitude, longitude, elevation
   ├── Meteorological: temp, humidity, wind_speed, pressure
   ├── Pollutant proxies: AOD, NO2, SO2
   └── Lagged features: previous 24h averages

4. Model Training
   ├── Split: 80% train, 20% test
   ├── Cross-validation: 5-fold
   ├── Algorithm: XGBoost Regression
   ├── Hyperparameter tuning: GridSearchCV
   └── Evaluation: RMSE, MAE, R²

5. Model Serialization
   ├── Save model: pickle/joblib
   ├── Save scaler: pickle
   └── Save metadata: JSON
```

### Inference Pipeline (Online)

```
1. Receive request (lat, lon, timestamp)
   ↓
2. Fetch real-time data
   ├── Current meteorological conditions
   ├── Recent satellite observations
   └── Historical context (past 24h)
   ↓
3. Feature extraction
   ├── Apply same preprocessing as training
   ├── Create feature vector
   └── Scale features
   ↓
4. Model inference
   ├── Load trained model from disk
   ├── Generate prediction
   └── Calculate confidence interval
   ↓
5. Post-processing
   ├── Convert to standard units
   ├── Calculate AQI
   ├── Generate health advice
   └── Create forecast (next 24 hours)
   ↓
6. Return structured response
```

---

## API Specification

### Endpoints

#### 1. Air Quality Prediction
```
POST /predict/air-quality

Request:
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "timestamp": "2025-10-04T15:00:00Z"
}

Response:
{
  "timestamp": "2025-10-04T15:00:00Z",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "city": "New York, NY"
  },
  "current": {
    "pm25": 35.2,
    "pm10": 45.8,
    "no2": 28.4,
    "o3": 42.1,
    "so2": 8.2,
    "co": 0.6,
    "aqi": 85
  },
  "forecast": [
    {
      "hour": 16,
      "pm25": 38.5,
      "aqi": 90,
      "confidence": 0.87
    },
    ...
  ],
  "status": "moderate",
  "health_advice": "Sensitive groups should reduce outdoor activity",
  "color": "#FFFF00"
}
```

#### 2. Aviation Safety Assessment
```
POST /predict/aviation-safety

Request:
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "timestamp": "2025-10-04T15:00:00Z",
  "altitude_ft": 35000
}

Response:
{
  "timestamp": "2025-10-04T15:00:00Z",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "safety_score": 85,
  "risk_level": "low",
  "factors": {
    "visibility_km": 15.2,
    "wind_speed_kt": 18,
    "turbulence_risk": "low",
    "air_quality_impact": "minimal"
  },
  "recommendations": [
    "Normal operations safe",
    "Monitor wind conditions"
  ]
}
```

#### 3. Historical Data
```
GET /historical-data?lat=40.7128&lon=-74.0060&days=7

Response:
{
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "period": {
    "start": "2025-09-27T00:00:00Z",
    "end": "2025-10-04T00:00:00Z"
  },
  "data": [
    {
      "timestamp": "2025-09-27T00:00:00Z",
      "pm25": 32.1,
      "aqi": 78
    },
    ...
  ],
  "statistics": {
    "avg_aqi": 82,
    "max_aqi": 105,
    "min_aqi": 45
  }
}
```

---

## Technology Stack Details

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.x
- **UI Library**: Ant Design 5.x (50+ enterprise components)
- **Styling**: Tailwind CSS 3.x (utility-first)
- **Maps**: Leaflet.js 1.9+ with React-Leaflet (dynamic import for SSR)
- **Charts**: Recharts 2.x
- **HTTP Client**: Axios
- **State Management**: Zustand (lightweight)
- **Routing**: Next.js App Router (file-based)

### Backend
- **Framework**: FastAPI 0.100+
- **Language**: Python 3.9+
- **ML Libraries**:
  - scikit-learn 1.3+
  - XGBoost 2.0+
  - pandas 2.0+
  - numpy 1.24+
- **Data Processing**: pandas, numpy
- **API Docs**: Swagger/OpenAPI (built-in)
- **Server**: Uvicorn (ASGI)

### Data Sources
- **NASA MODIS**: Aerosol Optical Depth (AOD)
- **NASA MERRA-2**: Meteorological reanalysis
- **Sentinel-5P TROPOMI**: NO2, SO2, CO
- **OpenAQ**: Ground station validation
- **OpenWeather**: Real-time weather

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render
- **Database**: SQLite (simple) or Firebase
- **CDN**: Cloudflare (optional)

---

## Performance Considerations

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization (WebP format)
- Lazy loading for map tiles
- Debouncing search inputs (500ms)
- Caching API responses (5-10 min)

### Backend Optimization
- Response caching (Redis/in-memory)
- Async API calls to external services
- Model loading at startup (not per request)
- Request validation with Pydantic
- Connection pooling for external APIs

### Expected Performance
- **API Response Time**: < 500ms
- **Frontend Load Time**: < 3s
- **Map Interaction**: 60 FPS
- **Concurrent Users**: 100+ (with caching)

---

## Security Considerations

### API Security
- CORS configuration (specific origins)
- Rate limiting (10 requests/minute per IP)
- Input validation (Pydantic schemas)
- No sensitive data in logs
- Environment variables for secrets

### Frontend Security
- XSS prevention (React default escaping)
- HTTPS only
- Content Security Policy headers
- No API keys in client code

---

## Scalability Path

### Phase 1: MVP (Hackathon)
- Single server deployment
- In-memory caching
- Pre-trained models

### Phase 2: Production
- Horizontal scaling (multiple instances)
- Redis cache layer
- CDN for static assets
- Model versioning

### Phase 3: Enterprise
- Kubernetes orchestration
- Real-time data pipelines
- Model retraining automation
- Global distribution

---

## Monitoring & Observability

### Metrics to Track
- API response times
- Prediction accuracy
- Error rates
- User engagement

### Tools (Post-Hackathon)
- Sentry for error tracking
- Google Analytics for usage
- Prometheus for metrics
- Grafana for dashboards

---

This architecture is designed to be:
- ✅ Simple to implement in 2 days
- ✅ Scalable for future growth
- ✅ Maintainable by small team
- ✅ Impressive for judges
- ✅ Educational for all team members

Good luck with the hackathon! 🚀

