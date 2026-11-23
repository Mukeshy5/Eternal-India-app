import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../lib/queryClient';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F7F3EB' },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="menu" />
          <Stack.Screen name="about" />
          <Stack.Screen name="india" />
          <Stack.Screen name="destinations" />
          <Stack.Screen name="buddhist" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="plan-trip" />
          <Stack.Screen name="tour/[slug]" />
          <Stack.Screen name="destination/[slug]" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
