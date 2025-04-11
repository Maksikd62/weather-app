import React from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import HistoryItem from "./HistoryItem";

interface SearchHistoryComponentProps {
    history: { id: number; city: string; date: string }[];
    onClearHistory: () => void;
    onCityPress: (city: string) => void;
    loadingHistory: boolean;
}

const SearchHistoryComponent = ({ history, onClearHistory, onCityPress, loadingHistory }: SearchHistoryComponentProps) => {
    return (
        <View style={styles.container}>
            {loadingHistory ? (
                <ActivityIndicator size="large" />
            ) : history.length === 0 ? (
                <Text style={styles.emptyText}>History is empty</Text>
            ) : (
                history.map((entry) => (
                    <HistoryItem key={entry.id} city={entry.city} onPress={onCityPress} />
                ))
            )}

            {history.length > 0 && (
                <View style={styles.clearBtn}>
                    <Button title="Clear search history" color="#d00" onPress={onClearHistory} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        color: "#999",
        marginTop: 50,
    },
    clearBtn: {
        marginTop: 20,
    },
});

export default SearchHistoryComponent;
