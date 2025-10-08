# Getting Started - First Hour Checklist

## 🚀 START HERE - Read This First!

This is your **immediate action guide** for the first hour. Follow these steps in order.

---

## ⏰ BEFORE THE HACKATHON (Do This Tonight!)

### All Team Members
- [ ] Read the main plan: `NASA_HACKATHON_2DAY_PLAN.md`
- [ ] Install required software:
  - **ML Team**: Python 3.9+, pip, Git
  - **Frontend Team**: Node.js 18+, npm, Git
  - **All**: VS Code (or preferred IDE)
- [ ] Create accounts (free tier):
  - GitHub account
  - Railway.app (for ML team)
  - Vercel.com (for Frontend team)
  - NASA Earthdata: https://urs.earthdata.nasa.gov/users/new
- [ ] Join team communication:
  - Set up Discord/Slack channel
  - Exchange phone numbers (backup)
- [ ] Get a good night's sleep! 😴

---

## ⏰ HOUR 1: Saturday 9:00 AM - 10:00 AM

### Step 1: Team Meetup (9:00 AM - 9:15 AM)
**Location**: [Add your meetup location]

**Quick introductions:**
- Name, role, experience level
- Preferred tools/libraries
- Any constraints (need to leave early, etc.)

---

### Step 2: Repository Setup (9:15 AM - 9:30 AM)
**Owner**: Frontend Engineer 1

**Actions:**
```bash
# Create repository
# On GitHub.com: New Repository → airwatch-mvp → Public → Add README

# Clone to local
git clone https://github.com/YOUR-USERNAME/airwatch-mvp.git
cd airwatch-mvp

# Create folder structure
mkdir backend frontend data docs
touch README.md
```

**Add collaborators**: Settings → Collaborators → Add all team members

---

### Step 3: Backend Setup (9:30 AM - 9:50 AM)
**Owner**: ML Team

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install core dependencies
pip install fastapi uvicorn[standard] scikit-learn xgboost pandas numpy requests python-dotenv pydantic

# Save dependencies
pip freeze > requirements.txt

# Create main.py
```

**Create `backend/main.py`:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AirWatch API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AirWatch API v1.0 - Ready!"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Run with: uvicorn main:app --reload --port 8000
```

**Test it:**
```bash
# Terminal 1
uvicorn main:app --reload --port 8000

# Terminal 2 (or browser)
curl http://localhost:8000
# Should see: {"message": "AirWatch API v1.0 - Ready!"}
```

✅ **Success Criteria**: API running on http://localhost:8000

---

### Step 4: Frontend Setup (9:30 AM - 9:50 AM)
**Owner**: Frontend Team

```bash
# Navigate to project root
cd ..

# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
cd frontend

# Install additional libraries
npm install antd leaflet react-leaflet recharts axios
npm install -D @types/leaflet

# Start dev server
npm run dev
```

**Configure Ant Design - Create `frontend/app/providers.tsx`:**
```typescript
'use client';
import { ConfigProvider } from 'antd';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

**Update `frontend/app/layout.tsx` to include Ant Design:**
```typescript
import { AntdProvider } from './providers';
import 'antd/dist/reset.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
```

**Test it:**
```bash
npm run dev
# Open browser to http://localhost:3000
# Should see Next.js welcome page
```

✅ **Success Criteria**: Next.js app running on http://localhost:3000

---

### Step 5: Commit & Push (9:50 AM - 10:00 AM)
**Owner**: All Team Members

```bash
# From project root
git add .
git commit -m "Initial project setup - backend and frontend"
git push origin main

# Create development branches
git checkout -b ml-dev
git push origin ml-dev

git checkout main
git checkout -b frontend-dev
git push origin frontend-dev

git checkout main
```

✅ **Success Criteria**: All code pushed to GitHub

---

## ⏰ HOUR 2: Saturday 10:00 AM - 11:00 AM

### ML Team: Data Acquisition

**Step 1: Get NASA Earthdata Account**
1. Go to: https://urs.earthdata.nasa.gov/
2. Login with credentials
3. Approve applications: Giovanni, LAADS DAAC

**Step 2: Quick Data Download**
Use Giovanni (no coding required):
1. Go to: https://giovanni.gsfc.nasa.gov/giovanni/
2. Select "Area Plot"
3. Choose dataset: "MODIS Terra Aerosol Optical Depth"
4. Select region: Your target area (e.g., USA, Europe)
5. Date range: Last 30 days
6. Download as CSV/NetCDF

**Step 3: Alternative - OpenAQ API**
Create `backend/data_fetcher.py`:
```python
import requests
import pandas as pd
from datetime import datetime, timedelta

def fetch_openaq_data(lat, lon, radius_km=25):
    """Fetch air quality data from OpenAQ"""
    url = "https://api.openaq.org/v2/measurements"
    
    # Get last 24 hours
    end_date = datetime.now()
    start_date = end_date - timedelta(days=1)
    
    params = {
        "coordinates": f"{lat},{lon}",
        "radius": radius_km * 1000,  # Convert to meters
        "date_from": start_date.isoformat(),
        "date_to": end_date.isoformat(),
        "limit": 1000
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return pd.DataFrame(data['results'])
    else:
        return None

# Test it
if __name__ == "__main__":
    # Test with New York coordinates
    df = fetch_openaq_data(40.7128, -74.0060)
    if df is not None:
        print(f"Fetched {len(df)} measurements")
        print(df.head())
        df.to_csv("../data/openaq_sample.csv", index=False)
    else:
        print("Failed to fetch data")
```

**Run it:**
```bash
cd backend
python data_fetcher.py
# Should create data/openaq_sample.csv
```

---

### Frontend Team: Basic UI

**Step 1: Create Layout Component**
Create `frontend/src/components/Layout.tsx`:
```typescript
'use client';
import { Layout as AntLayout } from 'antd';
import { ReactNode } from 'react';

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-blue-600">
        <div className="text-white">
          <h1 className="text-2xl font-bold m-0">AirWatch</h1>
          <p className="text-sm m-0">Predicting Cleaner, Safer Skies</p>
        </div>
      </Header>
      <Content className="container mx-auto p-4">
        {children}
      </Content>
      <Footer className="text-center">
        AirWatch ©2025 - NASA Space Apps Challenge
      </Footer>
    </AntLayout>
  );
}
```

**Step 2: Create Home Page**
Update `frontend/app/page.tsx`:
```typescript
'use client';
import { Card, Typography } from 'antd';
import Layout from '@/components/Layout';

const { Title, Text } = Typography;

export default function Home() {
  return (
    <Layout>
      <Card className="shadow-lg">
        <Title level={2}>Welcome to AirWatch</Title>
        <Text className="text-gray-600">
          Real-time air quality predictions using NASA Earth observation data
        </Text>
        <div className="mt-4 h-96 bg-gray-200 rounded flex items-center justify-center">
          <Text className="text-gray-500">Map will go here</Text>
        </div>
      </Card>
    </Layout>
  );
}
```

**Test it**: Should see Ant Design styled header and card layout

---

## ⏰ CHECKPOINT: 11:00 AM

### Everyone: Quick Standup
**5 minutes - share progress:**

**ML Team should have:**
- [ ] Backend API running
- [ ] Data downloaded (at least one source)
- [ ] Basic data exploration started

**Frontend Team should have:**
- [ ] React app running
- [ ] Basic layout created
- [ ] Tailwind CSS working

**Blockers?** → Discuss and solve together

**Next steps?** → Refer to main plan

---

## 🆘 Common Issues & Quick Fixes

### Issue: Python virtual environment won't activate
**Fix (Windows)**:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: npm install fails
**Fix**:
```bash
# Clear cache
npm cache clean --force
# Delete node_modules and try again
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port already in use
**Fix**:
```bash
# Backend (port 8000)
uvicorn main:app --reload --port 8001

# Frontend (port 5173)
npm run dev -- --port 5174
```

### Issue: CORS errors
**Fix**: Already handled in backend setup. If still occurs:
- Check backend is running
- Check frontend is using correct API URL
- Clear browser cache

### Issue: NASA Earthdata access denied
**Fix**: Use OpenAQ API instead (easier for hackathon)

---

## 📋 Hour 1 Checklist (MUST COMPLETE)

- [ ] All team members present
- [ ] GitHub repository created
- [ ] Backend running (http://localhost:8000)
- [ ] Frontend running (http://localhost:5173)
- [ ] All code committed to Git
- [ ] Communication channels set up
- [ ] Team knows next steps

**If all checked → You're on track! 🎉**

---

## 📞 Emergency Contact

**Team Lead**: _______________
**Phone**: _______________

**ML Lead**: _______________
**Phone**: _______________

**Frontend Lead**: _______________
**Phone**: _______________

---

## 🎯 Remember

1. **Don't panic** - It's normal to face issues
2. **Ask for help** - Team collaboration is key
3. **Keep it simple** - MVP > perfection
4. **Have fun** - This is a learning experience!

---

## 📚 Next Steps

After Hour 1, refer to:
- `NASA_HACKATHON_2DAY_PLAN.md` - Full 2-day plan
- `QUICK_REFERENCE_GUIDE.md` - Code snippets
- `TASK_TRACKER.md` - Track your progress

---

**Good luck! You've got this! 🚀**

