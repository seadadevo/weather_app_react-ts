import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export const useWeatherQuery = (coordinate: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinate ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinate ? weatherAPI.getCurrentWeather(coordinate) : null,
      enabled: !!coordinate
  });
};

export const useForCastQuery = (coordinate: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinate ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinate ? weatherAPI.getForecast(coordinate) : null,
      enabled: !!coordinate
  });
};

export const useReverseGeocodeQuery = (coordinate: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinate ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinate ? weatherAPI.reverseGeocode(coordinate) : null,
      enabled: !!coordinate
  });
};

export const useLocationQuery = (query: string) => {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  });
}