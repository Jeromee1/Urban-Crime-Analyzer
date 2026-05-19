import { MapContainer, TileLayer, CircleMarker, useMapEvents, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { CITY_CENTERS } from "../constants"

const Map = ({ onLocationClick, city, startDate, endDate, selectedCategory }) => {
  const [crimes, setCrimes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCrimes = async (selectedCity, start, end) => {
    setIsLoading(true)
    const params = { city: selectedCity }
    if (start) params.start = start
    if (end) params.end = end
    const response = await axios.get('http://localhost:5000/crimes', { params })
    setCrimes(response.data)
    setIsLoading(false)
  }

  const Recenter = ({ center }) => {
    const map = useMap()
    useEffect(() => {
      map.setView(center, 11)
    }, [center])
    return null
  }
  
  const ClickHandler = ({ onLocationClick }) => {
    useMapEvents({
      click(e) {
        onLocationClick(e.latlng.lat, e.latlng.lng)
      }
    })
    return null
  }

  useEffect(() => {
    fetchCrimes(city, startDate, endDate)
  }, [city, startDate, endDate])

  const filteredCrimes = crimes.filter(c => c.crime_category === selectedCategory)

  return (
    <div className='card flex p-4 bg-[#bec8d1] rounded-sm justify-center'>
      <div className='relative w-full'>
        {isLoading && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center z-1000 rounded-sm'>
            <p className='text-white font-bold text-lg'>Fetching...</p>
          </div>
        )}
        <MapContainer
          center={CITY_CENTERS['Chicago']}
          zoom={11}
          style={{ height: '500px', width: '100%', borderRadius: '4px' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='© OpenStreetMap © CARTO'
          />
          <Recenter center={CITY_CENTERS[city]} />
          <ClickHandler onLocationClick={(lat, lon) => onLocationClick(lat, lon, city)} />
          {filteredCrimes.map((crime, i) => (
            <CircleMarker
              key={i}
              center={[crime.latitude, crime.longitude]}
              radius={4}
              fillColor='#85cecb'
              color="transparent"
              fillOpacity={0.2}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map