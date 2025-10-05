import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinate: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinate: null,
    error: null,
    isLoading: null,
  });

  const getLocation = () => {
    setLocationData((prev) => ({...prev, isLoading: true, error: null}))
    if(!navigator.geolocation) {
      setLocationData({
        coordinate: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false
      })
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocationData({
        coordinate: {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        },
        error: null,
        isLoading: false
      })
    }, (error) => {
      let errorMessage: string;

      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location permission denied. Please enable location access."
          break;
          case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable."
          break;
          case error.TIMEOUT:
          errorMessage = "Location request timed out."
          break;
          default:
            errorMessage = "An unknown error occurred."
      }

      setLocationData({
        coordinate: null,
        error: errorMessage,
        isLoading: false
      })
    },{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    } )
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  }; // useGeoLocation => coordinate , error , getLocation , isLoading
}
