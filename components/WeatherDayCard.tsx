import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { WeatherData } from "../types/weatherTypes";

interface Props {
    data: WeatherData[];
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;
}

const WeatherDayCard: React.FC<Props> = ({ data, selectedTime, setSelectedTime }) => {
    const selectedData = data.find(item => item.time === selectedTime);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>24-Hour Forecast</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={() => setSelectedTime(item.time === selectedTime ? null : item.time)}
                        style={[styles.card, selectedTime === item.time && styles.selected]}
                    >
                        <Text style={styles.time}>{item.time}</Text>
                        <Image
                            source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
                            style={styles.icon}
                        />
                        <Text style={styles.temp}>{Math.round(item.temperature)}°C</Text>
                    </Pressable>
                ))}
            </ScrollView>

            {selectedData && (
                <View style={styles.details}>
                    <Text>Wind: {selectedData.windSpeed} m/s</Text>
                    <Text>Pressure: {selectedData.pressure} hPa</Text>
                    <Text>Humidity: {selectedData.humidity}%</Text>
                </View>
            )}
        </View>
    );
};

export default WeatherDayCard;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        alignItems: "center",
        padding: 10,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: "#eee",
        width: 100,
    },
    selected: {
        backgroundColor: "#d0e8ff",
    },
    time: {
        fontSize: 16,
    },
    icon: {
        width: 50,
        height: 50,
    },
    temp: {
        fontSize: 18,
        fontWeight: "bold",
    },
    details: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f0f8ff",
        borderRadius: 12,
    },
});
