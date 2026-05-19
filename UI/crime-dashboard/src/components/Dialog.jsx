import axios from 'axios'
import { useState } from 'react'

const Dialog = ({ handleDialog, city, selectedLocation }) => {
    const [prediction, setPrediction] = useState(null)
    const [isPredicting, setIsPredicting] = useState(false)
    
    const handlePrediction = async (timeframeType) => {
        try {
            setPrediction(null)
            setIsPredicting(true)
            const response = await axios.post('http://localhost:5000/predict', {
                lat: selectedLocation?.lat,
                lon: selectedLocation?.lon, 
                city: city,
                timeframe: timeframeType
            })
            setPrediction(response.data)
        } catch (error) {
            console.error("Prediction failed", error)
        } finally {
            setIsPredicting(false) 
        }
    }

    const closeDialog = () => {
        setPrediction(null)
        setIsPredicting(false)
        handleDialog()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-5000" onClick={closeDialog}>
            <div className="card md:w-1/3 md:h-1/2 bg-[#bec8d1] rounded-sm p-2" onClick={(e) => e.stopPropagation()}>
                <div className="bg-[#373b3e] p-4 rounded-sm h-full w-full text-white flex flex-col justify-between">
                    <div>
                        <h2 className='text-2xl font-semibold mb-4 text-center'>Predict Risk</h2>
                        
                        <div className="flex gap-4 justify-center mb-6">
                            <button 
                                type="button"
                                disabled={isPredicting} 
                                onClick={() => handlePrediction('week')} 
                                className="bg-[#42999e] hover:bg-[#85cecb] disabled:bg-gray-500 px-6 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Next 7 Days
                            </button>
                            <button 
                                type="button" 
                                disabled={isPredicting} 
                                onClick={() => handlePrediction('month')} 
                                className="bg-[#42999e] hover:bg-[#85cecb] disabled:bg-gray-500 px-6 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Next Month
                            </button>
                        </div>
                        <h2 className='text-center'>{isPredicting ? 'Analyzing...' : ''}</h2>
                        {prediction && (
                            <div className="mt-4 bg-[#2a2d30] p-3 rounded border border-gray-600">
                                <h3 className="text-lg mb-1">
                                    <span className="text-gray-400">Primary Threat:</span> {prediction.primary_predicted_crime}
                                </h3>
                                <h3 className="text-lg">
                                    <span className="text-gray-400">Estimated Risk:</span> {prediction.aggregated_risk_score}%
                                </h3>
                                <p className="text-xs text-gray-500 mt-2">
                                    Time windows analyzed: {prediction.data_points_analyzed}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog