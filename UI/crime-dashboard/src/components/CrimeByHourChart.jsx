import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL

const CrimeByHourChart = ({ city }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API}/stats/crime-by-hour`, { params: { city } })
      .then(r => setData(r.data))
  }, [city])

  return (
    <>
        {city != 'New York' && (
            <div className='card flex flex-col p-4 bg-[#bec8d1] rounded-sm'>
                <div className='bg-[#373b3e] p-2 rounded-sm'>
                    <h2 className='text-xl font-semibold mb-1 text-white'>Crimes by Hour of Day</h2>
                    <p className='text-xs text-gray-400 mb-4'>Chicago + LA only — NYC has no time data</p>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={data}>
                        <XAxis dataKey='hour' tick={{ fontSize: 11 }} stroke='white' />
                        <YAxis stroke='white' />
                        <Tooltip cursor={{ fill: 'rgba(133, 206, 203, 0.2)' }} />
                        <Bar dataKey='count' fill='#85cecb' activeBar={{ fill: '#4a9e9b' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
    </>
  )
}

export default CrimeByHourChart