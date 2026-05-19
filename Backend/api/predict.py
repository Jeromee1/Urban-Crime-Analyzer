import joblib
import pandas as pd
from scipy.spatial import cKDTree

pipeline = joblib.load('../models/crime_model.pkl')
city_pois = joblib.load('../models/city_pois.pkl')

def get_poi_features(lat, lon, city):
    pois = city_pois[city]
    features = {}
    
    for amenity in ['bar', 'atm', 'school', 'hospital']:
        subset = pois[pois['amenity'] == amenity][['lat', 'lon']].dropna()
        
        if len(subset) == 0:
            features[f'dist_to_{amenity}'] = -1
            features[f'{amenity}s_within_500m'] = 0
            continue
        
        tree = cKDTree(subset.values)
        dist, _ = tree.query([[lat, lon]], k=1)
        count = len(tree.query_ball_point([[lat, lon]], r=0.005)[0])
        
        features[f'dist_to_{amenity}'] = dist[0]
        features[f'{amenity}s_within_500m'] = count
    
    return features

def predict_crime(lat, lon, hour, day_of_week, month, city, arrested=True):
    poi_features = get_poi_features(lat, lon, city)
    
    input_data = pd.DataFrame([{
        'latitude': lat,
        'longitude': lon,
        'hour': hour,
        'day_of_week': day_of_week,
        'month': month,
        'city': city,
        'arrested': arrested,
        **poi_features
    }])
    
    predicted_category = pipeline.predict(input_data)[0]
    probabilities = pipeline.predict_proba(input_data)[0]
    risk_score = round(max(probabilities) * 100, 2)
    
    return {
        'predicted_crime': predicted_category,
        'risk_score': float(risk_score),
        'breakdown': {k: float(v) for k, v in zip(pipeline.classes_, probabilities)}
    }