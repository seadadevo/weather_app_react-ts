import { WeatherData } from '@/api/types'
import { format } from 'date-fns';
import {  Gauge, Sunrise, Sunset, Wind } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WeatherDetailsProps {
  data: WeatherData
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;
  console.log('data1', data)

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a")
  }

  // function getWindDirection(deg) {
  //   if (deg >= 337.5 || deg < 22.5) return "N";
  //   if (deg >= 22.5 && deg < 67.5) return "NE";
  //   if (deg >= 67.5 && deg < 112.5) return "E";
  //   if (deg >= 112.5 && deg < 157.5) return "SE";
  //   if (deg >= 157.5 && deg < 202.5) return "S";
  //   if (deg >= 202.5 && deg < 247.5) return "SW";
  //   if (deg >= 247.5 && deg < 292.5) return "W";
  //   if (deg >= 292.5 && deg < 337.5) return "NW";
  // }
  const getWindDirection = (degree: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
  return directions[index];
};
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500"
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500"
    },
    {
      title: "Wind (Direction)",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Wind,
      color: "text-blue-500"
    },
    
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500"
    },
  ]

  return (
    <Card>
  <CardHeader>
    <CardTitle>Weather Details</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-6 sm:grid-cols-2">
      {details.map((detail) => (
        <div 
          key={detail.title}
          className="flex items-center gap-3 border p-4 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <detail.icon className={`h-5 w-5 ${detail.color}`} />
            <div>
              <p className="mb-[0.2rem] text-sm font-medium leading-none">{detail.title}</p>
              <p className="text-sm text-muted-foreground">{detail.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
  )
}

export default WeatherDetails
