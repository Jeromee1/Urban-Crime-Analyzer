import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL

const CrimeByCategoryChart = ({ city }) => {
  const [data, setData] = useState([])
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    axios.get(`${API}/stats/crime-by-category`, { params: { city } })
      .then(r => setData(r.data))
  }, [city])

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <div className='card fade-up flex flex-col p-4 bg-[#bec8d1] rounded-sm'>
      <div className='bg-[#373b3e] p-2 rounded-sm'>
        <h2 className='text-xl font-semibold mb-4 text-white text-center'>Crimes by Category</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
            <XAxis dataKey='category' tick={{ fontSize: 11 }} stroke='white' />
            <YAxis stroke='white' />
            <Tooltip cursor={{ fill: 'rgba(133, 206, 203, 0.2)' }}/>
            <Bar dataKey='count' fill='#85cecb' />
            </BarChart>
        </ResponsiveContainer>
      </div>
      <p onClick={handleShowMore} className='mt-4 cursor-pointer w-fit hover:text-blue-500'>
          {!showMore ? 'More Information' : 'Less Information'}
      </p>
      <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-fit opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#373b3e] text-white">
              <th className="border border-[#373b3e] p-3 text-left">Category</th>
              <th className="border border-[#373b3e] p-3 text-left">Description</th>
              <th className="border border-[#373b3e] p-3 text-left">Includes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Violent Crimes</td>
              <td className="border border-[#373b3e] p-3">
                Crimes involving direct harm, force, or threat against a person.
              </td>
              <td className="border border-[#373b3e] p-3">
                Assault, battery, robbery, homicide, murder, rape, sexual offenses, kidnapping, human trafficking, stalking, domestic violence
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Property Crimes</td>
              <td className="border border-[#373b3e] p-3">
                Crimes involving theft, damage, or unlawful control of property without direct violence.
              </td>
              <td className="border border-[#373b3e] p-3">
                Theft, burglary, motor vehicle theft, arson, vandalism, trespassing, possession of stolen property, larceny
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Drug Crimes</td>
              <td className="border border-[#373b3e] p-3">
                Offenses involving illegal drugs or controlled substances.
              </td>
              <td className="border border-[#373b3e] p-3">
                Narcotics possession, distribution, cannabis possession, dangerous drugs violations, drug abuse offenses
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Weapons Offenses</td>
              <td className="border border-[#373b3e] p-3">
                Crimes involving illegal possession or use of weapons.
              </td>
              <td className="border border-[#373b3e] p-3">
                Firearms violations, dangerous weapons, illegal carry or possession of weapons
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Fraud Crimes</td>
              <td className="border border-[#373b3e] p-3">
                Crimes involving deception for financial or personal gain.
              </td>
              <td className="border border-[#373b3e] p-3">
                Fraud, identity theft, forgery, embezzlement, falsifying records, scams, deceptive practices
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Public Order Offenses</td>
              <td className="border border-[#373b3e] p-3">
                Crimes that disrupt public safety, behavior, or authority enforcement.
              </td>
              <td className="border border-[#373b3e] p-3">
                Disorderly conduct, DUI, prostitution, gambling, traffic violations, public intoxication, loitering, interference with police, liquor law violations
              </td>
            </tr>

            <tr>
              <td className="border border-[#373b3e] p-3 font-semibold">Other Crimes</td>
              <td className="border border-[#373b3e] p-3">
                Offenses that do not fit into standard categories or are miscellaneous in nature.
              </td>
              <td className="border border-[#373b3e] p-3">
                Administrative violations, unclassified offenses, miscellaneous penal law violations, other state laws
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CrimeByCategoryChart