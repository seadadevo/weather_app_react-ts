import { API_CONFIG } from "./config"
import { Coordinates, ForecastData, GeocodingResponse, WeatherCondition, WeatherData } from "./types"

class WeatherAPI {
    private createUrl(endpoint: string, params: Record<string, number | number>) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        })
        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url:string): Promise<T> {
        const res =await fetch(url)
        if(!res.ok) {
            throw new Error (`Weather API Error: ${res.statusText}`)
        }
        return res.json()
    }
    async getCurrentWeather({lat, lon}: Coordinates): Promise<WeatherCondition> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        })

        return this.fetchData<WeatherData>(url)
    }
    async getForecast({lat, lon}: Coordinates): Promise<ForecastData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        })

        return this.fetchData<ForecastData>(url)
    }
    async reverseGeocode({lat, lon}: Coordinates): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        })

        return this.fetchData<GeocodingResponse[]>(url)
    }

    async searchLocation(query: string): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
            q: query,
            limit: 5
        })

        return this.fetchData<GeocodingResponse[]>(url)
    }
    
}

export const weatherAPI = new WeatherAPI()