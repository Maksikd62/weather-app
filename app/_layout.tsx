import { Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { CityProvider } from './contexts/cityContext';
import { init } from '../store/db';

export default function RootLayout() {
  useEffect(() => {
    init().catch((err) => {
      console.error("DB init error:", err);
    });
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <CityProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CityProvider>
    </Suspense>
  );
}
