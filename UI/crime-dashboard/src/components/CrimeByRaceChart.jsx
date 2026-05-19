import { useEffect, useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL
const COLORS = ['#85cecb', '#6F6F6F', '#bec8d1', '#4a9e9b', '#6b8f92', '#2d6e6b', '#a0b8bc']

const CrimeByRaceChart = ({ city }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API}/stats/crime-by-race`, { params: { city } })
      .then(r => setData(r.data))
  }, [city])

  return (
    <>
      {city != 'Chicago' && (
        <div className='card flex flex-col p-4 bg-[#bec8d1] rounded-sm'>
          <div className='bg-[#373b3e] p-2 rounded-sm'>
            <h2 className='text-xl font-semibold mb-1 text-white'>Arrests by Race</h2>
            <p className='text-xs text-gray-400 mb-4'>NYC + LA only — Chicago has no demographic data</p>
            <ResponsiveContainer width='80%' height={300}>
              <PieChart>
                <Pie data={data} dataKey='count' nameKey='race' cx='50%' cy='50%' outerRadius={120}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout='vertical' align='right' verticalAlign='middle' />
              </PieChart>
            </ResponsiveContainer>
          </div>
      </div>
      )}
    </>
  )
}

export default CrimeByRaceChart