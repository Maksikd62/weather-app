export interface WeatherData {
    datetime: string;
    time: string;
    temperature: number;
    windSpeed: number;
    pressure: number;
    humidity: number;
    icon: string;
  }
  

export interface WeatherState {
    city: string;
    forecast: WeatherData[];
    loading: boolean;
    error: string | null;
}

