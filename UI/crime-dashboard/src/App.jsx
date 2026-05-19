import './App.css'
import { useState, useEffect, useRef } from 'react'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dialog from './components/Dialog'
import CrimeByCategoryChart from './components/CrimeByCategoryChart'
import CrimeByRaceChart from './components/CrimeByRaceChart'
import CrimeByYearChart from './components/CrimeByYearChart'
import CrimeByHourChart from './components/CrimeByHourChart'
import ArrestRateChart from './components/ArrestRateChart'

const App = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [city, setCity] = useState('Chicago')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('VIOLENT')

  const scrollRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { 
        root: scrollRef.current,
        threshold: 0.1 
      }
    )
  
    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el)
    })
  
    return () => observer.disconnect()
  }, [])

  const handleDialog = (lat, lon) => {
    setSelectedLocation({lat, lon})
    setShowDialog(!showDialog)
  }

  const handleApply = (newCity, newCategory, newStart, newEnd) => {
    setCity(newCity)
    setSelectedCategory(newCategory)
    setStartDate(newStart)
    setEndDate(newEnd)

    scrollToTop()
  }

  const handleReset = () => {
    setCity('Chicago')
    setSelectedCategory('VIOLENT')
    setStartDate('')
    setEndDate('')

    scrollToTop()
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {showDialog && (
        <Dialog
          handleDialog={handleDialog}
          city={city}
          selectedLocation={selectedLocation}
        />
      )}
      <div className='flex flex-col sm:h-screen sm:overflow-hidden'>
        <Header />
        <div className='flex-h sm:flex overflow-hidden flex-1'>
          <Sidebar onApply={handleApply} onReset={handleReset} />
          <div ref={scrollRef} className='flex-1 flex flex-col p-4 gap-4 overflow-y-auto'>
            <Map
              city={city}
              startDate={startDate}
              endDate={endDate}
              selectedCategory={selectedCategory}
              onLocationClick={handleDialog}
            />
            <div className='flex flex-col gap-4'>
              <div className='p-4 bg-[#bec8d1] rounded-sm card'>
                <h1 className="text-4xl text-center font-extrabold tracking-tight bg-linear-to-r from-slate-950 via-teal-600 to-teal-400 bg-clip-text text-transparent uppercase">
                    {city} Overview
                </h1>
              </div>
              <CrimeByCategoryChart city={city} />
              <CrimeByRaceChart city={city} />
              <CrimeByYearChart city={city} />
              <CrimeByHourChart city={city} />
              <ArrestRateChart city={city} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App