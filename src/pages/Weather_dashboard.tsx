import CurrentWeather from "@/components/CurrentWeather";
import HourlyTempreture from "@/components/Hourly_Tempreture";

import Weather_Skeleton from "@/components/loading-skeletor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForCast from "@/components/WeatherForeCast";
import { useGeolocation } from "@/hooks/use-geoLocation";
import {
  useForCastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import React from "react";

const WeatherDashboard = () => {
  const {
    coordinate,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinate);
  const forecastQuery = useForCastQuery(coordinate);
  const locationQuery = useReverseGeocodeQuery(coordinate);
console.log('weather datasis', weatherQuery.data)

  const handleRefresh = () => {
    getLocation();
    if (coordinate) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <Weather_Skeleton />;
  }
  if (locationError) {
    console.log("Location Error:", locationError);
    return (
      <Alert variant="destructive">
        <AlertTitle>
          <AlertTriangle className="h-4 w-4" />
          Location Error
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinate) {
   
    return (
      <Alert variant="destructive">
        <AlertTitle>
          <AlertTriangle className="h-4 w-4" />
          Location Required
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];
  console.log(locationName)
 // API error
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>
          <AlertTriangle className="h-4 w-4" />
          Error
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <Weather_Skeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <CurrentWeather data = {weatherQuery.data} locationName ={locationName}/>
              
              {/* Current and Hourlt Weather */}
              <HourlyTempreture data = {forecastQuery.data}/>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              {/* details */}
              <WeatherDetails data={weatherQuery.data}/>
              {/* forecast */}
              <WeatherForCast data={forecastQuery.data}/>
            </div>
      </div>

    </div>
  );
};

export default WeatherDashboard;
