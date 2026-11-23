import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ActionButton, Icon, PageFrame, PageIntro, Pill, SectionHeading, Surface } from '../../components/ui';
import { TOURS } from '../../data/travel';
import { openLink } from '../../utils/links';

export default function TourDetailScreen() {
  const params = useLocalSearchParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const tour = TOURS.find((item) => item.slug === slug);
  const router = useRouter();

  if (!tour) {
    return (
      <PageFrame>
        <PageIntro eyebrow="Tour details" title="We couldn’t find that journey" description="Browse the tour collection to choose another route." />
        <ActionButton title="Browse tour packages" href="/(tabs)/tours" icon="arrow" />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center gap-2 self-start rounded-full border border-line bg-white px-3 py-2">
        <Icon name="back" size={15} /><Text className="text-xs font-bold text-forest">Back to tours</Text>
      </Pressable>
      <View className="overflow-hidden rounded-[28px] bg-forest">
        <Image source={tour.image} contentFit="cover" transition={220} style={{ width: '100%', height: 250 }} />
        <View className="absolute inset-0 bg-[#102A23]/45" />
        <View className="absolute inset-x-0 bottom-0 p-5">
          <Pill tone="rose">{tour.category}</Pill>
          <Text className="mt-3 font-display text-[32px] leading-9 text-white">{tour.name}</Text>
          <Text className="mt-2 text-sm text-white/80">{tour.duration} · {tour.route}</Text>
        </View>
      </View>

      <PageIntro eyebrow="The journey" title="Overview" description={tour.summary} compact />
      <SectionHeading title="Highlights" />
      <View className="gap-3">
        {tour.highlights.map((item, index) => (
          <Surface key={item} className="flex-row items-center gap-3 p-4">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-[#F9E9F1]"><Text className="font-display text-base text-rose">0{index + 1}</Text></View>
            <Text className="flex-1 text-sm font-semibold leading-5 text-forest">{item}</Text>
          </Surface>
        ))}
      </View>

      <SectionHeading title="The itinerary" subtitle={`${tour.itinerary.length} stops in this published route outline.`} />
      <View className="ml-3 border-l border-[#D7C7B0] pl-5">
        {tour.itinerary.map((stop, index) => (
          <View key={`${stop.day}-${stop.title}`} className="relative pb-5">
            <View className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-paper bg-copper" />
            <Text className="text-[10px] font-bold uppercase tracking-[1.5px] text-copper">Day {stop.day}</Text>
            <Text className="mt-1 text-[15px] font-bold text-forest">{stop.title}</Text>
            <Text className="mt-1 text-sm leading-5 text-muted">{stop.detail}</Text>
            {index < tour.itinerary.length - 1 ? <View className="mt-4 h-px bg-line" /> : null}
          </View>
        ))}
      </View>

      <SectionHeading title="What’s included" />
      <Surface>
        {tour.inclusions.length ? tour.inclusions.map((item) => (
          <View key={item} className="mb-3 flex-row items-start gap-2"><Icon name="check" size={15} color="#4B795D" /><Text className="flex-1 text-sm leading-5 text-forest">{item}</Text></View>
        )) : <Text className="text-sm leading-5 text-muted">{tour.inclusionNote}</Text>}
      </Surface>
      <SectionHeading title="What’s not included" />
      <Surface>
        {tour.exclusions.length ? tour.exclusions.map((item) => (
          <View key={item} className="mb-3 flex-row items-start gap-2"><Icon name="close" size={15} color="#B76F51" /><Text className="flex-1 text-sm leading-5 text-forest">{item}</Text></View>
        )) : <Text className="text-sm leading-5 text-muted">{tour.exclusionNote}</Text>}
      </Surface>

      <SectionHeading title="Gallery" subtitle="Photos from the route and its destinations." />
      <View className="-mr-5 flex-row">
        {tour.gallery.map((source, index) => (
          <View key={`${tour.slug}-gallery-${index}`} className="mr-3 overflow-hidden rounded-[22px]">
            <Image source={source} contentFit="cover" transition={180} style={{ width: 220, height: 150 }} />
          </View>
        ))}
      </View>

      <View className="mt-8 rounded-[26px] bg-forest p-5">
        <Text className="font-display text-[25px] text-white">Make this journey yours.</Text>
        <Text className="mt-2 text-sm leading-5 text-white/75">Ask for current dates, availability and a personalised quote.</Text>
        <View className="mt-4 flex-row flex-wrap gap-3">
          <ActionButton title="Plan this tour" href={`/plan-trip?destination=${encodeURIComponent(tour.name)}`} variant="light" compact icon="arrow" />
          <ActionButton title="Official tour page" onPress={() => openLink(tour.officialUrl)} variant="outline" compact />
        </View>
      </View>
    </PageFrame>
  );
}
