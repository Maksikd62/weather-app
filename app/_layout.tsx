import { Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { CityProvider } from './contexts/cityContext';
import { useNotifications } from './notifications';

export default function RootLayout() {
  useNotifications();

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
