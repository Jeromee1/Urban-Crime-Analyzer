import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL

const ArrestRateChart = ({ city }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API}/stats/arrest-rate`, { params: { city } })
      .then(r => setData(r.data))
  }, [city])

  return (
    <>
        {city == 'Chicago' && (
            <div className='card flex flex-col p-4 bg-[#bec8d1] rounded-sm'>
                <div className='bg-[#373b3e] p-2 rounded-sm'>
                    <h2 className='text-xl font-semibold mb-4 text-white'>Arrest Rate by Crime Category (%)</h2>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={data}>
                        <XAxis dataKey='category' tick={{ fontSize: 11 }} stroke='white' />
                        <YAxis domain={[0, 100]} stroke='white' />
                        <Tooltip formatter={(v) => `${v}%`} cursor={{ fill: 'rgba(133, 206, 203, 0.2)' }} />
                        <Bar dataKey='arrest_rate' fill='#85cecb' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
    </>
  )
}

export default ArrestRateChart