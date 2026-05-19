import { useState } from 'react'
import { CITY_CENTERS, CATEGORIES } from "../constants"

const Sidebar = ({ onApply, onReset }) => {
    const [localCity, setLocalCity] = useState('Chicago')
    const [localCategory, setLocalCategory] = useState('VIOLENT')
    const [localStartDate, setLocalStartDate] = useState('')
    const [localEndDate, setLocalEndDate] = useState('')

    const handleApply = () => {
        onApply(localCity, localCategory, localStartDate, localEndDate)
    }

    const handleReset = () => {
        setLocalCity('Chicago')
        setLocalCategory('VIOLENT')
        setLocalStartDate('')
        setLocalEndDate('')
        onReset()
    }

    return (
        <div className="card w-full sm:w-1/5 h-full bg-[#bec8d1] p-2">
            <div className="flex justify-between flex-col h-full">
                <div className="bg-[#373b3e] flex-h text-white p-2 rounded-sm">
                    <h3 className="text-xl font-bold text-center mb-4">Map Filters</h3>
                    <div className="flex flex-col gap-4 text-black">
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center text-white ms-2 me-2'>
                                <h3 className='me-2'>City</h3>
                                <hr className='flex-1 mt-1' />
                            </div>
                            <select value={localCity} onChange={e => setLocalCity(e.target.value)} className="bg-white rounded-sm border p-1">
                                {Object.keys(CITY_CENTERS).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                        <div className='flex items-center text-white ms-2 me-2'>
                                <h3 className='me-2'>Crime</h3>
                                <hr className='flex-1 mt-1' />
                            </div>
                            <select value={localCategory} onChange={e => setLocalCategory(e.target.value)} className="bg-white rounded-sm border p-1">
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center text-white ms-2 me-2'>
                                <h3 className='me-2'>Start Date</h3>
                                <hr className='flex-1 mt-1' />
                            </div>
                            <input type="date" value={localStartDate} onChange={e => setLocalStartDate(e.target.value)} className="bg-white rounded-sm border p-1" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center text-white ms-2 me-2'>
                                <h3 className='me-2'>End Date</h3>
                                <hr className='flex-1 mt-1' />
                            </div>
                            <input type="date" value={localEndDate} onChange={e => setLocalEndDate(e.target.value)} className="bg-white rounded-sm border p-1" />
                        </div>
                        <div className='m-4'></div>
                        <button onClick={handleApply} className='p-2 bg-[#85cecb] rounded-sm'>Apply</button>
                        <button onClick={handleReset} className='p-2 bg-[#FF2080] rounded-sm'>Reset</button>
                    </div>
                </div>
            <p className='text-center font-semibold mt-2'>Click on map to begin prediction</p>
            </div>
        </div>
    )
}

export default Sidebar