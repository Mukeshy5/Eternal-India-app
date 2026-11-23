import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Icon, PageFrame, PageIntro, Surface } from '../components/ui';

const LINKS = [
  ['Home', '/', 'home'],
  ['About us', '/about', 'star'],
  ['Tour packages', '/(tabs)/tours', 'tours'],
  ['India', '/india', 'explore'],
  ['Destinations in India', '/destinations', 'pin'],
  ['Buddhist tours', '/buddhist', 'star'],
  ['Contact us', '/(tabs)/contact', 'contact'],
  ['Online payment', '/payment', 'card'],
  ['Plan your trip', '/plan-trip', 'calendar'],
];

export default function MenuScreen() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Explore Eternal India" title="Where would you like to go?" description="Open a section to discover tours, destinations and ways to get in touch." />
      <Surface className="p-2">
        {LINKS.map(([title, href, icon], index) => (
          <View key={title}>
            <Link href={href} asChild>
              <Pressable className="flex-row items-center gap-4 px-3 py-4">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F4EEE5]"><Icon name={icon} size={18} color="#B76F51" /></View>
                <Text className="flex-1 text-sm font-bold text-forest">{title}</Text>
                <Icon name="chevron" size={16} color="#777B71" />
              </Pressable>
            </Link>
            {index < LINKS.length - 1 ? <View className="mx-3 h-px bg-line" /> : null}
          </View>
        ))}
      </Surface>
    </PageFrame>
  );
}



//
