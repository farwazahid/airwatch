# Repository Structure Guide

## 🎯 Recommended Structure for Your Hackathon Repo

```
nasa-hackathon-2025/
│
├── 📁 docs/                          # All planning documentation
│   ├── OVERVIEW.md
│   ├── START_HERE.md
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── NASA_HACKATHON_2DAY_PLAN.md
│   ├── QUICK_REFERENCE_GUIDE.md
│   ├── TASK_TRACKER.md
│   └── ARCHITECTURE_OVERVIEW.md
│
├── 📁 backend/                       # Python/FastAPI backend
│   ├── main.py                       # FastAPI app entry point
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   ├── Procfile                      # For Railway/Render deployment
│   │
│   ├── 📁 models/                    # Trained ML models
│   │   ├── air_quality_model.pkl
│   │   ├── aviation_model.pkl
│   │   └── scaler.pkl
│   │
│   ├── 📁 routers/                   # API routes
│   │   ├── __init__.py
│   │   ├── predictions.py            # Prediction endpoints
│   │   └── data.py                   # Data endpoints
│   │
│   ├── 📁 services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── ml_inference.py           # ML prediction logic
│   │   ├── data_fetcher.py           # Fetch NASA/OpenAQ data
│   │   └── preprocessor.py           # Data preprocessing
│   │
│   ├── 📁 schemas/                   # Pydantic models
│   │   ├── __init__.py
│   │   ├── requests.py               # Request schemas
│   │   └── responses.py              # Response schemas
│   │
│   ├── 📁 utils/                     # Helper functions
│   │   ├── __init__.py
│   │   ├── aqi_calculator.py         # AQI calculations
│   │   ├── health_advisor.py         # Health recommendations
│   │   └── validators.py             # Input validation
│   │
│   ├── 📁 data/                      # Data storage
│   │   ├── raw/                      # Raw NASA data
│   │   ├── processed/                # Cleaned data
│   │   └── cache/                    # Cached predictions
│   │
│   ├── 📁 notebooks/                 # Jupyter notebooks
│   │   ├── data_exploration.ipynb
│   │   └── model_training.ipynb
│   │
│   └── 📁 tests/                     # Backend tests
│       ├── __init__.py
│       ├── test_api.py
│       └── test_models.py
│
├── 📁 frontend/                      # Next.js frontend
│   ├── package.json                  # Node dependencies
│   ├── package-lock.json
│   ├── next.config.js                # Next.js configuration
│   ├── tsconfig.json                 # TypeScript config
│   ├── .env.example                  # Environment variables
│   ├── tailwind.config.ts            # Tailwind CSS config
│   ├── postcss.config.js             # PostCSS config
│   │
│   ├── 📁 public/                    # Static assets (served from root)
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── demo-video.mp4
│   │
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── providers.tsx             # Context providers (Ant Design)
│   │   │
│   │   ├── 📁 dashboard/             # Dashboard route
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 predictions/           # Predictions route
│   │   │   └── page.tsx
│   │   │
│   │   └── 📁 api/                   # API routes (optional)
│   │       └── hello/
│   │           └── route.ts
│   │
│   └── 📁 src/                       # Source code
│       │
│       ├── 📁 components/            # React components
│       │   │
│       │   ├── 📁 layout/
│       │   │   ├── Header.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── Layout.tsx
│       │   │
│       │   ├── 📁 map/
│       │   │   ├── MapView.tsx
│       │   │   ├── HeatmapLayer.tsx
│       │   │   ├── LocationMarker.tsx
│       │   │   └── SearchBox.tsx
│       │   │
│       │   ├── 📁 dashboard/
│       │   │   ├── Dashboard.tsx
│       │   │   ├── AirQualityCard.tsx
│       │   │   ├── PredictionCard.tsx
│       │   │   ├── AlertBanner.tsx
│       │   │   └── StatsSummary.tsx
│       │   │
│       │   ├── 📁 charts/
│       │   │   ├── TimeSeriesChart.tsx
│       │   │   ├── ForecastChart.tsx
│       │   │   └── ComparisonChart.tsx
│       │   │
│       │   └── 📁 common/
│       │       ├── Button.tsx
│       │       ├── Card.tsx
│       │       ├── Loading.tsx
│       │       └── ErrorMessage.tsx
│       │
│       ├── 📁 lib/                   # Library code
│       │   ├── api.ts                # API client
│       │   └── dataTransform.ts      # Data utilities
│       │
│       ├── 📁 hooks/                 # Custom hooks
│       │   ├── useAirQuality.ts
│       │   ├── useGeolocation.ts
│       │   └── useForecast.ts
│       │
│       ├── 📁 types/                 # TypeScript types
│       │   ├── api.ts
│       │   └── components.ts
│       │
│       ├── 📁 utils/                 # Helper functions
│       │   ├── constants.ts
│       │   ├── formatters.ts
│       │   └── validators.ts
│       │
│       └── 📁 styles/                # Additional styles
│           └── leaflet.css           # Leaflet overrides
│
├── 📁 presentation/                  # Presentation materials
│   ├── slides.pdf                    # Final presentation
│   ├── slides.pptx                   # PowerPoint source
│   ├── demo-script.md                # Demo walkthrough
│   ├── screenshots/                  # App screenshots
│   └── demo-video.mp4                # Recorded demo
│
├── 📁 .github/                       # GitHub specific
│   └── workflows/
│       ├── backend-deploy.yml        # Backend CI/CD (optional)
│       └── frontend-deploy.yml       # Frontend CI/CD (optional)
│
├── .gitignore                        # Git ignore rules
├── README.md                         # Main project README
├── LICENSE                           # MIT License
└── CONTRIBUTING.md                   # Contribution guidelines (optional)
```

---

## 📋 Essential Files Content

### Root `README.md`
```markdown
# AirWatch - Predicting Cleaner, Safer Skies 🌤️✈️

NASA Space Apps Challenge 2025 Submission

## 🎯 Project Overview
AirWatch is a real-time air quality and aviation safety prediction platform 
using NASA Earth observation data.

## 🚀 Live Demo
- **Frontend**: https://airwatch.vercel.app
- **API**: https://airwatch-api.railway.app
- **Demo Video**: [YouTube Link]

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Leaflet.js, Tailwind CSS
- **Backend**: Python 3.9, FastAPI, XGBoost, scikit-learn
- **Data**: NASA MODIS, MERRA-2, Sentinel-5P, OpenAQ

## 📚 Documentation
See `/docs` folder for complete planning and technical documentation.

## 🏃 Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👥 Team
- **ML Engineer 1**: [Name] - Air Quality Modeling
- **ML Engineer 2**: [Name] - Aviation Safety & Deployment
- **Frontend Engineer 1**: [Name] - Maps & Visualization
- **Frontend Engineer 2**: [Name] - UI/UX & Components

## 🏆 Challenge
[From EarthData to Action: Cloud Computing with Earth Observation Data 
for Predicting Cleaner, Safer Skies](challenge-link)

## 📄 License
MIT License - see LICENSE file for details

## 🙏 Acknowledgments
- NASA Earthdata
- OpenAQ
- Space Apps Challenge organizers
```

---

### `.gitignore`
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
*.egg-info/
dist/
build/

# Jupyter Notebooks
.ipynb_checkpoints/

# Environment variables
.env
*.env
!.env.example

# Data files (too large for git)
backend/data/raw/*
backend/data/processed/*
backend/data/cache/*
!backend/data/raw/.gitkeep
!backend/data/processed/.gitkeep
!backend/data/cache/.gitkeep

# Models (use Git LFS or external storage)
*.pkl
*.h5
*.model

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.vite/
frontend/build/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Testing
.coverage
htmlcov/
.pytest_cache/

# Temporary files
*.tmp
temp/
```

---

### `backend/.env.example`
```bash
# API Configuration
API_PORT=8000
API_HOST=0.0.0.0
DEBUG=False

# NASA Earthdata
NASA_USERNAME=your_username_here
NASA_PASSWORD=your_password_here

# OpenAQ API
OPENAQ_API_KEY=your_key_here  # Optional

# OpenWeather API
OPENWEATHER_API_KEY=your_key_here

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,https://airwatch.vercel.app

# Cache Settings
CACHE_TTL=300  # 5 minutes

# Model Settings
MODEL_PATH=models/
```

---

### `frontend/.env.example`
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# Map Configuration
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here  # If using Mapbox
NEXT_PUBLIC_DEFAULT_LAT=40.7128
NEXT_PUBLIC_DEFAULT_LON=-74.0060
NEXT_PUBLIC_DEFAULT_ZOOM=10

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_EXPORT=true
```

---

### `backend/Procfile` (for Railway/Render)
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### `backend/requirements.txt`
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-dotenv==1.0.0

# ML Libraries
scikit-learn==1.3.2
xgboost==2.0.2
pandas==2.1.3
numpy==1.26.2

# Data Processing
requests==2.31.0
python-multipart==0.0.6

# Optional but recommended
python-jose[cryptography]==3.3.0  # For authentication
passlib[bcrypt]==1.7.4            # For password hashing
redis==5.0.1                       # For caching
```

---

### `frontend/package.json` (key dependencies)
```json
{
  "name": "airwatch-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.4",
    "antd": "^5.12.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "recharts": "^2.10.3",
    "axios": "^1.6.2",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@types/leaflet": "^1.9.8",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-next": "^14.0.4"
  }
}
```

---

## 🚀 Setup Instructions

### Step 1: Create Repository Structure
```bash
# Navigate to your project folder
cd "C:\Users\PMLS\Desktop\Prototyping + planning"

# Create directory structure for backend
mkdir -p backend/{models,routers,services,schemas,utils,data/{raw,processed,cache},notebooks,tests}

# Create directory structure for Next.js frontend
mkdir -p frontend/app/{dashboard,predictions,api/hello}
mkdir -p frontend/src/{components/{layout,map,dashboard,charts,common},lib,hooks,types,utils,styles}
mkdir -p frontend/public
mkdir -p presentation/screenshots
mkdir -p docs

# Create .gitkeep files for empty folders
touch backend/data/raw/.gitkeep
touch backend/data/processed/.gitkeep
touch backend/data/cache/.gitkeep

# Move planning docs to docs folder
mv *.md docs/

# Copy README to root
cp docs/README.md ./README.md

# Create .gitignore
# (copy content from above)
```

---

### Step 2: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Project structure and documentation"
```

---

### Step 3: Create GitHub Repository
```bash
# On GitHub.com:
# 1. Click "New Repository"
# 2. Name: "airwatch-nasa-hackathon"
# 3. Description: "NASA Space Apps 2025 - Air Quality & Aviation Safety Predictor"
# 4. Public repository
# 5. Don't initialize with README (you already have one)
# 6. Create repository

# Then push:
git remote add origin https://github.com/YOUR-USERNAME/airwatch-nasa-hackathon.git
git branch -M main
git push -u origin main
```

---

### Step 4: Create Branch Structure
```bash
# Create development branches
git checkout -b ml-dev
git push origin ml-dev

git checkout main
git checkout -b frontend-dev
git push origin frontend-dev

git checkout main
git checkout -b integration
git push origin integration

# Main branch is protected, only merge via Pull Requests
```

---

## 📊 Git Workflow During Hackathon

### For ML Team
```bash
# Always work on ml-dev branch
git checkout ml-dev

# Make changes
# ... code ...

# Commit frequently
git add .
git commit -m "feat: Add air quality model training"
git push origin ml-dev

# When ready to integrate
git checkout integration
git merge ml-dev
git push origin integration
```

---

### For Frontend Team
```bash
# Always work on frontend-dev branch
git checkout frontend-dev

# Make changes
# ... code ...

# Commit frequently
git add .
git commit -m "feat: Add map component with heatmap overlay"
git push origin frontend-dev

# When ready to integrate
git checkout integration
git merge frontend-dev
git push origin integration
```

---

### Integration Testing
```bash
# Use integration branch for testing together
git checkout integration

# Test everything
# Fix bugs
# When stable, merge to main

git checkout main
git merge integration
git push origin main
```

---

## 📝 Commit Message Convention

Use these prefixes:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples**:
```bash
git commit -m "feat: Add XGBoost model for PM2.5 prediction"
git commit -m "fix: Resolve CORS error in API"
git commit -m "docs: Update API documentation"
git commit -m "style: Format frontend components with Prettier"
```

---

## 🎯 What Goes Where?

### Backend Folder
- ML model training code
- API endpoints
- Data preprocessing scripts
- ML inference logic
- Trained model files (.pkl)

### Frontend Folder
- React components
- UI/UX code
- Maps and charts
- API integration
- Styling

### Docs Folder
- All planning documents
- Technical documentation
- Architecture diagrams
- Task tracking

### Presentation Folder
- Presentation slides
- Demo video
- Screenshots
- Demo script

---

## 🔒 What NOT to Commit

❌ **Never commit**:
- `.env` files with secrets
- Large data files (>100MB)
- Trained models (use Git LFS or external storage)
- `node_modules/`
- `__pycache__/`
- Personal API keys
- Temporary files

✅ **Always commit**:
- Source code
- `.env.example` (template without secrets)
- Documentation
- Configuration files
- Small sample data (< 1MB)

---

## 📦 File Size Management

### For Large Files (>100MB):
```bash
# Option 1: Use Git LFS
git lfs install
git lfs track "*.pkl"
git lfs track "*.h5"
git add .gitattributes

# Option 2: Store externally
# Upload to Google Drive/Dropbox
# Add download instructions to README
```

---

## 🌟 Repository Best Practices

### During Hackathon:
1. **Commit every hour** - Don't lose work!
2. **Push frequently** - Share with team
3. **Write clear messages** - Future you will thank you
4. **Test before pushing to main** - Use integration branch
5. **Update README** - Keep it current

### Before Submission:
1. **Clean up** - Remove test files, debug code
2. **Update README** - Add live demo links
3. **Add LICENSE** - MIT is common for hackathons
4. **Check .gitignore** - No secrets leaked
5. **Test clone** - Does it work on fresh machine?

---

## 🎊 Final Repository Checklist

Before submitting, ensure:
- [ ] README.md has live demo links
- [ ] All documentation in `/docs` folder
- [ ] Presentation in `/presentation` folder
- [ ] Demo video uploaded and linked
- [ ] .env files are .gitignore'd
- [ ] No large files (>100MB) in repo
- [ ] All team members listed in README
- [ ] LICENSE file added
- [ ] Repository is public
- [ ] Clear setup instructions in README
- [ ] API documentation accessible
- [ ] No broken links in documentation
- [ ] Screenshots showing final product

---

## 🚀 Quick Reference

### Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/airwatch-nasa-hackathon.git
cd airwatch-nasa-hackathon
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Edit with your keys
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local  # Edit with your API URL (Next.js uses .env.local)
npm run dev
```

---

This structure keeps everything organized, makes collaboration easy, and looks professional for judges! 🎯

