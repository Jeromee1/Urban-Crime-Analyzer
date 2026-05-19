# Urban Crime Analyzer

An interactive crime analysis dashboard powered by a machine learning model trained on real public safety data from Chicago, New York City, and Los Angeles. Visualizes crime patterns through an interactive map and charts, and predicts crime type and risk level for a selected location and timeframe.

---

## Features

### Dashboard
- Interactive heatmap with filters by city, crime type, and date range
- Click any map location to get an ML-powered crime prediction for the next week or month
- Charts for crime category breakdown, race distribution, crime trend by year, crime by hour, and arrest rate

### ML Model
- Trained on ~3 million rows of arrest data (2018–2025, excluding 2020–2021)
- Data sourced from official public safety portals for Chicago, NYC, and LA
- One Hot Encoding + Random Forest Classifier
- Outputs predicted primary threat type and estimated risk percentage

---

## Screenshots

| Map View | Charts |
|----------|--------|
| <img src='https://i.imgur.com/JesK90a.png' /> | <img src='https://i.imgur.com/n3e8eW3.png' /> |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Maps | Leaflet, react-leaflet |
| Charts | Recharts |
| Backend | Python, Flask |
| ML | scikit-learn (Random Forest, One Hot Encoder) |

---

## Setup

### Prerequisites
- Node.js
- Python 3

### Steps

1. **Create `.env` files**

   `UI/.env`:
   ```
   VITE_API_URL=http://localhost:YOUR_PORT
   ```

   `Backend/.env`:
   ```
   PORT=YOUR_PORT    # Must match the port in VITE_API_URL
   ```

2. **Install frontend dependencies**
   ```bash
   cd UI && npm i
   ```

3. **Install backend dependencies**
   ```bash
   cd Backend/api
   pip install -r requirements.txt
   ```

4. **Run the app**

   In one terminal:
   ```bash
   cd UI && npm run dev
   ```

   In another terminal:
   ```bash
   cd Backend/api && python app.py
   ```

---

## Notes

- The dataset has been sampled down from 3M+ rows to ~100K rows due to GitHub's file size limits. Predictions are based on this sample.
- The trained model files have been removed due to size limits. A release with the full models will be available in the future — predictions will not work until then.
- 2020 and 2021 data was excluded from training due to COVID-19 skewing crime patterns.

---

## Data Sources

- [Chicago Data Portal](https://data.cityofchicago.org/Public-Safety)
- [NYC Open Data](https://data.cityofnewyork.us/Public-Safety)
- [LA City Data](https://data.lacity.org/Public-Safety)
