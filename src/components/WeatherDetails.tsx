import { WeatherData } from '@/api/types'
import React from 'react'

interface WeatherDetailsProps {
    data: WeatherData
}

const WeatherDetails = ({data}: WeatherDetailsProps) => {
  const {wind, main, sys} = data;
    return (
    <div>
      
    </div>
  )
}

export default WeatherDetails
