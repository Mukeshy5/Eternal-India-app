import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, PageFrame, PageIntro, RegionCard, SectionHeading, Surface } from '../components/ui';
import { ASSETS, REGIONS } from '../data/travel';

export default function IndiaScreen() {
  return (
    <PageFrame>
      <PageIntro eyebrow="A country of many journeys" title="India, region by region" description="Explore India through landscapes, living culture and routes shaped by local knowledge. Start with a region, then make the journey your own." />
      <View className="overflow-hidden rounded-[28px]">
        <Image source={ASSETS.taj} contentFit="cover" transition={200} style={{ height: 225, width: '100%' }} />
        <View className="absolute inset-0 bg-[#102A23]/30" />
        <View className="absolute bottom-0 left-0 p-5">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/85">Incredible variety, one journey</Text>
          <Text className="mt-2 font-display text-[28px] text-white">Go beyond the postcard.</Text>
        </View>
      </View>
      <SectionHeading title="Choose a region" subtitle="Each region opens its own destination guide." />
      {REGIONS.map((region) => <RegionCard key={region.slug} region={region} />)}

      <SectionHeading title="A few ways to travel" />
      <View className="gap-3">
        {[
          ['Heritage', 'Fort cities, old quarters and architectural landmarks.', '/tour/golden-triangle'],
          ['Pilgrimage', 'Sacred riverfronts and Buddhist journeys through Bihar and Uttar Pradesh.', '/buddhist'],
          ['Slow escapes', 'Hill towns, coastlines and quieter days between cities.', '/destinations'],
        ].map(([title, copy, href]) => (
          <Link key={title} href={href} asChild>
            <Pressable className="flex-row items-center justify-between rounded-[22px] border border-line bg-white p-4">
              <View className="flex-1 pr-3"><Text className="font-display text-[20px] text-forest">{title}</Text><Text className="mt-1 text-sm leading-5 text-muted">{copy}</Text></View>
              <Text className="text-lg text-rose">→</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <Surface className="mt-6 bg-[#EDE6D9]">
        <Text className="font-display text-[24px] text-forest">Need help joining the dots?</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">We’ll help turn a list of places into a route that fits your time.</Text>
        <View className="mt-4"><ActionButton title="Plan your India trip" href="/plan-trip" compact icon="arrow" /></View>
      </Surface>
    </PageFrame>
  );
}
