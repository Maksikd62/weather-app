import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, ScrollView } from "react-native";
import { getHistory, deleteCityById, deleteOldCities, addCityToHistory, deleteCityByName } from "../../store/db";
import { useCity } from "../contexts/cityContext";
import SearchBar from "../../components/SearchBar";
import SearchHistoryComponent from "../../components/SearchHistory";
import { useRouter, useFocusEffect } from 'expo-router';

const SearchHistory = () => {
  const { setCity } = useCity();
  const [history, setHistory] = useState<{ id: number; city: string; date: string }[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      await deleteOldCities();
      const data = await getHistory();
      setHistory(data);
      setLoadingHistory(false);
    } catch (err) {
      Alert.alert("Помилка", "Не вдалося завантажити історію.");
      setLoadingHistory(false);
    }
  };

  const handleSearch = (city: string) => {
    if (!city) return;
    setCity(city);
    router.push('/');
  };

  const handleCityPress = async (city: string) => {
    await addCityToHistory(city); 
  
    setCity(city);
    await loadHistory();
    router.push('/');
  };

  const handleClearHistory = async () => {
    for (const item of history) {
      await deleteCityById(item.id);
    }
    setHistory([]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar onSearch={handleSearch} />
      <SearchHistoryComponent
        history={history}
        onClearHistory={handleClearHistory}
        onCityPress={handleCityPress}
        loadingHistory={loadingHistory}
      />
    </ScrollView>
  );
};

export default SearchHistory;
