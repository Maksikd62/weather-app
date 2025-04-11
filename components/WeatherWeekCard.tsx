import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { WeatherData } from "../types/weatherTypes";

interface Props {
    data: { [date: string]: WeatherData[] };
    selectedDay: string | null;
    setSelectedDay: (day: string | null) => void;
}

const WeatherWeekCard: React.FC<Props> = ({ data, selectedDay, setSelectedDay }) => {
    const getEnglishDay = (dateString: string) => {
        const date = new Date(dateString);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getDay()];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${day}.${month}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>3-Day Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                {Object.entries(data)
                    .slice(0, 3)
                    .map(([date, dayData], index) => {
                        const noon = dayData.find((item) => item.time.includes("12:00")) || dayData[0];
                        const avgTemp = Math.round(dayData.reduce((sum, item) => sum + item.temperature, 0) / dayData.length);

                        return (
                            <Pressable
                                key={date}
                                onPress={() => setSelectedDay(selectedDay === date ? null : date)}
                                style={[styles.dayCard, selectedDay === date && styles.selected]}
                            >
                                <Text style={styles.label}>{getEnglishDay(date)}</Text>
                                <Text style={styles.date}>{formatDate(date)}</Text>
                                <Image
                                    source={{ uri: `https://openweathermap.org/img/wn/${noon.icon}@2x.png` }}
                                    style={styles.icon}
                                />
                                <Text style={styles.temp}>{avgTemp}°C</Text>
                            </Pressable>
                        );
                    })}
            </ScrollView>

            {selectedDay && (
                <ScrollView horizontal>
                    <View style={styles.table}>
                        <Text style={styles.tableTitle}>Details for {formatDate(selectedDay)}</Text>

                        <View style={styles.tableHeader}>
                            <View style={styles.nameCell} />
                            {data[selectedDay].map((hour, index) => (
                                <Text key={index} style={[styles.tableCell, styles.headerCell]}>
                                    {hour.time}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.nameCell]}>Temperature</Text>
                            {data[selectedDay].map((hour, index) => (
                                <Text key={index} style={[styles.tableCell]}>
                                    {Math.round(hour.temperature)}°
                                </Text>
                            ))}
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.nameCell]}>Wind (m/s)</Text>
                            {data[selectedDay].map((hour, index) => (
                                <Text key={index} style={[styles.tableCell]}>
                                    {hour.windSpeed}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.nameCell]}>Pressure (hPa)</Text>
                            {data[selectedDay].map((hour, index) => (
                                <Text key={index} style={[styles.tableCell]}>
                                    {hour.pressure}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.nameCell]}>Humidity (%)</Text>
                            {data[selectedDay].map((hour, index) => (
                                <Text key={index} style={[styles.tableCell]}>
                                    {hour.humidity}
                                </Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default WeatherWeekCard;

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
    row: {
        flexDirection: "row",
        gap: 10,
    },
    dayCard: {
        backgroundColor: "#eee",
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
        minWidth: 100,
    },
    selected: {
        backgroundColor: "#d0e8ff",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    date: {
        fontSize: 14,
        fontWeight: "600",
    },
    icon: {
        width: 50,
        height: 50,
    },
    temp: {
        fontSize: 16,
        fontWeight: "500",
    },
    table: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f0f8ff",
        borderRadius: 12,
    },
    tableTitle: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 16,
        textAlign: "center",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "center",
    },
    tableCell: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        fontSize: 14,
        width: 60,
        alignSelf: "flex-start",
    },
    headerCell: {
        fontWeight: "bold",
        borderBottomWidth: 2,
    },
    nameCell: {
        fontWeight: "bold",
        width: 120,
    },
});

