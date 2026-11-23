import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, DestinationCard, PageFrame, PageIntro, SectionHeading, Surface, TourCard } from '../components/ui';
import { ASSETS, DESTINATION_DETAILS, TOURS } from '../data/travel';

const BUDDHIST_PLACES = ['bodh-gaya', 'sarnath', 'rajgir', 'nalanda', 'kushinagar', 'lumbini'];

export default function BuddhistScreen() {
  const tour = TOURS.find((item) => item.slug === 'buddhist-circuit');
  return (
    <PageFrame>
      <View className="overflow-hidden rounded-[28px] bg-forest">
        <Image source={ASSETS.buddha} contentFit="cover" transition={220} style={{ width: '100%', height: 265 }} />
        <View className="absolute inset-0 bg-[#102A23]/45" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/80">A route through Buddhist heritage</Text>
          <Text className="mt-2 font-display text-[32px] leading-9 text-white">A quieter kind of journey</Text>
          <Text className="mt-2 text-sm leading-5 text-white/80">Bodh Gaya · Sarnath · Rajgir · Nalanda · Kushinagar</Text>
        </View>
      </View>

      <PageIntro eyebrow="Buddhist tours" title="Walk the Buddhist Circuit" description="Follow the Buddha’s story through the Gangetic plain, from the place of enlightenment to sites of teaching and pilgrimage." compact />
      {tour ? <TourCard tour={tour} /> : null}

      <SectionHeading title="Six sacred stops" subtitle="Open a place for its own guide and travel notes." />
      {BUDDHIST_PLACES.map((slug) => <DestinationCard key={slug} destination={DESTINATION_DETAILS[slug]} />)}

      <Surface className="mt-2 bg-[#EDE6D9]">
        <Text className="font-display text-[22px] text-forest">Add Lumbini in Nepal</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">The published 10-day route stays in India. Lumbini is available as a cross-border extension, with extra time and travel documents planned separately.</Text>
        <Link href="/destination/lumbini" asChild>
          <Pressable className="mt-4 self-start rounded-full bg-white px-4 py-3"><Text className="text-sm font-bold text-forest">Explore Lumbini</Text></Pressable>
        </Link>
      </Surface>

      <SectionHeading title="Plan a pilgrimage" subtitle="Share your dates and the places you hope to visit." />
      <View className="mb-5"><ActionButton title="Plan a Buddhist journey" href="/plan-trip?destination=Buddhist%20Circuit" icon="arrow" /></View>
    </PageFrame>
  );
}
