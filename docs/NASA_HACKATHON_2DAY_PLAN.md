# NASA Space Apps Challenge 2025: 2-Day MVP Plan
## Challenge: From EarthData to Action - Predicting Cleaner, Safer Skies

### Team Composition
- **2 ML Engineers** (ML1, ML2)
- **2 Frontend Engineers** (FE1, FE2)

---

## Project Concept: AirWatch - Real-time Air Quality & Aviation Safety Predictor

### Core Value Proposition
An interactive web application that uses NASA Earth observation data to:
1. Predict air quality (PM2.5, NO2, ozone) in real-time
2. Forecast aviation safety conditions (visibility, turbulence risks)
3. Provide actionable insights for airlines, airports, and the public

---

## Technical Stack (Pre-approved for speed)

### ML/Backend:
- **Python 3.9+** with FastAPI
- **NASA Earthdata APIs**: MODIS, MERRA-2, TROPOMI
- **ML Libraries**: scikit-learn, XGBoost, pandas, numpy
- **Cloud**: Deploy on Render/Railway (free tier, fast deployment)
- **Data Storage**: SQLite (simple) or Firebase (if real-time needed)

### Frontend:
- **Next.js 14** with App Router (React framework with SSR/SSG)
- **UI Library**: Ant Design 5 (enterprise-grade components) + Tailwind CSS
- **Maps**: Leaflet.js with React-Leaflet (dynamic import for SSR)
- **Charts**: Recharts (responsive charts)
- **TypeScript**: Type-safe development
- **Deployment**: Vercel (optimized for Next.js, instant deployment)

---

## DAY 1: SATURDAY, OCTOBER 4, 2025

### ⏰ Hour 0-1: Setup & Alignment (9:00 AM - 10:00 AM)
**ALL TEAM MEMBERS**

**Tasks:**
1. **Quick standup** (15 min)
   - Review this plan together
   - Confirm roles and responsibilities
   - Set communication channels (Discord/Slack + shared doc)

2. **Environment Setup** (45 min)
   - Create GitHub repository with proper structure
   - Set up project scaffolding:
     ```
     /airwatch-mvp
       /backend          (ML Engineers)
       /frontend         (Frontend Engineers)
       /data            (Shared datasets)
       /docs            (Documentation)
       README.md
     ```
   - ML Engineers: Set up Python virtual environment, install base dependencies
   - Frontend Engineers: Initialize React app with Vite, install UI libraries

**Deliverable:** Working development environments, shared Git repo

---

### ⏰ Hour 1-4: Parallel Deep Dive (10:00 AM - 1:00 PM)

#### **ML TEAM (ML1 + ML2)**

**10:00 AM - 11:30 AM: Data Discovery & Acquisition**
- **ML1**: Focus on Air Quality Data
  - Access NASA Earthdata portal
  - Download MODIS aerosol data (AOD - Aerosol Optical Depth)
  - Get TROPOMI NO2, SO2 data from Sentinel-5P
  - Historical air quality data (last 6-12 months for your target region)
  
- **ML2**: Focus on Meteorological Data
  - Access MERRA-2 (Modern-Era Retrospective analysis)
  - Get wind speed, temperature, humidity, pressure data
  - Visibility data for aviation safety
  - Cloud cover and precipitation data

**Resources:**
- NASA Earthdata Search: https://search.earthdata.nasa.gov
- Giovanni - NASA's Data Visualization Tool
- OpenAQ API for ground truth validation

**11:30 AM - 1:00 PM: Data Preprocessing Pipeline**
- **ML1**: 
  - Create data cleaning scripts
  - Handle missing values and outliers
  - Normalize/standardize features
  - Create training dataset structure (CSV/parquet)

- **ML2**:
  - Feature engineering pipeline
  - Temporal feature extraction (hour, day, season)
  - Spatial feature extraction (lat/long, altitude)
  - Merge datasets into unified feature matrix

**Deliverable:** Clean, preprocessed dataset ready for modeling

---

#### **FRONTEND TEAM (FE1 + FE2)**

**10:00 AM - 11:00 AM: UI/UX Design Sprint**
- **Both FE1 & FE2**: Design thinking session
  - Sketch 3 key screens on paper/Figma:
    1. **Home/Dashboard**: Map view with air quality overlay
    2. **Prediction View**: Hourly/daily forecasts
    3. **Insights Page**: Historical trends, safety alerts
  
  - Define color scheme (use green→yellow→red for air quality)
  - Decide on layout structure
  - Create component hierarchy diagram

**11:00 AM - 1:00 PM: Component Development**
- **FE1**: Core Infrastructure
  - Set up Next.js App Router pages
  - Create layout components using Ant Design Layout
  - Configure TypeScript and Tailwind
  - Set up Ant Design theme provider
  - Create map component with Leaflet.js (dynamic import)
  - Basic map interactions (zoom, pan, marker placement)

- **FE2**: UI Components Library
  - Build reusable components with Ant Design:
    - AirQualityCard using Card, Statistic (shows PM2.5, NO2 levels)
    - PredictionCard using Timeline, Card (forecast display)
    - AlertBanner using Alert component (for unsafe conditions)
    - DataVisualization using Recharts (chart wrapper)
  - Implement responsive design with Tailwind CSS
  - Use Ant Design Skeleton for loading states

**Deliverable:** Functional frontend skeleton with navigation and basic components

---

### ⏰ LUNCH BREAK (1:00 PM - 2:00 PM)
- **Quick sync**: 10-minute standup to share progress
- Everyone eats while documenting what they've done

---

### ⏰ Hour 5-8: Model Development & Frontend Integration (2:00 PM - 6:00 PM)

#### **ML TEAM (ML1 + ML2)**

**2:00 PM - 4:00 PM: Model Development**
- **ML1**: Air Quality Prediction Model
  - **Approach**: XGBoost Regression (fast, accurate)
  - Target variables: PM2.5, NO2, O3
  - Features: AOD, meteorological data, temporal features
  - Train-test split (80-20)
  - Cross-validation (3-fold minimum)
  - Evaluate: RMSE, MAE, R²
  - Save best model as `.pkl` file

- **ML2**: Aviation Safety Risk Classifier
  - **Approach**: Random Forest or Logistic Regression
  - Target: Safety level (Safe/Moderate/Unsafe)
  - Features: Visibility, wind speed, air quality metrics
  - Calculate feature importance
  - Create risk score (0-100)
  - Save model

**4:00 PM - 6:00 PM: API Development**
- **Both ML1 & ML2**: Build FastAPI backend
  - Create endpoints:
    ```
    POST /predict/air-quality
    POST /predict/aviation-safety
    GET /historical-data
    GET /current-conditions
    ```
  - Implement CORS for frontend access
  - Add input validation
  - Create response schemas (JSON)
  - Write unit tests for critical functions
  - Deploy to Render.com or Railway
  - Test endpoints with Postman/Thunder Client

**Deliverable:** Working API with 4 endpoints, deployed and accessible

---

#### **FRONTEND TEAM (FE1 + FE2)**

**2:00 PM - 3:30 PM: Feature Implementation**
- **FE1**: Map & Data Visualization
  - Integrate real map with layers
  - Add heatmap overlay for air quality
  - Implement location search functionality
  - Add geolocation (get user's current location)
  - Create custom map markers/pins

- **FE2**: Dashboard & Predictions
  - Build main dashboard page
  - Implement prediction display cards
  - Create historical data charts (line graphs)
  - Add data filtering (by date, location)
  - Implement real-time data refresh (polling or WebSocket)

**3:30 PM - 4:30 PM: Mock Data Integration**
- **Both FE1 & FE2**: Create mock API responses
  - Write realistic fake data matching API schema
  - Integrate mock data into all components
  - Test all user flows with mock data
  - Ensure everything works without backend

**4:30 PM - 6:00 PM: Backend Integration Preparation**
- **FE1**: API Integration Layer
  - Create API service file (`api.js`)
  - Write fetch/axios wrappers for all endpoints
  - Implement error handling
  - Add loading states

- **FE2**: State Management & Data Flow
  - Connect API calls to UI components
  - Implement caching strategy
  - Add toast notifications for errors
  - Create data transformation utilities

**Deliverable:** Fully functional frontend with mock data, ready for backend connection

---

### ⏰ Hour 9-11: Integration & Testing (6:00 PM - 9:00 PM)

#### **FULL TEAM COLLABORATION**

**6:00 PM - 7:00 PM: Integration Sprint**
- **ML Team**: Share API documentation and Postman collection
- **Frontend Team**: Replace mock data with real API calls
- **Test together**: Each endpoint → frontend component
- Fix CORS issues, data format mismatches

**7:00 PM - 8:00 PM: End-to-End Testing**
- Test complete user journeys:
  1. User visits site → sees current air quality
  2. User searches location → gets predictions
  3. User views historical data → sees charts
- Document bugs in shared spreadsheet
- Prioritize bugs (P0: must fix, P1: nice to have)

**8:00 PM - 9:00 PM: Bug Fixing Sprint**
- **ML Team**: Fix backend issues (errors, slow responses)
- **Frontend Team**: Fix UI bugs (rendering, responsiveness)
- **Quick sync at 8:45 PM**: Confirm all P0 bugs resolved

**Deliverable:** Working MVP with frontend-backend integration

---

### ⏰ End of Day 1 Review (9:00 PM - 9:30 PM)
**ALL TEAM MEMBERS**

**Checklist:**
- [ ] Backend API deployed and accessible
- [ ] Frontend deployed (at least to dev environment)
- [ ] Basic predictions working (even if not perfect)
- [ ] Map visualization functional
- [ ] No critical bugs

**Plan for tomorrow:**
- Identify 3-5 enhancements for Day 2
- Assign presentation prep tasks
- Everyone gets good rest!

---

## DAY 2: SUNDAY, OCTOBER 5, 2025

### ⏰ Hour 0-1: Morning Standup & Strategy (9:00 AM - 10:00 AM)
**ALL TEAM MEMBERS**

**Tasks:**
1. Demo yesterday's work (10 min)
2. Prioritize Day 2 tasks (20 min):
   - **Must Have**: Critical features/fixes
   - **Should Have**: Impressive features
   - **Nice to Have**: Polish items
3. Final roles for the day (10 min)
4. Set hard deadlines:
   - 3:00 PM: Feature freeze
   - 5:00 PM: Presentation ready
   - 7:00 PM: Final submission

---

### ⏰ Hour 1-4: Enhancement & Polish (10:00 AM - 2:00 PM)

#### **ML TEAM (ML1 + ML2)**

**10:00 AM - 12:00 PM: Model Improvement**
- **ML1**: Enhance Predictions
  - Improve model accuracy (tune hyperparameters)
  - Add confidence intervals to predictions
  - Implement ensemble methods if time allows
  - Create forecast for next 24 hours (hourly predictions)

- **ML2**: Additional Features
  - Add historical comparison ("better/worse than last week")
  - Implement anomaly detection (unusual air quality events)
  - Create air quality index (AQI) calculation
  - Add health recommendations based on AQI

**12:00 PM - 2:00 PM: Production Polish**
- **Both ML1 & ML2**:
  - Optimize API response times (caching, async)
  - Add comprehensive error handling
  - Implement rate limiting
  - Add logging for debugging
  - Create API documentation (Swagger/OpenAPI)
  - Write README for backend

**Deliverable:** Polished, production-ready API with documentation

---

#### **FRONTEND TEAM (FE1 + FE2)**

**10:00 AM - 12:00 PM: Feature Enhancement**
- **FE1**: Advanced Visualizations
  - Implement time-slider for predictions
  - Add comparison view (multiple locations)
  - Create animated transitions
  - Add export functionality (download data as CSV)
  - Implement dark mode toggle

- **FE2**: UX Polish
  - Add onboarding/tutorial for first-time users
  - Create about/info modal explaining the data
  - Implement accessibility features (ARIA labels, keyboard nav)
  - Add meta tags for social sharing
  - Create favicon and logo

**12:00 PM - 2:00 PM: Visual Polish**
- **Both FE1 & FE2**:
  - Refine animations and transitions
  - Ensure perfect mobile responsiveness
  - Add micro-interactions (hover effects, button feedback)
  - Optimize images and assets
  - Test on different browsers
  - Fix any remaining UI bugs
  - Write README for frontend

**Deliverable:** Polished, impressive frontend with great UX

---

### ⏰ LUNCH BREAK (2:00 PM - 2:30 PM)
- Quick working lunch
- Review presentation outline together

---

### ⏰ Hour 6-8: Final Testing & Documentation (2:30 PM - 4:30 PM)

#### **ML TEAM (ML1 + ML2)**

**2:30 PM - 3:30 PM: Comprehensive Testing**
- **ML1**: Test all edge cases
  - Invalid inputs
  - Extreme values
  - Different locations worldwide
  - Historical data queries
  
- **ML2**: Performance testing
  - Load testing (simulate multiple users)
  - Response time optimization
  - Memory usage check
  - Monitor deployment logs

**3:30 PM - 4:30 PM: Documentation & Technical Write-up**
- **ML1**: Create technical documentation
  - Data sources used
  - Model architecture and rationale
  - Training process and metrics
  - API usage examples
  
- **ML2**: Start presentation slides (ML sections)
  - Problem statement
  - Technical approach
  - Model performance metrics
  - Future improvements

**Deliverable:** Fully tested backend with complete documentation

---

#### **FRONTEND TEAM (FE1 + FE2)**

**2:30 PM - 3:30 PM: Cross-browser & Device Testing**
- **FE1**: Desktop testing
  - Chrome, Firefox, Safari, Edge
  - Different screen sizes
  - Test all user flows
  - Performance audit (Lighthouse)

- **FE2**: Mobile testing
  - iOS Safari, Chrome mobile
  - Touch interactions
  - Mobile menu functionality
  - Responsive breakpoints

**3:30 PM - 4:30 PM: Demo Preparation & Slides**
- **FE1**: Create demo script
  - Step-by-step user journey
  - Highlight key features
  - Prepare backup demo video (record screen)
  
- **FE2**: Presentation slides (Frontend sections)
  - UI/UX design rationale
  - Key features showcase
  - Screenshots and GIFs
  - User benefits

**Deliverable:** Battle-tested frontend ready for demo

---

### ⏰ Hour 8-10: Presentation & Submission Prep (4:30 PM - 6:30 PM)

#### **FULL TEAM COLLABORATION**

**4:30 PM - 5:30 PM: Presentation Creation**
**Divide and conquer - 10-12 slide deck:**

1. **FE1**: Slides 1-3
   - Title slide with team names
   - Problem statement (why does this matter?)
   - Challenge background

2. **ML1**: Slides 4-6
   - Technical approach overview
   - Data sources (NASA datasets used)
   - Model architecture

3. **FE2**: Slides 7-9
   - Solution features (with screenshots)
   - User journey
   - Impact and benefits

4. **ML2**: Slides 10-12
   - Results and metrics
   - Demo preview
   - Future roadmap

**5:30 PM - 6:00 PM: Presentation Rehearsal**
- **All team members**: Practice presentation twice
  - Time it (aim for 5-7 minutes)
  - Smooth transitions between speakers
  - Prepare for Q&A (anticipate 5 questions)
  - Record backup video demo

**6:00 PM - 6:30 PM: Final Preparations**
- **ML Team**: Ensure deployment is stable, backup database
- **Frontend Team**: Deploy to production URL, test deployment
- **All**: Review submission checklist

---

### ⏰ Hour 10-12: Submission & Final Touches (6:30 PM - 8:30 PM)

**6:30 PM - 7:30 PM: Documentation Package**
**Assign one person to each:**

- **ML1**: Write detailed README.md
  - Project description
  - Architecture diagram
  - Installation instructions
  - API documentation link
  - Credits and data sources

- **ML2**: Create TECHNICAL.md
  - Detailed technical documentation
  - Model training process
  - Performance metrics
  - Deployment instructions

- **FE1**: Create USER_GUIDE.md
  - How to use the application
  - Feature explanations
  - Screenshots with annotations

- **FE2**: Create presentation video
  - 3-5 minute walkthrough
  - Upload to YouTube (unlisted)
  - Add to submission

**7:30 PM - 8:00 PM: Submission Checklist**
- [ ] GitHub repository is public
- [ ] All code is committed and pushed
- [ ] README.md is comprehensive
- [ ] Live demo URL is working
- [ ] Presentation slides uploaded
- [ ] Demo video uploaded
- [ ] All team member names listed
- [ ] License file added (MIT recommended)
- [ ] .env.example file for configuration
- [ ] No sensitive credentials in code

**8:00 PM - 8:30 PM: Official Submission**
- Submit through NASA Space Apps portal
- Post on social media (tag #SpaceApps)
- Celebrate! 🎉

---

## Key Success Factors

### Communication Protocol
- **Standup Times**: 9 AM, 2 PM, 6 PM (15 min each)
- **Tool**: Discord/Slack with channels:
  - `#general` - Team communication
  - `#ml-backend` - ML team coordination
  - `#frontend` - Frontend team coordination
  - `#bugs` - Bug tracking
  - `#questions` - Quick Q&A

### Git Workflow
```
main (protected)
  ├── ml-dev (ML team work)
  ├── frontend-dev (Frontend team work)
  └── integration (for testing together)
```
- Feature branches from respective dev branches
- Pull requests for review
- Merge to integration for testing
- Final merge to main before submission

### Risk Mitigation
1. **API Delays**: Frontend works with mock data until ML team is ready
2. **Deployment Issues**: Have backup deployment platforms ready
3. **Data Access Problems**: Download datasets early, have backups
4. **Scope Creep**: Stick to MVP, park nice-to-haves in "v2.0" list

---

## MVP Feature Checklist

### Must-Have (P0)
- [ ] Interactive map with location selection
- [ ] Current air quality display
- [ ] 24-hour prediction
- [ ] Aviation safety indicator
- [ ] Mobile responsive design
- [ ] Working API with 2+ endpoints

### Should-Have (P1)
- [ ] Historical data visualization
- [ ] Multiple location comparison
- [ ] Health recommendations
- [ ] Data export feature
- [ ] About/info section

### Nice-to-Have (P2)
- [ ] Dark mode
- [ ] Animated visualizations
- [ ] Real-time updates
- [ ] Social sharing
- [ ] Multi-language support

---

## Suggested Presentation Structure (7 minutes)

**Slide 1**: Title + Team (30 sec)
**Slides 2-3**: Problem (why care about air quality & aviation safety?) (60 sec)
**Slides 4-5**: Solution overview (what we built) (60 sec)
**Slide 6**: Technology stack (NASA data, ML models) (45 sec)
**Slides 7-8**: **LIVE DEMO** (most important!) (120 sec)
**Slide 9**: Results/Impact (what insights can users gain?) (45 sec)
**Slide 10**: Future roadmap (60 sec)
**Slide 11**: Thank you + Q&A (30 sec)

---

## Resources & APIs

### NASA Data Sources
- **NASA Earthdata**: https://earthdata.nasa.gov/
- **Giovanni**: https://giovanni.gsfc.nasa.gov/
- **MODIS**: Aerosol Optical Depth
- **MERRA-2**: Meteorological reanalysis
- **TROPOMI/Sentinel-5P**: Air pollutants
- **AIRS**: Atmospheric composition

### Additional APIs
- **OpenAQ**: Ground-level air quality data
- **OpenWeatherMap**: Weather data (free tier)
- **IQAir**: Air quality index reference

### Development Tools
- **GitHub**: Version control
- **Postman**: API testing
- **Figma**: UI design (if needed)
- **Railway/Render**: Backend deployment
- **Vercel/Netlify**: Frontend deployment

---

## Daily Checklist Templates

### Day 1 Evening Checklist
- [ ] Backend API deployed and accessible via URL
- [ ] Frontend deployed to staging
- [ ] At least 2 API endpoints working
- [ ] Map visualization functional
- [ ] Basic predictions displaying
- [ ] GitHub repo organized
- [ ] All code committed

### Day 2 Evening Checklist
- [ ] All P0 features implemented
- [ ] Cross-browser testing completed
- [ ] Documentation written
- [ ] Presentation slides finalized
- [ ] Demo video recorded
- [ ] Submission completed
- [ ] Project live and accessible

---

## Motivation & Tips

### For ML Engineers
- **Don't over-engineer**: A simple, working model beats a complex, broken one
- **Document as you go**: Future you will thank current you
- **Test early**: Deploy early in Day 1 to catch issues
- **Feature engineering matters**: Good features > complex models

### For Frontend Engineers
- **Use component libraries**: Don't build from scratch
- **Mobile-first**: Most judges will view on phones
- **Performance matters**: Optimize images, lazy load
- **Tell a story**: UI should guide users intuitively

### For Everyone
- **Sleep well Day 1**: Don't burn out early
- **Celebrate small wins**: Keep morale high
- **Help each other**: Cross-functional collaboration wins hackathons
- **Have fun**: This is about learning and creativity!

---

## Emergency Contacts & Backups

### If Things Go Wrong
- **Backend deployment fails**: Use Replit or Google Colab + ngrok
- **Frontend deployment fails**: Use GitHub Pages or Surge
- **Data access blocked**: Use pre-downloaded datasets
- **Team member unavailable**: Have each person document their work daily

### Backup Plan
- Keep local copies of all data
- Export environment configurations
- Have offline demo ready
- Record demo video early on Day 2

---

## Post-Hackathon (Optional)
- Get feedback from judges
- Continue development if team is excited
- Write a blog post about your experience
- Add to portfolios
- Connect with other teams

---

Good luck team! Remember: **Done is better than perfect.** Focus on delivering a working MVP that tells a compelling story. You've got this! 🚀

---

**Last Updated**: October 3, 2025
**Team**: [Your Team Name]
**Challenge**: From EarthData to Action - Predicting Cleaner, Safer Skies

