import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import useWeatherData from "../app/hooks/useWeatherData";

interface HistoryItemProps {
  city: string;
  onPress: (city: string) => void;
}

const HistoryItem = ({ city, onPress }: HistoryItemProps) => {
  const { forecast, loading } = useWeatherData(city);
  const getNextAvailableHour = () => {
    const hours = [0, 6, 12, 18];
    const now = new Date();
    const currentHour = now.getHours();
  
    for (let i = 0; i < hours.length; i++) {
      if (currentHour < hours[i]) return hours[i];
    }
    return 0; 
  };
  
  const nextHour = getNextAvailableHour().toString().padStart(2, "0") + ":00";
  const tempAtNextHour = forecast.find((f) => f.time === nextHour)?.temperature;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(city)}>
      <Text style={styles.city}>{city}</Text>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={styles.temp}>{tempAtNextHour !== undefined ? `${Math.round(tempAtNextHour)}°C` : "–"}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  city: {
    fontSize: 16,
    fontWeight: "500",
  },
  temp: {
    fontSize: 16,
    color: "#555",
  },
});

export default HistoryItem;
