import { useEffect, useState } from "react";
import { WeatherData } from "../../types/weatherTypes";

const API_KEY = "23afa200e6b501eb8398f855ecb95385";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

function useWeatherData(city: string) {
    const [forecast, setForecast] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
                const data = await response.json();

                if (data.cod !== "200") {
                    throw new Error(data.message || "Request error");
                }

                const filtered = data.list.filter((item: any) => {
                    const hour = new Date(item.dt_txt).getHours();
                    return [0, 6, 12, 18].includes(hour);
                });

                const mapped: WeatherData[] = filtered.map((item: any) => ({
                    datetime: item.dt_txt,
                    time: item.dt_txt.split(" ")[1].slice(0, 5),
                    temperature: item.main.temp,
                    windSpeed: item.wind.speed,
                    pressure: item.main.pressure,
                    humidity: item.main.humidity,
                    icon: item.weather[0].icon,
                }));

                setForecast(mapped);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    return { forecast, loading, error };
}

export default useWeatherData;
