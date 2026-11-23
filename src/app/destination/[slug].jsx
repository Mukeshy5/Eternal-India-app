import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, Icon, PageFrame, PageIntro, SectionHeading, Surface, TourCard } from '../../components/ui';
import { DESTINATION_DETAILS, TOURS } from '../../data/travel';
import { openLink } from '../../utils/links';

export default function DestinationDetailScreen() {
  const params = useLocalSearchParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const destination = DESTINATION_DETAILS[slug];
  const router = useRouter();

  if (!destination) {
    return (
      <PageFrame>
        <PageIntro eyebrow="Destination guide" title="We couldn’t find that place" description="Browse the destination directory to choose another guide." />
        <ActionButton title="View destinations" href="/destinations" icon="arrow" />
      </PageFrame>
    );
  }

  const relatedTours = TOURS.filter((tour) => destination.tourSlugs.includes(tour.slug));
  return (
    <PageFrame>
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center gap-2 self-start rounded-full border border-line bg-white px-3 py-2">
        <Icon name="back" size={15} /><Text className="text-xs font-bold text-forest">Back</Text>
      </Pressable>
      <View className="overflow-hidden rounded-[28px] bg-forest">
        <Image source={destination.image} contentFit="cover" transition={220} style={{ width: '100%', height: 255 }} />
        <View className="absolute inset-0 bg-[#102A23]/45" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-white/80">{destination.region}</Text>
          <Text className="mt-2 font-display text-[34px] leading-10 text-white">{destination.name}</Text>
        </View>
      </View>

      <PageIntro eyebrow="Destination guide" title="A closer look" description={destination.intro} compact />
      <SectionHeading title="Places to see" />
      <View className="flex-row flex-wrap gap-2">
        {destination.attractions.map((item) => (
          <View key={item} className="flex-row items-center gap-2 rounded-full border border-line bg-white px-3 py-2.5">
            <Icon name="check" size={13} color="#B76F51" />
            <Text className="text-xs font-semibold text-forest">{item}</Text>
          </View>
        ))}
      </View>

      <SectionHeading title="Make time for" subtitle="Experiences to shape around your trip." />
      <Surface className="flex-row flex-wrap gap-2">
        {destination.experiences.map((item) => <Text key={item} className="rounded-full bg-[#F0EBE1] px-3 py-2 text-xs font-semibold text-forest">{item}</Text>)}
      </Surface>

      <SectionHeading title="When to visit" />
      <Surface className="flex-row items-start gap-3 bg-[#EDE6D9]">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-white"><Icon name="calendar" size={18} color="#B76F51" /></View>
        <View className="flex-1"><Text className="text-[14px] font-bold text-forest">A good time to go</Text><Text className="mt-1 text-sm leading-5 text-muted">{destination.bestTime}</Text></View>
      </Surface>

      {relatedTours.length ? <>
        <SectionHeading title="Journeys that include this place" href="/(tabs)/tours" />
        {relatedTours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}
      </> : (
        <Surface className="mt-7">
          <Text className="font-display text-[22px] text-forest">Make this your own route</Text>
          <Text className="mt-2 text-sm leading-5 text-muted">Share your dates and the places you want to include. The team can help shape a custom itinerary.</Text>
        </Surface>
      )}

      <SectionHeading title="A little more to see" subtitle="A gallery from the places around this route." />
      <View className="-mr-5 flex-row">
        {destination.gallery.map((source, index) => (
          <View key={`${destination.slug}-gallery-${index}`} className="mr-3 overflow-hidden rounded-[22px]">
            <Image source={source} contentFit="cover" transition={180} style={{ width: 220, height: 150 }} />
          </View>
        ))}
      </View>

      <View className="mt-8 rounded-[26px] bg-forest p-5">
        <Text className="font-display text-[25px] text-white">Want to go here?</Text>
        <Text className="mt-2 text-sm leading-5 text-white/75">Ask the team to help with dates, travel time and a route that fits.</Text>
        <View className="mt-4 flex-row gap-3">
          <ActionButton title="Plan this trip" href={`/plan-trip?destination=${encodeURIComponent(destination.name)}`} variant="light" compact icon="arrow" />
          <ActionButton title="Visit official site" onPress={() => openLink('https://eternal-india.com/destinations-in-india/')} variant="outline" compact />
        </View>
      </View>
    </PageFrame>
  );
}
