# Quick Reference Guide - NASA Hackathon

## 🚀 Quick Start Commands

### ML Team Setup
```bash
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn scikit-learn xgboost pandas numpy requests python-dotenv
pip freeze > requirements.txt

# Run backend
uvicorn main:app --reload --port 8000
```

### Frontend Team Setup
```bash
# Frontend setup with Next.js
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npm install antd leaflet react-leaflet recharts axios
npm install -D @types/leaflet

# Run frontend
npm run dev
```

---

## 📊 Key NASA Data Sources

### Direct Download Links
1. **MODIS Aerosol Data**: https://ladsweb.modaps.eosdis.nasa.gov/
2. **MERRA-2**: https://gmao.gsfc.nasa.gov/reanalysis/MERRA-2/
3. **Giovanni (Browser-based)**: https://giovanni.gsfc.nasa.gov/giovanni/
4. **Earthdata Search**: https://search.earthdata.nasa.gov/

### Quick Access (No Auth)
- **OpenAQ API**: https://docs.openaq.org/
- **OpenWeather API**: https://openweathermap.org/api (free tier, 1000 calls/day)

---

## 🔧 Essential Code Snippets

### FastAPI Basic Structure
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    timestamp: str

@app.post("/predict/air-quality")
async def predict_air_quality(request: PredictionRequest):
    # Your ML model inference here
    return {
        "pm25": 35.2,
        "no2": 20.1,
        "aqi": 85,
        "status": "moderate"
    }

@app.get("/")
async def root():
    return {"message": "AirWatch API v1.0"}
```

### Next.js API Integration
```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const predictAirQuality = async (latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict/air-quality`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude,
        longitude,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};
```

### Leaflet Map Setup (Next.js)
```javascript
'use client';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <Spin size="large" /> }
);
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

function MapView() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Air Quality: Moderate</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
```

---

## 🎯 Decision Matrix for Common Issues

### Should we add this feature?
- **YES** if: Takes < 2 hours, core to demo, judges will notice
- **NO** if: Takes > 4 hours, edge case, purely cosmetic

### Backend vs Frontend issue?
- **Backend**: Data wrong, API errors, slow response
- **Frontend**: Display issues, layout problems, user interactions
- **Integration**: Data format mismatch, CORS errors

### Deploy now or later?
- **Deploy early** (Day 1 at 6 PM): Basic API, basic frontend
- **Continuous deployment**: Every major feature
- **Final deploy** (Day 2 at 3 PM): Production-ready version

---

## 📱 Testing Checklist

### Backend Testing
```bash
# Test API endpoint
curl -X POST http://localhost:8000/predict/air-quality \
  -H "Content-Type: application/json" \
  -d '{"latitude": 40.7128, "longitude": -74.0060, "timestamp": "2025-10-04T12:00:00Z"}'

# Check API health
curl http://localhost:8000/
```

### Frontend Testing
- [ ] Works on Chrome, Firefox, Safari
- [ ] Mobile responsive (iPhone, Android)
- [ ] All buttons clickable
- [ ] No console errors
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly

---

## 🚨 Common Errors & Fixes

### CORS Error
**Error**: "Access to fetch blocked by CORS policy"
**Fix**: Add CORS middleware to FastAPI (see code snippet above)

### API Not Found (404)
**Error**: "Cannot GET /predict/air-quality"
**Fix**: Check endpoint spelling, ensure backend is running, verify URL

### Module Not Found
**Error**: "ModuleNotFoundError: No module named 'fastapi'"
**Fix**: Activate virtual environment, run `pip install -r requirements.txt`

### React Build Errors
**Error**: "Module not found: Can't resolve..."
**Fix**: Run `npm install`, check import paths, restart dev server

---

## ⚡ Performance Optimization Tips

### Backend
- Cache predictions for same location (5-10 min TTL)
- Use async/await for API calls
- Compress response data
- Limit prediction history (last 24 hours only)

### Frontend
- Lazy load map component
- Debounce search input (500ms)
- Optimize images (use WebP, compress)
- Code splitting for charts

---

## 📦 Deployment Quick Commands

### Backend (Railway)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Backend (Render)
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel) - Optimized for Next.js
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (Vercel auto-detects Next.js)
cd frontend
vercel

# Or connect GitHub repo for auto-deployment
# Vercel will automatically deploy on push to main
```

### Frontend (Netlify)
```bash
# Build
npm run build

# Deploy via drag & drop
# Go to app.netlify.com → Sites → Drag 'dist' folder
```

---

## 📊 Sample Data Structure

### Air Quality Prediction Response
```json
{
  "timestamp": "2025-10-04T15:00:00Z",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "city": "New York"
  },
  "current": {
    "pm25": 35.2,
    "pm10": 45.8,
    "no2": 28.4,
    "o3": 42.1,
    "aqi": 85
  },
  "forecast": [
    {
      "hour": 16,
      "pm25": 38.5,
      "aqi": 90,
      "confidence": 0.87
    }
  ],
  "status": "moderate",
  "health_advice": "Sensitive groups should reduce outdoor activity"
}
```

---

## 🎤 Presentation Quick Tips

### Demo Script (2 minutes)
1. **"This is our homepage"** (5 sec) - Show map
2. **"I'll select New York"** (5 sec) - Click location
3. **"Here's current air quality"** (10 sec) - Show data
4. **"And 24-hour forecast"** (15 sec) - Show predictions
5. **"Aviation safety indicator"** (10 sec) - Show safety score
6. **"Historical trends"** (15 sec) - Show charts

### Backup Responses for Judges
**Q: "How accurate is your model?"**
A: "We achieved X% accuracy on test data, using NASA's MODIS and MERRA-2 datasets validated against ground stations."

**Q: "How does this help real users?"**
A: "Airlines can optimize routes, airports can manage operations, and citizens can plan outdoor activities safely."

**Q: "What's next for this project?"**
A: "We'd add real-time satellite feeds, expand to global coverage, and partner with aviation authorities."

---

## 🔗 Important Links

### Project Links (Update these!)
- **GitHub Repo**: [Add your repo URL]
- **Live Demo**: [Add deployment URL]
- **API Docs**: [Add API documentation URL]
- **Demo Video**: [Add YouTube link]

### Team Communication
- **Discord/Slack**: [Add invite link]
- **Shared Doc**: [Add Google Doc link]
- **Task Board**: [Add Trello/Notion link]

### Submission Portal
- **NASA Space Apps**: https://www.spaceappschallenge.org/

---

## ⏰ Critical Deadlines

### Day 1
- **6:00 PM**: First deployment (basic API + frontend)
- **9:00 PM**: Integration complete

### Day 2
- **3:00 PM**: Feature freeze (no new features!)
- **5:00 PM**: Presentation ready
- **7:00 PM**: Project submission
- **8:30 PM**: Final deadline (hard stop)

---

## 💡 Pro Tips

1. **Commit often**: Push every hour to avoid losing work
2. **Mock data first**: Frontend shouldn't wait for ML team
3. **Test on mobile**: 50% of judges will use phones
4. **Record backup demo**: In case live demo fails
5. **Practice presentation**: Run through it 3 times minimum

---

## 🆘 Emergency Contacts

### If you're stuck:
- **ML issues**: Check Stack Overflow, scikit-learn docs
- **Frontend issues**: React docs, Tailwind docs
- **Deployment issues**: Platform documentation (Railway/Vercel)
- **Data access**: NASA Earthdata forum

### Backup Resources
- **Alternative datasets**: World Air Quality Index (waqi.info)
- **Alternative ML**: Use pre-trained models (Hugging Face)
- **Alternative deployment**: Use Replit (no setup needed)

---

**Remember**: Better to have a simple, working demo than a complex, broken one. Focus on the story you're telling! 🎯

