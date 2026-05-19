import os
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from predict import predict_crime
from flask import Flask, request, jsonify
from datetime import datetime, timedelta

df = pd.read_csv('../data/processed/sampled_cleaned_crime_data.csv', low_memory=False)

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    lat = data['lat']
    lon = data['lon']
    city = data['city']
    timeframe = data.get('timeframe', 'day')
    
    current_time = datetime.now()
    risk_scores = []
    predicted_crimes = {}
    
    if timeframe == 'week':
        steps = [current_time + timedelta(hours=i*6) for i in range(28)]
    elif timeframe == 'month':
        steps = [current_time + timedelta(hours=i*12) for i in range(60)]
    else:
        steps = [current_time]

    # Gather predictions across the timeframe
    for step in steps:
        res = predict_crime(
            lat=lat,
            lon=lon,
            hour=step.hour,
            day_of_week=step.weekday(),
            month=step.month,
            city=city,
            arrested=data.get('arrested', True)
        )
        risk_scores.append(res['risk_score'])
        
        # Track most frequent crime predicted
        crime = res['predicted_crime']
        predicted_crimes[crime] = predicted_crimes.get(crime, 0) + 1

    # Aggregate results
    avg_risk = sum(risk_scores) / len(risk_scores)
    most_common_crime = max(predicted_crimes, key=predicted_crimes.get) if predicted_crimes else "None"

    return jsonify({
        "timeframe": timeframe,
        "aggregated_risk_score": round(avg_risk, 2),
        "primary_predicted_crime": most_common_crime,
        "data_points_analyzed": len(steps)
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/crimes', methods=['GET'])
def get_crimes():
    city = request.args.get('city', None)
    start_date = request.args.get('start', None)
    end_date = request.args.get('end', None)
    print(f'city={city}, start={start_date}, end={end_date}')
    
    filtered = df.copy()
    
    if city:
        filtered = filtered[filtered['city'] == city]
    if start_date:
        filtered = filtered[filtered['date'] >= start_date]
    if end_date:
        filtered = filtered[filtered['date'] <= end_date]
    
    # Limit to 10000 points max or browser will die
    filtered = filtered[['latitude', 'longitude', 'crime_category', 'date']].dropna()
    # filtered = filtered.sample(min(10000, len(filtered))) Full csv line
    filtered = filtered.head(10000)
    
    return jsonify(filtered.to_dict(orient='records'))

CITY_CENTERS = {
    'Chicago': [41.85, -87.65],
    'New York': [40.73, -74.00],
    'Los Angeles': [34.05, -118.25]
}

@app.route('/cities', methods=['GET'])
def get_cities():
    return jsonify(list(CITY_CENTERS.keys()))

@app.route('/stats/crime-by-category', methods=['GET'])
def crime_by_category():
    city = request.args.get('city', None)
    filtered = df[df['city'] == city] if city else df
    counts = filtered['crime_category'].value_counts().reset_index()
    counts.columns = ['category', 'count']
    return jsonify(counts.to_dict(orient='records'))

@app.route('/stats/crime-by-race', methods=['GET'])
def crime_by_race():
    city = request.args.get('city', None)
    filtered = df[df['city'] == city] if city else df
    filtered = filtered.dropna(subset=['race'])
    counts = filtered['race'].value_counts().reset_index()
    counts.columns = ['race', 'count']
    return jsonify(counts.to_dict(orient='records'))

@app.route('/stats/crime-by-year', methods=['GET'])
def crime_by_year():
    city = request.args.get('city', None)
    category = request.args.get('category', None)
    filtered = df[df['city'] == city] if city else df
    if category:
        filtered = filtered[filtered['crime_category'] == category]
    counts = filtered.groupby('year')['crime_category'].count().reset_index()
    counts.columns = ['year', 'count']
    return jsonify(counts.to_dict(orient='records'))

@app.route('/stats/crime-by-hour', methods=['GET'])
def crime_by_hour():
    city = request.args.get('city', None)
    filtered = df[df['city'] == city] if city else df
    filtered = filtered.dropna(subset=['hour'])
    counts = filtered.groupby('hour')['crime_category'].count().reset_index()
    counts.columns = ['hour', 'count']
    return jsonify(counts.to_dict(orient='records'))

@app.route('/stats/arrest-rate', methods=['GET'])
def arrest_rate():
    city = request.args.get('city', None)
    filtered = df[df['city'] == city] if city else df
    rate = filtered.groupby('crime_category')['arrested'].mean().reset_index()
    rate.columns = ['category', 'arrest_rate']
    rate['arrest_rate'] = (rate['arrest_rate'] * 100).round(1)
    return jsonify(rate.to_dict(orient='records'))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)