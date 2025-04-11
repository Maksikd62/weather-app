import React, { useState, useEffect } from "react";
import { ScrollView, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import useWeatherData from "../hooks/useWeatherData";
import SearchBar from "../../components/SearchBar";
import WeatherDayCard from "../../components/WeatherDayCard";
import WeatherWeekCard from "../../components/WeatherWeekCard";
import { addCityToHistory, deleteOldCities } from "../../store/db";
import { useCity } from "../contexts/cityContext";

const HomeScreen = () => {
  const { city, setCity } = useCity();
  const { forecast, loading, error } = useWeatherData(city);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleSearch = (newCity: string) => {
    if (!newCity) return;
    setCity(newCity);
  };

  useEffect(() => {
    if (!loading && !error && forecast.length > 0 && city) {
      addCityToHistory(city);
      deleteOldCities();
    }
  }, [forecast, city]);

  const now = new Date();
  const next24h = forecast
    .filter(item => new Date(item.datetime) >= now)
    .slice(0, 4);

  const today = new Date().toISOString().split("T")[0];

  const nextDays = forecast.reduce((acc: any, item) => {
    const dateObj = new Date(item.datetime);
    const dateKey = dateObj.toISOString().split("T")[0];

    if (dateKey !== today) {
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(item);
    }

    return acc;
  }, {});

  if (loading) return <ActivityIndicator size="large" />;
  if (error) {
    Alert.alert("Error", "City not found. Please check the spelling.");
    return <Text style={styles.error}>❌ {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Text style={styles.title}>Weather in {city}</Text>

      <WeatherDayCard
        data={next24h}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <WeatherWeekCard
        data={nextDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default HomeScreen;
