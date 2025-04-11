export type WeatherData = {
    readonly id: number;
    datetime: string;
    time: string;
    temperature: number;
    windSpeed: number;
    pressure: number;
    humidity: number;
    icon: string;
  }
  

export type WeatherState = {
    city: string;
    forecast: WeatherData[];
    loading: boolean;
    error: string | null;
}

