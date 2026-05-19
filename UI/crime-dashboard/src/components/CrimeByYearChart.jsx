import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL
const CATEGORIES = ['VIOLENT', 'PROPERTY', 'DRUG', 'FRAUD', 'WEAPONS', 'PUBLIC ORDER', 'OTHER']

const CrimeByYearChart = ({ city }) => {
  const [data, setData] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    axios.get(`${API}/stats/crime-by-year`, { params: { city, category: category || undefined } })
      .then(r => setData(r.data))
  }, [city, category])

  return (
    <div className='card flex flex-col p-4 bg-[#bec8d1] rounded-sm'>
        <div className='bg-[#373b3e] p-2 rounded-sm'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-white'>Crime Trend by Year</h2>
                <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='bg-white rounded-sm border p-1 text-sm'
                >
                <option value=''>All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='year' stroke='white' />
                <YAxis stroke='white' />
                <Tooltip />
                <Line type='monotone' dataKey='count' stroke='#85cecb' strokeWidth={2} dot={{ fill: '#85cecb' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default CrimeByYearChart