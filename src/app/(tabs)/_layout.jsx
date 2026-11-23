import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '../../components/ui';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#19382F',
        tabBarInactiveTintColor: '#888A81',
        tabBarStyle: {
          height: 60 + Math.max(insets.bottom, 8),
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          borderTopColor: '#E7E0D5',
          backgroundColor: '#FFFCF7',
          elevation: 0,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Icon name="home" color={color} size={21} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => <Icon name="explore" color={color} size={21} /> }} />
      <Tabs.Screen name="tours" options={{ title: 'Tours', tabBarIcon: ({ color }) => <Icon name="tours" color={color} size={21} /> }} />
      <Tabs.Screen name="contact" options={{ title: 'Contact', tabBarIcon: ({ color }) => <Icon name="contact" color={color} size={21} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <Icon name="profile" color={color} size={21} /> }} />
    </Tabs>
  );
}
